import { Request, Response } from "express";

import { ViewMessagesParams } from "../../params/message/viewMessages";
import { getMessages } from "../../dataaccess/message";
import User from "../../models/user";

const SUCCESS_VIEW_MESSAGES = "Viewed messages successfully";

const ERROR_FAILED_TO_VIEW_MESSAGES = "Failed to view messages";

export default async function handleViewMessages(
  req: Request,
  res: Response,
  params: ViewMessagesParams
) {
  try {
    const user: User = req.body.user;
    const id = req.params.id;
    const response = await getMessages(user.centreId, user.id, parseInt(id));

    console.log(response);

    res.status(201).json({
      message: SUCCESS_VIEW_MESSAGES,
      ...response,
    });
  } catch (error: any) {
    res.status(500).json({
      message: ERROR_FAILED_TO_VIEW_MESSAGES,
      error: error.message,
    });
  }
}
