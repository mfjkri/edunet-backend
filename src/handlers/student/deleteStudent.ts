import { Request, Response } from "express";

import { deleteStudentUser } from "../../dataaccess/user";
import { DeleteStudentParams } from "../../params/student/deleteStudent";
import User from "../../models/user";

const SUCCESS_DELETE_STUDENT = "Student deleted successfully";

const ERROR_FAILED_TO_DELETE_STUDENT = "Failed to delete student";

export default async function handleDeleteStudent(
  req: Request,
  res: Response,
  params: DeleteStudentParams
) {
  try {
    const user: User = req.body.user;
    const response = await deleteStudentUser(user.centreId, params.studentId);

    res
      .status(201)
      .json({ message: SUCCESS_DELETE_STUDENT, isDeleted: response });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: ERROR_FAILED_TO_DELETE_STUDENT, error: error.message });
  }
}
