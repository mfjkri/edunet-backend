import { Request, Response } from "express";

import { UnassignTutorParams } from "../../params/tutor/unassignTutor";
import { unassignTutorFromClass } from "../../dataaccess/class";
import User from "../../models/user";

const SUCCESS_UNASSIGNED_TUTOR = "Tutor unassigned successfully";

const ERROR_FAILED_TO_UNASSIGN_TUTOR = "Failed to unassign tutor";

export default async function handleUnassignTutor(
  req: Request,
  res: Response,
  params: UnassignTutorParams
) {
  try {
    const user: User = req.body.user;
    const response = await unassignTutorFromClass(
      user.centreId,
      params.classId,
      params.tutorId
    );

    res
      .status(201)
      .json({ message: SUCCESS_UNASSIGNED_TUTOR, isAssigned: response });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: ERROR_FAILED_TO_UNASSIGN_TUTOR, error: error.message });
  }
}
