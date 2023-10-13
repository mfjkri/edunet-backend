import Announcement from "../models/announcement";
import User from "../models/user";
import { getClassById, getClassesByStudentId } from "./class";

async function createAnnouncement(
  centreId: number,
  classId: number,
  creatorId: number,
  title: string,
  content: string
): Promise<Announcement> {
  try {
    return await Announcement.create({
      centreId: centreId,
      classId: classId,
      creatorId: creatorId,
      title: title,
      content: content,
    });
  } catch (error: any) {
    throw new Error(`Failed to create announcement: ${error.message}`);
  }
}

async function deleteAnnouncement(
  centreId: number,
  userId: number,
  announcementId: number
): Promise<boolean> {
  try {
    const numDeletedRows = await Announcement.destroy({
      where: { centreId: centreId, id: announcementId, creatorId: userId },
    });
    return numDeletedRows > 0;
  } catch (error: any) {
    throw new Error(`Failed to delete announcement: ${error.message}`);
  }
}

async function editAnnouncement(
  centreId: number,
  userId: number,
  announcementId: number,
  title: string,
  content: string
): Promise<Announcement> {
  try {
    const announcement = await Announcement.findOne({
      where: { centreId: centreId, id: announcementId, creatorId: userId },
    });
    if (!announcement) {
      throw new Error(`Announcement with ID ${announcementId} not found`);
    }

    if (announcement.content) {
      announcement.content = content;
    }

    if (announcement.title) {
      announcement.title = title;
    }

    await announcement.save();
    await announcement.reload();

    return announcement;
  } catch (error: any) {
    throw new Error(`Failed to update announcement: ${error.message}`);
  }
}

async function getAnnouncementsByClassId(
  centreId: number,
  classId: number
): Promise<Announcement[]> {
  try {
    const targetClass = await getClassById(centreId, classId);
    if (!targetClass) {
      throw new Error(`Class with ID ${classId} not found`);
    }

    return await Announcement.findAll({
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

async function getAnnouncementsByStudentId(
  centreId: number,
  studentId: number
): Promise<Announcement[]> {
  try {
    const classes = await getClassesByStudentId(centreId, studentId);
    const classIds = classes.map((c) => c.id);

    return await Announcement.findAll({
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
  createAnnouncement,
  deleteAnnouncement,
  editAnnouncement,
  getAnnouncementsByClassId,
  getAnnouncementsByStudentId,
};
