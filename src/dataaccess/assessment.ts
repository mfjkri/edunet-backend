import Assessment from "../models/assessment";
import TutorClass from "../models/tutorClass";
import User from "../models/user";
import { getClassViewById } from "./class";

async function validateAccessPermission(
  requestorId: number,
  classId: number
): Promise<boolean> {
  const user = await User.findOne({
    where: { id: requestorId },
  });

  if (!user) {
    throw new Error(`User with ID ${requestorId} not found`);
  }

  if (user.type === "admin") {
    return true;
  }

  if (user.type === "tutor") {
    const isTeaching = TutorClass.findOne({
      where: { tutorId: requestorId, classId: classId },
    });
    if (!isTeaching) {
      throw new Error(
        `Tutor with ID ${requestorId} is not teaching class with ID ${classId}`
      );
    }
    return true;
  }

  throw new Error(`User with ID ${requestorId} is not a tutor or admin`);
}

async function createAssessment(
  centreId: number,
  requesterId: number,
  classId: number,
  studentId: number,
  name: string,
  total: number,
  score: number
): Promise<Assessment> {
  try {
    validateAccessPermission(requesterId, classId);

    return await Assessment.create({
      centreId: centreId,
      classId: classId,
      studentId: studentId,
      name: name,
      total: total,
      score: score,
    });
  } catch (error: any) {
    throw new Error(`Failed to create note: ${error.message}`);
  }
}

async function deleteAssessment(
  centreId: number,
  requesterId: number,
  classId: number,
  assessmentId: number
): Promise<boolean> {
  try {
    validateAccessPermission(requesterId, classId);

    const numDeletedRows = await Assessment.destroy({
      where: { centreId: centreId, classId: classId, id: assessmentId },
    });
    return numDeletedRows > 0;
  } catch (error: any) {
    throw new Error(`Failed to delete assessment: ${error.message}`);
  }
}

async function editAssessment(
  centreId: number,
  requesterId: number,
  classId: number,
  assessmentId: number,
  name: string,
  total: number,
  score: number
): Promise<Assessment> {
  try {
    validateAccessPermission(requesterId, classId);

    const assessment = await Assessment.findOne({
      where: { centreId: centreId, classId: classId, id: assessmentId },
    });
    if (!assessment) {
      throw new Error(`Note with ID ${assessmentId} not found`);
    }

    if (name) {
      assessment.name = name;
    }
    if (total) {
      assessment.total = total;
    }
    if (score) {
      assessment.score = score;
    }
    await assessment.save();
    await assessment.reload();

    return assessment;
  } catch (error: any) {
    throw new Error(`Failed to update assessment: ${error.message}`);
  }
}

async function getAssessmentsByStudentId(
  centreId: number,
  studentId: number
): Promise<Assessment[]> {
  try {
    return await Assessment.findAll({
      where: { centreId: centreId, studentId: studentId },
      order: [["createdAt", "ASC"]],
    });
  } catch (error: any) {
    throw new Error(`Failed to get note: ${error.message}`);
  }
}

async function uploadAssessmentGrades(
  centreId: number,
  classId: number,
  assessmentName: string,
  total: number,
  data: any
): Promise<void> {
  try {
    const classInfo: any = await getClassViewById(centreId, classId);
    const studentsInClass = classInfo.students;

    const assessmentData: {
      studentId: number;
      assessmentName: string;
      score: number;
    }[] = [];

    for (const row of data) {
      const studentId = parseInt(row["Student ID"]);
      const score = parseInt(row["Score"]);

      const studentExists = studentsInClass.some(
        (student: any) => student.id === studentId
      );

      if (!studentExists) {
        throw new Error(
          `Student with ID ${studentId} is not in class ${classId}`
        );
      }

      if (isNaN(score) || score < 0 || score > total) {
        throw new Error(`Invalid score for student ${studentId}`);
      }

      assessmentData.push({ studentId, assessmentName, score });
    }

    for (const data of assessmentData) {
      const { studentId, assessmentName, score } = data;
      const existingAssessment = await Assessment.findOne({
        where: { classId, studentId, name: assessmentName },
      });

      if (existingAssessment) {
        existingAssessment.score = score;
        await existingAssessment.save();
      } else {
        await Assessment.create({
          centreId: centreId,
          classId,
          studentId,
          name: assessmentName,
          total,
          score,
        });
      }
    }
  } catch (error: any) {
    throw new Error(`Failed to upload assessment: ${error.message}`);
  }
}

export {
  createAssessment,
  deleteAssessment,
  editAssessment,
  getAssessmentsByStudentId,
  uploadAssessmentGrades,
};
