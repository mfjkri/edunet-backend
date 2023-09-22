import Class from "../models/class";
import Centre from "../models/centre";
import Student from "../models/student";
import StudentClass from "../models/studentClass";
import TutorClass from "../models/tutorClass";
import Tutor from "../models/tutor";
import User from "../models/user";
import Avatar from "../models/avatar";
import Parent from "../models/parent";
import Note from "../models/note";
import Assessment from "../models/assessment";

async function createClass(
  centreId: number,
  name: string,
  day: string,
  time: string,
  venue: string
): Promise<Class> {
  try {
    return await Class.create({
      name: name,
      day: day,
      time: time,
      venue: venue,
      centreId: centreId,
    });
  } catch (error: any) {
    throw new Error(`Error creating class: ${error}`);
  }
}

async function deleteClassById(
  centreId: number,
  classId: number
): Promise<boolean> {
  try {
    return (
      (await Class.destroy({
        where: {
          centreId: centreId,
          id: classId,
        },
      })) > 0
    );
  } catch (error: any) {
    throw new Error(`Error deleting class: ${error}`);
  }
}

async function editClassById(
  centreId: number,
  classId: number,
  newName: string,
  newDay: string,
  newTime: string,
  newVenue: string
): Promise<Class> {
  try {
    const singleClass = await Class.findOne({
      where: {
        centreId: centreId,
        id: classId,
      },
    });

    if (!singleClass) {
      throw new Error(`Class with ID ${classId} not found`);
    }

    if (newName) {
      singleClass.name = newName;
    }
    if (newDay) {
      singleClass.day = newDay;
    }
    if (newTime) {
      singleClass.time = newTime;
    }
    if (newVenue) {
      singleClass.venue = newVenue;
    }

    await singleClass.save();
    await singleClass.reload();

    return singleClass;
  } catch (error: any) {
    throw new Error(`Error editing class: ${error}`);
  }
}

async function getClassById(centreId: number, classId: number): Promise<Class> {
  try {
    const singleClass = await Class.findOne({
      where: {
        centreId: centreId,
        id: classId,
      },
      include: { model: Centre, as: "centre" },
    });

    if (!singleClass) {
      throw new Error(`Class with ID ${classId} not found`);
    }

    return singleClass;
  } catch (error: any) {
    throw new Error(`Error getting class: ${error}`);
  }
}

async function getClassViewById(
  centreId: number,
  classId: number
): Promise<Class> {
  try {
    const singleClass = await Class.findOne({
      where: {
        centreId: centreId,
        id: classId,
      },
      include: [
        { model: Centre, as: "centre" },
        {
          model: Student,
          as: "students",
          include: [
            {
              model: User,
              as: "user",
              include: [
                {
                  model: Avatar,
                  as: "avatar",
                },
                {
                  model: Note,
                  as: "notes",
                },
              ],
              attributes: { exclude: ["password"] },
            },
            {
              model: Parent,
              as: "parent",
              include: [
                {
                  model: User,
                  as: "user",
                  include: [
                    {
                      model: Avatar,
                      as: "avatar",
                    },
                  ],
                  attributes: { exclude: ["password"] },
                },
              ],
            },
            {
              model: Assessment,
              as: "assessments",
            },
          ],
        },
        {
          model: Tutor,
          as: "tutors",
          include: [
            {
              model: User,
              as: "user",
              include: [
                {
                  model: Avatar,
                  as: "avatar",
                },
                {
                  model: Note,
                  as: "notes",
                },
              ],
              attributes: { exclude: ["password"] },
            },
          ],
        },
      ],
    });

    if (!singleClass) {
      throw new Error(`Class with ID ${classId} not found`);
    }

    return singleClass;
  } catch (error: any) {
    throw new Error(`Error getting class: ${error}`);
  }
}

async function getClassesByCentreId(centreId: number): Promise<Class[]> {
  try {
    const classes = await Class.findAll({
      where: {
        centreId: centreId,
      },
    });

    return Promise.all(
      classes.map(
        async (singleClass) => await getClassViewById(centreId, singleClass.id)
      )
    );
  } catch (error: any) {
    throw new Error(`Error getting classes by centre ID: ${error}`);
  }
}

async function getClassesByStudentId(
  centreId: number,
  studentId: number
): Promise<Class[]> {
  try {
    const classes = await StudentClass.findAll({
      where: {
        studentId: studentId,
      },
    });

    return Promise.all(
      classes.map(
        async (studentClass) =>
          await getClassViewById(centreId, studentClass.classId)
      )
    );
  } catch (error: any) {
    throw new Error(`Error getting classes by student ID: ${error}`);
  }
}

async function getClassesByTutorId(
  centreId: number,
  tutorId: number
): Promise<Class[]> {
  try {
    const classes = await TutorClass.findAll({
      where: {
        tutorId: tutorId,
      },
    });

    return Promise.all(
      classes.map(
        async (tutorClass) =>
          await getClassViewById(centreId, tutorClass.classId)
      )
    );
  } catch (error: any) {
    throw new Error(`Error getting classes by tutor ID: ${error}`);
  }
}

async function getAllClasses(): Promise<Class[]> {
  try {
    const classes = await Class.findAll();
    return classes;
  } catch (error: any) {
    throw new Error(`Error getting classes: ${error}`);
  }
}

