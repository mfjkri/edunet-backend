import Avatar from "../models/avatar";
import Centre from "../models/centre";
import Class from "../models/class";
import Parent from "../models/parent";
import Student from "../models/student";
import User from "../models/user";

async function createParent(
  contact: string,
  userId: number,
  centreId: number
): Promise<Parent> {
  try {
    return await Parent.create({
      contact: contact,
      userId: userId,
      centreId: centreId,
    });
  } catch (error: any) {
    throw new Error(`Error creating parent: ${error}`);
  }
}

async function deleteParentById(
  centreId: number,
  parentId: number
): Promise<boolean> {
  try {
    return (
      (await Parent.destroy({
        where: {
          centreId: centreId,
          id: parentId,
        },
      })) > 0
    );
  } catch (error: any) {
    throw new Error(`Error deleting parent: ${error}`);
  }
}

async function editParentById(
  centreId: number,
  parentId: number,
  newFullName: string,
  newContact: string
): Promise<Parent> {
  try {
    const parent = await Parent.findOne({
      where: { centreId: centreId, id: parentId },
      include: {
        model: User,
        as: "user",
      },
    });

    if (!parent) {
      throw new Error(`Parent with ID ${parentId} not found`);
    }
    if (!parent.user) {
      throw new Error(`User for Parent with ID ${parentId} not found`);
    }

    if (newContact) {
      parent.contact = newContact;
    }
    if (newFullName) {
      parent.user.fullName = newFullName;
    }

    await parent.save();
    await parent.user.save();
    await parent.reload();

    return parent;
  } catch (error: any) {
    throw new Error(`Error editing parent: ${error}`);
  }
}

async function getParentById(
  centreId: number,
  parentId: number
): Promise<Parent> {
  try {
    const parent = await Parent.findOne({
      where: {
        centreId: centreId,
        id: parentId,
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

    if (!parent) {
      throw new Error(`Parent with ID ${parentId} not found`);
    }

    return parent;
  } catch (error: any) {
    throw new Error(`Error getting parent: ${error}`);
  }
}

async function getParentViewById(
  centreId: number,
  parentId: number
): Promise<Parent> {
  try {
    const parent = await Parent.findOne({
      where: {
        centreId: centreId,
        id: parentId,
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
          model: Student,
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
            { model: Class, as: "classes" },
          ],
          as: "students",
        },
      ],
    });

    if (!parent) {
      throw new Error(`Parent with ID ${parentId} not found`);
    }

    return parent;
  } catch (error: any) {
    throw new Error(`Error getting parent view: ${error}`);
  }
}

async function getParentViewByUserId(
  centreId: number,
  userId: number
): Promise<Parent> {
  try {
    const parent = await Parent.findOne({
      where: {
        centreId: centreId,
        userId: userId,
      },
    });

    if (!parent) {
      throw new Error(`Parent with ID ${userId} not found`);
    }

    return getParentViewById(centreId, parent.id);
  } catch (error: any) {
    throw new Error(`Error getting parent view: ${error}`);
  }
}

async function getParentsByCentreId(centreId: number): Promise<Parent[]> {
  try {
    const parents = await Parent.findAll({
      where: {
        centreId: centreId,
      },
    });

    return await Promise.all(
      parents.map(
        async (parent) => await getParentViewById(centreId, parent.id)
      )
    );
  } catch (error: any) {
    throw new Error(`Error getting parents by centre ID: ${error}`);
  }
}

async function getAllParents(): Promise<Parent[]> {
  try {
    return await Parent.findAll();
  } catch (error: any) {
    throw new Error(`Error getting parents: ${error}`);
  }
}

export {
  createParent,
  deleteParentById,
  editParentById,
  getParentById,
  getParentViewById,
  getParentViewByUserId,
  getParentsByCentreId,
  getAllParents,
};
