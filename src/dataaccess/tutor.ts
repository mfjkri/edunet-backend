import Tutor from "../models/tutor";
import User from "../models/user";
import Centre from "../models/centre";
import Class from "../models/class";
import Avatar from "../models/avatar";

async function createTutor(
  contact: string,
  userId: number,
  centreId: number
): Promise<Tutor> {
  try {
    return await Tutor.create({
      contact: contact,
      userId: userId,
      centreId: centreId,
    });
  } catch (error: any) {
    throw new Error(`Error creating tutor: ${error}`);
  }
}

async function deleteTutorById(
  centreId: number,
  tutorId: number
): Promise<boolean> {
  try {
    return (
      (await Tutor.destroy({
        where: {
          centreId: centreId,
          id: tutorId,
        },
      })) > 0
    );
  } catch (error: any) {
    throw new Error(`Error deleting tutor: ${error}`);
  }
}

async function editTutorById(
  centreId: number,
  tutorId: number,
  newFullName: string,
  newContact: string
): Promise<Tutor> {
  try {
    const tutor = await Tutor.findOne({
      where: { id: tutorId, centreId: centreId },
      include: {
        model: User,
        as: "user",
      },
    });

    if (!tutor) {
      throw new Error(`Tutor with ID ${tutorId} not found`);
    }
    if (!tutor.user) {
      throw new Error(`User of Tutor with ID ${tutorId} not found`);
    }

    if (newContact) {
      tutor.contact = newContact;
    }
    if (newFullName) {
      tutor.user.fullName = newFullName;
    }

    await tutor.save();
    await tutor.user.save();
    await tutor.reload();

    return tutor;
  } catch (error: any) {
    throw new Error(`Error editing tutor: ${error}`);
  }
}

async function getTutorById(centreId: number, tutorId: number): Promise<Tutor> {
  try {
    const tutor = await Tutor.findOne({
      where: {
        centreId: centreId,
        id: tutorId,
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

    if (!tutor) {
      throw new Error(`Tutor with ID ${tutorId} not found`);
    }

    return tutor;
  } catch (error: any) {
    throw new Error(`Error getting tutor: ${error}`);
  }
}

async function getTutorViewById(
  centreId: number,
  tutorId: number
): Promise<Tutor> {
  try {
    const tutor = await Tutor.findOne({
      where: {
        centreId: centreId,
        id: tutorId,
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
        { model: Class, as: "classes" },
      ],
    });

    if (!tutor) {
      throw new Error(`Tutor with ID ${tutorId} not found`);
    }

    return tutor;
  } catch (error: any) {
    throw new Error(`Error getting tutor view: ${error}`);
  }
}

async function getTutorViewByUserId(
  centreId: number,
  userId: number
): Promise<Tutor> {
  try {
    const tutor = await Tutor.findOne({
      where: {
        centreId: centreId,
        userId: userId,
      },
    });

    if (!tutor) {
      throw new Error(`Tutor with ID ${userId} not found`);
    }

    return getTutorViewById(centreId, tutor.id);
  } catch (error: any) {
    throw new Error(`Error getting tutor view: ${error}`);
  }
}

async function getTutorsByCentreId(centreId: number): Promise<Tutor[]> {
  try {
    const tutors = await Tutor.findAll({
      where: {
        centreId: centreId,
      },
    });
    return await Promise.all(
      tutors.map(async (tutor) => await getTutorViewById(centreId, tutor.id))
    );
  } catch (error: any) {
    throw new Error(`Error getting tutors by centre ID: ${error}`);
  }
}

async function getAllTutors(): Promise<Tutor[]> {
  try {
    return await Tutor.findAll();
  } catch (error: any) {
    throw new Error(`Error getting tutors: ${error}`);
  }
}

export {
  createTutor,
  deleteTutorById,
  editTutorById,
  getTutorById,
  getTutorViewById,
  getTutorViewByUserId,
  getAllTutors,
  getTutorsByCentreId,
};
