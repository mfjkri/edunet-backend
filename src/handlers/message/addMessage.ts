import { Request, Response } from "express";

import { AddMessageParam } from "../../params/message/addMessage";
import { createMessage } from "../../dataaccess/message";
import User from "../../models/user";

const SUCCESS_CREATED_MESSAGE = "Message created successfully";

const ERROR_FAILED_TO_CREATE_MESSAGE = "Failed to create message";

export default async function handleAddMessage(
  req: Request,
  res: Response,
  params: AddMessageParam
) {
  try {
    const user = req.body.user as User;

    const response = await createMessage(
      user.centreId,
      user.id,
      params.receiverId,
      params.content
    );

    res
      .status(201)
      .json({ message: SUCCESS_CREATED_MESSAGE, created_message: response });
  } catch (error: any) {
    res.status(500).json({
      message: ERROR_FAILED_TO_CREATE_MESSAGE,
      error: error.message,
    });
  }
}
