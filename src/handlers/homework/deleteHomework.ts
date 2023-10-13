import { Request, Response } from "express";

import { DeleteHomeworkParams } from "../../params/homework/deleteHomework";
import { deleteHomework } from "../../dataaccess/homework";
import User from "../../models/user";

const SUCCESS_DELETE_HOMEWORK = "Homework deleted successfully";

const ERROR_FAILED_TO_DELETE_HOMEWORK = "Failed to delete homework";

export default async function handleDeleteHomework(
  req: Request,
  res: Response,
  params: DeleteHomeworkParams
) {
  try {
    const user: User = req.body.user;
    await deleteHomework(user.centreId, params.homeworkId);

    res.status(201).json({ message: SUCCESS_DELETE_HOMEWORK });
  } catch (error: any) {
    res.status(500).json({
      message: ERROR_FAILED_TO_DELETE_HOMEWORK,
      error: error.message,
    });
  }
}
