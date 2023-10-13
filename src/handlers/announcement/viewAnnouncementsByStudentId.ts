import { Request, Response } from "express";

import { getAnnouncementsByStudentId } from "../../dataaccess/announcement";
import { ViewAnnouncementsParams } from "../../params/announcement/viewAnnouncements";
import User from "../../models/user";

const SUCCESS_VIEW_ANNOUNCEMENTS = "Viewed announcements successfully";

const ERROR_FAILED_TO_VIEW_ANNOUNCEMENTS = "Failed to view announcements";

export default async function handleViewAnnouncementsByStudentId(
  req: Request,
  res: Response,
  params: ViewAnnouncementsParams
) {
  try {
    const user: User = req.body.user;
    const id = req.params.id;
    const response = await getAnnouncementsByStudentId(
      user.centreId,
      parseInt(id)
    );

    res.status(201).json({
      message: SUCCESS_VIEW_ANNOUNCEMENTS,
      announcements: response,
    });
  } catch (error: any) {
    res.status(500).json({
      message: ERROR_FAILED_TO_VIEW_ANNOUNCEMENTS,
      error: error.message,
    });
  }
}
