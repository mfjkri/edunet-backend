import { Request, Response } from "express";

import { createStudentUser } from "../../dataaccess/user";
import { AddStudentParams } from "../../params/student/addStudent";
import User from "../../models/user";

const SUCCESS_CREATED_STUDENT = "Student created successfully";

const ERROR_FAILED_TO_CREATE_STUDENT = "Failed to create student";

export default async function handleAddStudent(
  req: Request,
  res: Response,
  params: AddStudentParams
) {
  try {
    const user = req.body.user as User;

    const response = await createStudentUser(
      user.centreId,
      params.classIds,
      params.studentFullName,
      params.studentEmail,
      params.studentContact,
      params.parentFullName,
      params.parentEmail,
      params.parentContact
    );

    res.status(201).json({ message: SUCCESS_CREATED_STUDENT, ...response });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: ERROR_FAILED_TO_CREATE_STUDENT, error: error.message });
  }
}
