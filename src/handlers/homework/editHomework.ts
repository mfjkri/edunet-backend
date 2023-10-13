import { Request, Response } from "express";

import User from "../../models/user";
import { EditHomeworkParams } from "../../params/homework/editHomework";
import { editHomework } from "../../dataaccess/homework";

const SUCCESS_EDITED_HOMEWORK = "Homework edited successfully";

const ERROR_FAILED_TO_EDIT_HOMEWORK = "Failed to edit homework";

export default async function handleEditHomework(
  req: Request,
  res: Response,
  params: EditHomeworkParams
) {
  try {
    const user: User = req.body.user;
    await editHomework(
      user.centreId,
      user.id,
      params.homeworkId,
      params.title,
      params.description,
      params.dueDate
    );

    res.status(201).json({ message: SUCCESS_EDITED_HOMEWORK });
  } catch (error: any) {
    res.status(500).json({
      message: ERROR_FAILED_TO_EDIT_HOMEWORK,
      error: error.message,
    });
  }
}
