import { Request, Response } from "express";

import { EditClassParams } from "../../params/class/editClass";
import { editClassById } from "../../dataaccess/class";
import User from "../../models/user";

const SUCCESS_EDITED_CLASS = "Class edited successfully";

const ERROR_FAILED_TO_EDIT_CLASS = "Failed to edit class";

export default async function handleEditClass(
  req: Request,
  res: Response,
  params: EditClassParams
) {
  try {
    const user: User = req.body.user;
    const response = await editClassById(
      user.centreId,
      params.classId,
      params.name,
      params.day,
      params.time,
      params.venue
    );

    res.status(201).json({ message: SUCCESS_EDITED_CLASS, class: response });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: ERROR_FAILED_TO_EDIT_CLASS, error: error.message });
  }
}
