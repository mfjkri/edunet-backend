import { Request, Response } from "express";

import { ViewHomeworkParams } from "../../params/homework/viewHomework";
import { getHomeworkByStudentId } from "../../dataaccess/homework";
import User from "../../models/user";

const SUCCESS_VIEW_HOMEWORK = "Viewed homework successfully";

const ERROR_FAILED_TO_VIEW_HOMEWORK = "Failed to view homework";

export default async function handleViewHomeworkByStudentId(
  req: Request,
  res: Response,
  params: ViewHomeworkParams
) {
  try {
    const user: User = req.body.user;
    const id = req.params.id;
    const response = await getHomeworkByStudentId(user.centreId, parseInt(id));

    res.status(201).json({
      message: SUCCESS_VIEW_HOMEWORK,
      homework: response,
    });
  } catch (error: any) {
    res.status(500).json({
      message: ERROR_FAILED_TO_VIEW_HOMEWORK,
      error: error.message,
    });
  }
}
