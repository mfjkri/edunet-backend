import { Request, Response } from "express";

import { ViewStudentsParams } from "../../params/student/viewStudents";
import { getStudentsByTutorId } from "../../dataaccess/student";
import User from "../../models/user";

const SUCCESS_VIEW_STUDENTS = "Viewed students successfully";

const ERROR_FAILED_TO_VIEW_STUDENTS = "Failed to view students";

export default async function handleViewStudentsByTutorId(
  req: Request,
  res: Response,
  params: ViewStudentsParams
) {
  try {
    const user: User = req.body.user;
    const id = parseInt(req.params.id);
    const response = await getStudentsByTutorId(user.centreId, id);

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
