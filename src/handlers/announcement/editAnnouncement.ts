import { Request, Response } from "express";

import User from "../../models/user";
import { EditAnnouncementParams } from "../../params/announcement/editAnnouncement";
import { editAnnouncement } from "../../dataaccess/announcement";

const SUCCESS_EDITED_ANNOUNCEMENT = "Announcement edited successfully";

const ERROR_FAILED_TO_EDIT_ANNOUNCEMENT = "Failed to edit announcement";

export default async function handleEditAnnouncement(
  req: Request,
  res: Response,
  params: EditAnnouncementParams
) {
  try {
    const user: User = req.body.user;
    await editAnnouncement(
      user.centreId,
      user.id,
      params.announcementId,
      params.title,
      params.content
    );

    res.status(201).json({ message: SUCCESS_EDITED_ANNOUNCEMENT });
  } catch (error: any) {
    res.status(500).json({
      message: ERROR_FAILED_TO_EDIT_ANNOUNCEMENT,
      error: error.message,
    });
  }
}
