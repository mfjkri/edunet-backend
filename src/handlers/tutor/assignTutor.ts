import { Request, Response } from "express";

import { AssignTutorParams } from "../../params/tutor/assignTutor";
import { assignTutorToClass } from "../../dataaccess/class";
import User from "../../models/user";

const SUCCESS_ASSIGNED_TUTOR = "Tutor assigned successfully";

const ERROR_FAILED_TO_ASSIGN_TUTOR = "Failed to assign tutor";

export default async function handleAssignTutor(
  req: Request,
  res: Response,
  params: AssignTutorParams
) {
  try {
    const user: User = req.body.user;
    const response = await assignTutorToClass(
      user.centreId,
      params.classId,
      params.tutorId
    );

    res
      .status(201)
      .json({ message: SUCCESS_ASSIGNED_TUTOR, isAssigned: response });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: ERROR_FAILED_TO_ASSIGN_TUTOR, error: error.message });
  }
}
