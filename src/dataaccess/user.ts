import User from "../models/user";
import Centre from "../models/centre";
import Admin from "../models/admin";
import Student from "../models/student";
import Parent from "../models/parent";
import { generatePassword } from "../utilities/auth";
import { createParent, getParentViewByUserId } from "./parent";
import { createStudent, getStudentViewByUserId } from "./student";
import { createAdmin, getAdminsByUserId } from "./admin";
import Tutor from "../models/tutor";
import { sendEmailWithPassword } from "../utilities/mail";
import Avatar from "../models/avatar";
import { getTutorViewByUserId } from "./tutor";
import { enrollStudentInClass } from "./class";

async function createUserWithCentreAndAdmin(
  centreName: string,
  fullName: string,
  email: string,
  password: string,
  adminContact: string
): Promise<{ centre: Centre; adminUser: User; admin: Admin }> {
  try {
    const centre = await Centre.create({
      name: centreName,
    });

    const adminUser = await User.create({
      fullName: fullName,
      email: email,
      password: password,
      type: "admin",
      centreId: centre.id,
    });

    const admin = await createAdmin(adminContact, adminUser.id, centre.id);

    return { centre, adminUser, admin };
  } catch (error: any) {
    throw new Error(`Error creating user with centre and admin: ${error}`);
  }
}

async function createStudentUser(
  centreId: number,
  classIds: number[],
  studentFullName: string,
  studentEmail: string,
  studentContact: string,
  parentFullName: string,
  parentEmail: string,
  parentContact: string
): Promise<{
  studentUser: User;
  student: Student;
  parentUser: User;
  parent: Parent;
  isEnrolled: boolean;
}> {
  try {
    let parentUser = await User.findOne({
      where: {
        email: parentEmail,
      },
    });
    let parent: Parent | null = null;

    if (parentUser) {
      parent = await Parent.findOne({
        where: {
          userId: parentUser.id,
        },
      });
    } else {
      const parentPassword = generatePassword();
      parentUser = await User.create({
        fullName: parentFullName,
        email: parentEmail,
        password: parentPassword,
        type: "parent",
        centreId: centreId,
      });
      sendEmailWithPassword(parentEmail, parentPassword);
    }

    if (!parent) {
      parent = await createParent(parentContact, parentUser.id, centreId);
    }

    let studentUser = await User.findOne({
      where: {
        email: studentEmail,
      },
    });
    let student: Student | null = null;

    if (studentUser) {
      student = await Student.findOne({
        where: {
          userId: studentUser.id,
        },
      });
    } else {
      const studentPassword = generatePassword();
      studentUser = await User.create({
        fullName: studentFullName,
        email: studentEmail,
        password: studentPassword,
        type: "student",
        centreId: centreId,
      });
      sendEmailWithPassword(studentEmail, studentPassword);
    }

    if (!student) {
      student = await createStudent(
        studentContact,
        studentUser.id,
        parent.id,
        centreId
      );
    }

    const isEnrolled = await enrollStudentInClass(
      centreId,
      classIds,
      student.id
    );

    return { studentUser, student, parentUser, parent, isEnrolled };
  } catch (error: any) {
    throw new Error(`Error creating user with student: ${error}`);
  }
}

async function createTutorUser(
  centreId: number,
  tutorFullName: string,
  tutorEmail: string,
  tutorContact: string
): Promise<{ tutorUser: User; tutor: Tutor }> {
  try {
    const tutorPassword = generatePassword();

    const tutorUser = await User.create({
      fullName: tutorFullName,
      email: tutorEmail,
      password: tutorPassword,
      type: "tutor",
      centreId: centreId,
    });

    const tutor = await Tutor.create({
      contact: tutorContact,
      userId: tutorUser.id,
      centreId: centreId,
    });

    return { tutorUser, tutor };
  } catch (error: any) {
    throw new Error(`Error creating tutor user: ${error}`);
  }
}

async function deleteStudentUser(
  centreId: number,
  studentId: number
): Promise<boolean> {
  try {
    const student = await Student.findOne({
      where: {
        centreId: centreId,
        id: studentId,
      },
    });

    if (!student) {
      throw new Error(`Student with ID ${studentId} not found`);
    }

    const user = await User.findOne({
      where: {
        centreId: centreId,
        id: student.userId,
      },
    });

    if (!user) {
      throw new Error(`User with ID ${student.userId} not found`);
    }

    user.destroy();

    return true;
  } catch (error: any) {
    throw new Error(`Error deleting student user: ${error}`);
  }
}

async function deleteTutorUser(
  centreId: number,
  tutorId: number
): Promise<boolean> {
  try {
    const tutor = await Tutor.findOne({
      where: {
        centreId: centreId,
        id: tutorId,
      },
    });

    if (!tutor) {
      throw new Error(`Tutor with ID ${tutorId} not found`);
    }

    const user = await User.findOne({
      where: {
        centreId: centreId,
        id: tutor.userId,
      },
    });

    if (!user) {
      throw new Error(`User with ID ${tutor.userId} not found`);
    }

    user.destroy();

    return true;
  } catch (error: any) {
    throw new Error(`Error deleting tutor user: ${error}`);
  }
}

async function getUserWithRelationAndCentre(centreId: number, userId: number) {
  try {
    const user = await User.findOne({
      where: {
        centreId: centreId,
        id: userId,
      },
      include: {
        model: Avatar,
        as: "avatar",
      },
      attributes: { exclude: ["password"] },
    });

    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }

    let view: any = null;
    switch (user.type) {
      case "student":
        view = await getStudentViewByUserId(centreId, userId);
        break;
      case "admin":
        view = await getAdminsByUserId(centreId, userId);
        break;
      case "parent":
        view = await getParentViewByUserId(centreId, userId);
        break;
      case "tutor":
        view = await getTutorViewByUserId(centreId, userId);
        break;
      default:
        throw new Error(`Invalid user type: ${user.type}`);
    }

    console.log(view);
    return {
      ...user.toJSON(),
      studentId: view.id,
      tutorId: view.id,
      fullName: user.fullName,
      email: user.email,
      contact: view.contact,
      type: user.type,
      avatar: user.avatar,
      centre: view.centre,
      classes: view.classes,
      user: view.user,
    };
  } catch (error: any) {
    throw new Error(`Error getting user with relation and centre: ${error}`);
  }
}

async function getUserWithRelationAndCentreByEmail(
  centreId: number,
  email: string
) {
  try {
    const user = await User.findOne({
      where: {
        centreId: centreId,
        email: email,
      },
    });

    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }

    return await getUserWithRelationAndCentre(centreId, user.id);
  } catch (error: any) {
    throw new Error(`Error getting user with relation and centre: ${error}`);
  }
}

export {
  createUserWithCentreAndAdmin,
  createStudentUser,
  createTutorUser,
  deleteStudentUser,
  deleteTutorUser,
  getUserWithRelationAndCentre,
  getUserWithRelationAndCentreByEmail,
};
