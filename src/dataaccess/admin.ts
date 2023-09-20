import Admin from "../models/admin";
import Avatar from "../models/avatar";
import Centre from "../models/centre";
import User from "../models/user";

async function createAdmin(
  contact: string,
  userId: number,
  centreId: number
): Promise<Admin> {
  try {
    const admin = await Admin.create({
      contact: contact,
      userId: userId,
      centreId: centreId,
    });
    return admin;
  } catch (error: any) {
    throw new Error(`Error creating admin: ${error}`);
  }
}

async function deleteAdminById(id: number): Promise<boolean> {
  try {
    const deletedCount = await Admin.destroy({
      where: {
        id: id,
      },
    });
    return deletedCount > 0;
  } catch (error: any) {
    throw new Error(`Error deleting admin: ${error}`);
  }
}

async function editAdminById(
  centreId: number,
  adminId: number,
  newFullName: string,
  newContact: string
): Promise<Admin> {
  try {
    const admin = await Admin.findOne({
      where: { centreId: centreId, id: adminId },
      include: {
        model: User,
        as: "user",
      },
    });

    if (!admin) {
      throw new Error(`Admin with ID ${adminId} not found`);
    }
    if (!admin.user) {
      throw new Error(`User for Admin with ID ${adminId} not found`);
    }

    if (newContact) {
      admin.contact = newContact;
    }
    if (newFullName) {
      admin.user.fullName = newFullName;
    }

    await admin.save();
    await admin.user.save();
    await admin.reload();

    return admin;
  } catch (error: any) {
    throw new Error(`Error editing admin: ${error}`);
  }
}

async function getAdminById(centreId: number, adminId: number): Promise<Admin> {
  try {
    const admin = await Admin.findOne({
      where: {
        centreId: centreId,
        id: adminId,
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

    if (!admin) {
      throw new Error(`Admin with ID ${adminId} not found`);
    }

    return admin;
  } catch (error: any) {
    throw new Error(`Error getting admin: ${error}`);
  }
}

async function getAdminViewById(centreId: number, id: number): Promise<Admin> {
  return getAdminById(centreId, id);
}

async function getAdminsByUserId(
  centreId: number,
  userId: number
): Promise<Admin[]> {
  try {
    const admins = await Admin.findAll({
      where: {
        centreId: centreId,
        userId: userId,
      },
    });

    return await Promise.all(
      admins.map(async (admin) => await getAdminViewById(centreId, admin.id))
    );
  } catch (error: any) {
    throw new Error(`Error getting admins by centre ID: ${error}`);
  }
}

async function getAdminsByCentreId(centreId: number): Promise<Admin[]> {
  try {
    const admins = await Admin.findAll({
      where: {
        centreId: centreId,
      },
    });

    return await Promise.all(
      admins.map(async (admin) => await getAdminViewById(centreId, admin.id))
    );
  } catch (error: any) {
    throw new Error(`Error getting admins by centre ID: ${error}`);
  }
}

async function getAllAdmins(): Promise<Admin[]> {
  try {
    return await Admin.findAll();
  } catch (error: any) {
    throw new Error(`Error getting admins: ${error}`);
  }
}

export {
  createAdmin,
  deleteAdminById,
  editAdminById,
  getAdminById,
  getAdminViewById,
  getAdminsByUserId,
  getAdminsByCentreId,
  getAllAdmins,
};
