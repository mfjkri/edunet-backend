import { Request, Response } from "express";

import { ViewStudentsParams } from "../../params/student/viewStudents";
import { getStudentsByCentreId } from "../../dataaccess/student";
import User from "../../models/user";

const SUCCESS_VIEW_STUDENTS = "Viewed students successfully";

const ERROR_FAILED_TO_VIEW_STUDENTS = "Failed to view students";

export default async function handleViewStudents(
  req: Request,
  res: Response,
  params: ViewStudentsParams
) {
  try {
    const user: User = req.body.user;
    const response = await getStudentsByCentreId(user.centreId);

    res.status(201).json({
      message: SUCCESS_VIEW_STUDENTS,
      students: response,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: ERROR_FAILED_TO_VIEW_STUDENTS, error: error.message });
  }
}
