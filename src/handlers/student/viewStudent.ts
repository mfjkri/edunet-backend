import { Request, Response } from "express";

import { ViewStudentParams } from "../../params/student/viewStudent";
import { getStudentViewById } from "../../dataaccess/student";
import User from "../../models/user";

const SUCCESS_VIEW_STUDENT = "Viewed student successfully";

const ERROR_FAILED_TO_VIEW_STUDENT = "Failed to view student";

export default async function handleViewStudent(
  req: Request,
  res: Response,
  params: ViewStudentParams
) {
  try {
    const user: User = req.body.user;
    const id = parseInt(req.params.id);

    const response = await getStudentViewById(user.centreId, id);
    if (user.id !== response.userId && user.type === "student") {
      return res.status(403).json({ message: "Forbidden" });
    }

    res.status(201).json({
      message: SUCCESS_VIEW_STUDENT,
      student: response,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: ERROR_FAILED_TO_VIEW_STUDENT, error: error.message });
  }
}