async function enrollStudentInClass(
  centreId: number,
  classIds: number[],
  studentId: number
): Promise<boolean> {
  try {
    await verifyStudentAndClassesExist(centreId, classIds, studentId);
    const classIdsDict = classIds.reduce(
      (dict: { [key: number]: boolean }, classId) => {
        dict[classId] = true;
        return dict;
      },
      {}
    );
    const idsFound: { [key: number]: boolean } = {};

    const studentClasses = await StudentClass.findAll({
      where: {
        studentId: studentId,
      },
    });

    for (const studentClass of studentClasses) {
      if (classIdsDict[studentClass.classId]) {
        idsFound[studentClass.classId] = true;
        continue;
      }

      await StudentClass.destroy({
        where: {
          studentId: studentId,
          classId: studentClass.classId,
        },
      });
    }

    for (const classId of classIds) {
      if (idsFound[classId]) {
        continue;
      }

      await StudentClass.create({
        studentId: studentId,
        classId: classId,
      });
    }

    return true;
  } catch (error: any) {
    throw new Error(`Error enrolling student in class: ${error}`);
  }
}

async function removeStudentFromClass(
  centreId: number,
  classId: number,
  studentId: number
): Promise<boolean> {
  try {
    await verifyStudentAndClassExist(centreId, classId, studentId);

    const deletedCount = await StudentClass.destroy({
      where: {
        studentId: studentId,
        classId: classId,
      },
    });

    return deletedCount > 0;
  } catch (error: any) {
    throw new Error(`Error unrolling student from class: ${error}`);
  }
}

async function assignTutorToClass(
  centreId: number,
  classIds: number[],
  tutorId: number
): Promise<boolean> {
  try {
    await verifyTutorAndClassesExist(centreId, classIds, tutorId);
    const classIdsDict = classIds.reduce(
      (dict: { [key: number]: boolean }, classId) => {
        dict[classId] = true;
        return dict;
      },
      {}
    );
    const idsFound: { [key: number]: boolean } = {};

    const tutorClasses = await TutorClass.findAll({
      where: {
        tutorId: tutorId,
      },
    });

    for (const tutorClass of tutorClasses) {
      if (classIdsDict[tutorClass.classId]) {
        idsFound[tutorClass.classId] = true;
        continue;
      }

      await TutorClass.destroy({
        where: {
          tutorId: tutorId,
          classId: tutorClass.classId,
        },
      });
    }

    for (const classId of classIds) {
      if (idsFound[classId]) {
        continue;
      }

      const otherTutorClasses = await TutorClass.findAll({
        where: {
          classId: classIds,
        },
      });

      for (const otherTutorClass of otherTutorClasses) {
        if (otherTutorClass.tutorId === tutorId) {
          continue;
        }

        await otherTutorClass.destroy();
      }

      await TutorClass.create({
        tutorId: tutorId,
        classId: classId,
      });
    }

    return true;
  } catch (error: any) {
    throw new Error(`Error assigning tutor to class: ${error}`);
  }
}

async function unassignTutorFromClass(
  centreId: number,
  classId: number,
  tutorId: number
): Promise<boolean> {
  try {
    await verifyTutorAndClassExist(centreId, classId, tutorId);

    const deletedCount = await TutorClass.destroy({
      where: {
        tutorId: tutorId,
        classId: classId,
      },
    });

    return deletedCount > 0;
  } catch (error: any) {
    throw new Error(`Error dismissing tutor from class: ${error}`);
  }
}

async function verifyClassExist(
  centreId: number,
  classId: number
): Promise<void> {
  const singleClass = await Class.findOne({
    where: {
      centreId: centreId,
      id: classId,
    },
  });
  if (!singleClass) {
    throw new Error(`Class does not exist in centre ${centreId}: ${classId}`);
  }
}

async function verifyStudentAndClassesExist(
  centreId: number,
  classIds: number[],
  studentId: number
): Promise<void> {
  for (const classId of classIds) {
    await verifyClassExist(centreId, classId);
  }

  const student = await Student.findOne({
    where: {
      centreId: centreId,
      id: studentId,
    },
  });
  if (!student) {
    throw new Error(
      `Student does not exist in centre ${centreId}: ${studentId}`
    );
  }
}

async function verifyStudentAndClassExist(
  centreId: number,
  classId: number,
  studentId: number
): Promise<void> {
  await verifyClassExist(centreId, classId);

  const student = await Student.findOne({
    where: {
      centreId: centreId,
      id: studentId,
    },
  });
  if (!student) {
    throw new Error(
      `Student does not exist in centre ${centreId}: ${studentId}`
    );
  }
}

async function verifyTutorAndClassesExist(
  centreId: number,
  classIds: number[],
  tutorId: number
): Promise<void> {
  for (const classId of classIds) {
    await verifyClassExist(centreId, classId);
  }

  const tutor = await Tutor.findOne({
    where: {
      centreId: centreId,
      id: tutorId,
    },
  });
  if (!tutor) {
    throw new Error(`Tutor does not exist in centre ${centreId}: ${tutorId}`);
  }
}

async function verifyTutorAndClassExist(
  centreId: number,
  classId: number,
  tutorId: number
): Promise<void> {
  await verifyClassExist(centreId, classId);

  const tutor = await Tutor.findOne({
    where: {
      centreId: centreId,
      id: tutorId,
    },
  });
  if (!tutor) {
    throw new Error(`Tutor does not exist in centre ${centreId}: ${tutorId}`);
  }
}

export {
  createClass,
  deleteClassById,
  editClassById,
  getClassById,
  getClassViewById,
  getClassesByCentreId,
  getClassesByStudentId,
  getClassesByTutorId,
  getAllClasses,
  enrollStudentInClass,
  removeStudentFromClass,
  assignTutorToClass,
  unassignTutorFromClass,
};
