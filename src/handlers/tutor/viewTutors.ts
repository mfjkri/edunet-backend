import { Request, Response } from "express";

import { getTutorsByCentreId } from "../../dataaccess/tutor";
import { ViewTutorsParams } from "../../params/tutor/viewTutors";
import User from "../../models/user";

const SUCCESS_VIEW_TUTORS = "Viewed tutors successfully";

const ERROR_FAILED_TO_VIEW_TUTORS = "Failed to view tutors";

export default async function handleViewTutors(
  req: Request,
  res: Response,
  params: ViewTutorsParams
) {
  try {
    const user: User = req.body.user;
    const response = await getTutorsByCentreId(user.centreId);

    res.status(201).json({
      message: SUCCESS_VIEW_TUTORS,
      tutors: response,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: ERROR_FAILED_TO_VIEW_TUTORS, error: error.message });
  }
}
