import { Request, Response } from "express";

import { createHomework } from "../../dataaccess/homework";
import { AddHomeworkParams } from "../../params/homework/addHomework";
import User from "../../models/user";

const SUCCESS_CREATED_HOMEWORK = "Homework created successfully";

const ERROR_FAILED_TO_CREATE_HOMEWORK = "Failed to create homework";

export default async function handleAddHomework(
  req: Request,
  res: Response,
  params: AddHomeworkParams
) {
  try {
    const user = req.body.user as User;

    const response = await createHomework(
      user.centreId,
      params.classId,
      user.id,
      params.title,
      params.description,
      params.dueDate
    );

    res
      .status(201)
      .json({ message: SUCCESS_CREATED_HOMEWORK, newHomeWork: response });
  } catch (error: any) {
    res.status(500).json({
      message: ERROR_FAILED_TO_CREATE_HOMEWORK,
      error: error.message,
    });
  }
}
