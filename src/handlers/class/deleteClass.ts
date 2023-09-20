import { Request, Response } from "express";

import { DeleteClassParams } from "../../params/class/deleteClass";
import { deleteClassById } from "../../dataaccess/class";
import User from "../../models/user";

const SUCCESS_DELETE_CLASS = "Class deleted successfully";

const ERROR_FAILED_TO_DELETE_CLASS = "Failed to delete class";

export default async function handleDeleteClass(
  req: Request,
  res: Response,
  params: DeleteClassParams
) {
  try {
    const user: User = req.body.user;
    const response = await deleteClassById(user.centreId, params.classId);

    res
      .status(201)
      .json({ message: SUCCESS_DELETE_CLASS, isDeleted: response });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: ERROR_FAILED_TO_DELETE_CLASS, error: error.message });
  }
}
