import { Request, Response } from "express";

import { ViewClassParams } from "../../params/class/viewClass";
import { getClassViewById } from "../../dataaccess/class";
import User from "../../models/user";

const SUCCESS_VIEW_CLASS = "Viewed class successfully";

const ERROR_FAILED_TO_VIEW_CLASS = "Failed to view class";

export default async function handleViewClass(
  req: Request,
  res: Response,
  params: ViewClassParams
) {
  try {
    const user: User = req.body.user;
    const id = req.params.id;
    const response = await getClassViewById(user.centreId, parseInt(id));

    res.status(201).json({
      message: SUCCESS_VIEW_CLASS,
      class: response,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: ERROR_FAILED_TO_VIEW_CLASS, error: error.message });
  }
}
