import { Request, Response } from "express";

import { AddClassParams } from "../../params/class/addClass";
import { createClass } from "../../dataaccess/class";
import User from "../../models/user";

const SUCCESS_CREATED_CLASS = "Class created successfully";

const ERROR_FAILED_TO_CREATE_CLASS = "Failed to create class";

export default async function handleAddClass(
  req: Request,
  res: Response,
  params: AddClassParams
) {
  try {
    const user = req.body.user as User;

    const response = await createClass(
      user.centreId,
      params.name,
      params.day,
      params.time,
      params.venue
    );

    res.status(201).json({ message: SUCCESS_CREATED_CLASS, class: response });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: ERROR_FAILED_TO_CREATE_CLASS, error: error.message });
  }
}
