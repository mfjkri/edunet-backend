import { Request, Response } from "express";

import { ViewTutorParams } from "../../params/tutor/viewTutor";
import { getTutorViewById } from "../../dataaccess/tutor";
import User from "../../models/user";

const SUCCESS_VIEW_TUTOR = "Viewed tutor successfully";

const ERROR_FAILED_TO_VIEW_TUTOR = "Failed to view tutor";

export default async function handleViewTutor(
  req: Request,
  res: Response,
  params: ViewTutorParams
) {
  try {
    const user: User = req.body.user;
    const id = req.params.id;
    const response = await getTutorViewById(user.centreId, parseInt(id));

    res.status(201).json({
      message: SUCCESS_VIEW_TUTOR,
      tutor: response,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: ERROR_FAILED_TO_VIEW_TUTOR, error: error.message });
  }
}
