import Homework from "../models/homework";
import User from "../models/user";
import { getClassById, getClassesByStudentId } from "./class";

async function createHomework(
  centreId: number,
  classId: number,
  creatorId: number,
  title: string,
  description: string,
  dueDate: string
): Promise<Homework> {
  try {
    return await Homework.create({
      centreId: centreId,
      classId: classId,
      creatorId: creatorId,
      title: title,
      description: description,
      dueDate: new Date(dueDate),
    });
  } catch (error: any) {
    throw new Error(`Failed to create homework: ${error.message}`);
  }
}

async function deleteHomework(
  centreId: number,
  homeworkId: number
): Promise<boolean> {
  try {
    const numDeletedRows = await Homework.destroy({
      where: { centreId: centreId, id: homeworkId },
    });
    return numDeletedRows > 0;
  } catch (error: any) {
    throw new Error(`Failed to delete homework: ${error.message}`);
  }
}

async function editHomework(
  centreId: number,
  userId: number,
  homeworkId: number,
  title: string,
  description: string,
  dueDate: string
): Promise<Homework> {
  try {
    const homework = await Homework.findOne({
      where: { centreId: centreId, id: homeworkId },
    });
    if (!homework) {
      throw new Error(`Homework with ID ${homeworkId} not found`);
    }

    if (description) {
      homework.description = description;
    }

    if (title) {
      homework.title = title;
    }

    if (dueDate) {
      homework.dueDate = new Date(dueDate);
    }

    homework.creatorId = userId;

    await homework.save();
    await homework.reload();

    return homework;
  } catch (error: any) {
    throw new Error(`Failed to update homework: ${error.message}`);
  }
}

async function getHomeworkByClassId(
  centreId: number,
  classId: number
): Promise<Homework[]> {
  try {
    const targetClass = await getClassById(centreId, classId);
    if (!targetClass) {
      throw new Error(`Class with ID ${classId} not found`);
    }

    return await Homework.findAll({
      where: { centreId: centreId, classId: classId },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          as: "creator",
          attributes: ["id", "fullName"],
        },
      ],
    });
  } catch (error: any) {
    throw new Error(`Failed to get announcements: ${error.message}`);
  }
}

async function getHomeworkByStudentId(
  centreId: number,
  studentId: number
): Promise<Homework[]> {
  try {
    const classes = await getClassesByStudentId(centreId, studentId);
    const classIds = classes.map((c) => c.id);

    return await Homework.findAll({
      where: { centreId: centreId, classId: classIds },
      order: [["createdAt", "DESC"]],
      include: [
        {
          model: User,
          as: "creator",
          attributes: ["id", "fullName"],
        },
      ],
    });
  } catch (error: any) {
    throw new Error(`Failed to get note: ${error.message}`);
  }
}

export {
  createHomework,
  deleteHomework,
  editHomework,
  getHomeworkByClassId,
  getHomeworkByStudentId,
};
