import { Request, Response } from "express";

import { DeleteAnnouncementParams } from "../../params/announcement/deleteAnnouncement";
import { deleteAnnouncement } from "../../dataaccess/announcement";
import User from "../../models/user";

const SUCCESS_DELETE_ANNOUNCEMENT = "Announcement deleted successfully";

const ERROR_FAILED_TO_DELETE_ANNOUNCEMENT = "Failed to delete announcement";

export default async function handleDeleteAnnouncement(
  req: Request,
  res: Response,
  params: DeleteAnnouncementParams
) {
  try {
    const user: User = req.body.user;
    await deleteAnnouncement(user.centreId, user.id, params.announcementId);

    res.status(201).json({ message: SUCCESS_DELETE_ANNOUNCEMENT });
  } catch (error: any) {
    res.status(500).json({
      message: ERROR_FAILED_TO_DELETE_ANNOUNCEMENT,
      error: error.message,
    });
  }
}
