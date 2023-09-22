import { Request, Response } from "express";

import { EnrollStudentParams } from "../../params/student/enrollStudent";
import { enrollStudentInClass } from "../../dataaccess/class";
import User from "../../models/user";

const SUCCESS_ASSIGNED_STUDENT = "Student assigned successfully";

const ERROR_FAILED_TO_ASSIGN_STUDENT = "Failed to assign student";

export default async function handleEnrollStudent(
  req: Request,
  res: Response,
  params: EnrollStudentParams
) {
  try {
    const user: User = req.body.user;
    const response = await enrollStudentInClass(
      user.centreId,
      params.classIds,
      params.studentId
    );

    res
      .status(201)
      .json({ message: SUCCESS_ASSIGNED_STUDENT, isAssigned: response });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: ERROR_FAILED_TO_ASSIGN_STUDENT, error: error.message });
  }
}
