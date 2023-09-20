import { Request, Response } from "express";

import { DeleteTutorParams } from "../../params/tutor/deleteTutor";
import { deleteTutorUser } from "../../dataaccess/user";
import User from "../../models/user";

const SUCCESS_DELETE_TUTOR = "Tutor deleted successfully";

const ERROR_FAILED_TO_DELETE_TUTOR = "Failed to delete tutor";

export default async function handleDeleteTutor(
  req: Request,
  res: Response,
  params: DeleteTutorParams
) {
  try {
    const user: User = req.body.user;
    const response = await deleteTutorUser(user.centreId, params.tutorId);

    res
      .status(201)
      .json({ message: SUCCESS_DELETE_TUTOR, isDeleted: response });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: ERROR_FAILED_TO_DELETE_TUTOR, error: error.message });
  }
}
