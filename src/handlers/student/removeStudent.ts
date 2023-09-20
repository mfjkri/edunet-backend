import { Request, Response } from "express";

import { RemoveStudentParams } from "../../params/student/removeStudent";
import { unrollStudentFromClass } from "../../dataaccess/class";
import User from "../../models/user";

const SUCCESS_REMOVE_STUDENT = "Student unassigned successfully";

const ERROR_FAILED_TO_REMOVE_STUDENT = "Failed to unassign student";

export default async function handleRemoveStudent(
  req: Request,
  res: Response,
  params: RemoveStudentParams
) {
  try {
    const user: User = req.body.user;
    const response = await unrollStudentFromClass(
      user.centreId,
      params.classId,
      params.studentId
    );

    res
      .status(201)
      .json({ message: SUCCESS_REMOVE_STUDENT, isAssigned: response });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: ERROR_FAILED_TO_REMOVE_STUDENT, error: error.message });
  }
}
