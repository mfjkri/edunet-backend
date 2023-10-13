import { Request, Response } from "express";

import { AddAnnouncementParams } from "../../params/announcement/addAnnouncement";
import { createAnnouncement } from "../../dataaccess/announcement";
import User from "../../models/user";

const SUCCESS_CREATED_ANNOUNCEMENT = "Announcement created successfully";

const ERROR_FAILED_TO_CREATE_ANNOUNCEMENT = "Failed to create announcement";

export default async function handleAddAnnouncement(
  req: Request,
  res: Response,
  params: AddAnnouncementParams
) {
  try {
    const user = req.body.user as User;

    const response = await createAnnouncement(
      user.centreId,
      params.classId,
      user.id,
      params.title,
      params.content
    );

    res
      .status(201)
      .json({ message: SUCCESS_CREATED_ANNOUNCEMENT, announcement: response });
  } catch (error: any) {
    res.status(500).json({
      message: ERROR_FAILED_TO_CREATE_ANNOUNCEMENT,
      error: error.message,
    });
  }
}
