import Avatar from "../models/avatar";
import Centre from "../models/centre";
import Class from "../models/class";
import Parent from "../models/parent";
import Student from "../models/student";
import User from "../models/user";

async function createStudent(
  contact: string,
  userId: number,
  parentId: number,
  centreId: number
): Promise<Student> {
  try {
    return await Student.create({
      contact: contact,
      userId: userId,
      parentId: parentId,
      centreId: centreId,
    });
  } catch (error: any) {
    throw new Error(`Error creating student: ${error}`);
  }
}

async function deleteStudentById(
  centreId: number,
  studentId: number
): Promise<boolean> {
  try {
    return (
      (await Student.destroy({
        where: {
          centreId: centreId,
          id: studentId,
        },
      })) > 0
    );
  } catch (error: any) {
    throw new Error(`Error deleting student: ${error}`);
  }
}

async function editStudentById(
  centreId: number,
  studentId: number,
  newFullName: string,
  newContact: string
): Promise<Student> {
  try {
    const student = await Student.findOne({
      where: { centreId: centreId, id: studentId },
      include: {
        model: User,
        as: "user",
      },
    });

    if (!student) {
      throw new Error(`Student with ID ${studentId} not found`);
    }
    if (!student.user) {
      throw new Error(`User for Student with ID ${studentId} not found`);
    }

    if (newContact) {
      student.contact = newContact;
    }
    if (newFullName) {
      student.user.fullName = newFullName;
    }

    await student.save();
    await student.user.save();
    await student.reload();

    return student;
  } catch (error: any) {
    throw new Error(`Error editing student: ${error}`);
  }
}

async function getStudentById(
  centreId: number,
  studentId: number
): Promise<Student> {
  try {
    const student = await Student.findOne({
      where: {
        centreId: centreId,
        id: studentId,
      },
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
        { model: Centre, as: "centre" },
      ],
    });

    if (!student) {
      throw new Error(`Student with ID ${studentId} not found`);
    }

    return student;
  } catch (error: any) {
    throw new Error(`Error getting student: ${error}`);
  }
}

async function getStudentViewById(
  centreId: number,
  studentId: number
): Promise<Student> {
  try {
    const student = await Student.findOne({
      where: {
        centreId: centreId,
        id: studentId,
      },
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
        {
          model: Centre,
          as: "centre",
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
        { model: Class, as: "classes" },
      ],
    });

    if (!student) {
      throw new Error(`Student with ID ${studentId} not found`);
    }

    return student;
  } catch (error: any) {
    throw new Error(`Error getting student view: ${error}`);
  }
}

async function getStudentViewByUserId(
  centreId: number,
  userId: number
): Promise<Student> {
  try {
    const student = await Student.findOne({
      where: {
        centreId: centreId,
        userId: userId,
      },
    });

    if (!student) {
      throw new Error(`Student with ID ${userId} not found`);
    }

    return getStudentViewById(centreId, student.id);
  } catch (error: any) {
    throw new Error(`Error getting student view: ${error}`);
  }
}

async function getStudentsByCentreId(centreId: number): Promise<Student[]> {
  try {
    const students = await Student.findAll({
      where: {
        centreId: centreId,
      },
    });
    return await Promise.all(
      students.map(
        async (student) => await getStudentViewById(centreId, student.id)
      )
    );
  } catch (error: any) {
    throw new Error(`Error getting students by centre ID: ${error}`);
  }
}

async function getStudentsByParentId(
  centreId: number,
  parentId: number
): Promise<Student[]> {
  try {
    const students = await Student.findAll({
      where: {
        parentId: parentId,
      },
    });
    return await Promise.all(
      students.map(
        async (student) => await getStudentViewById(centreId, student.id)
      )
    );
  } catch (error: any) {
    throw new Error(`Error getting students by parent ID: ${error}`);
  }
}

async function getAllStudents(): Promise<Student[]> {
  try {
    return await Student.findAll();
  } catch (error: any) {
    throw new Error(`Error getting students: ${error}`);
  }
}

export {
  createStudent,
  deleteStudentById,
  editStudentById,
  getStudentById,
  getStudentViewById,
  getStudentsByCentreId,
  getStudentViewByUserId,
  getStudentsByParentId,
  getAllStudents,
};
