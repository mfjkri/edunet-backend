import { Request, Response } from "express";

import { ViewClassesParams } from "../../params/class/viewClasses";
import { getClassesByCentreId } from "../../dataaccess/class";
import User from "../../models/user";

const SUCCESS_VIEW_CLASSES = "Viewed classes successfully";

const ERROR_FAILED_TO_VIEW_CLASSES = "Failed to view classes";

export default async function handleViewClasses(
  req: Request,
  res: Response,
  params: ViewClassesParams
) {
  try {
    const user: User = req.body.user;
    const response = await getClassesByCentreId(user.centreId);

    res.status(201).json({
      message: SUCCESS_VIEW_CLASSES,
      classes: response,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: ERROR_FAILED_TO_VIEW_CLASSES, error: error.message });
  }
}
