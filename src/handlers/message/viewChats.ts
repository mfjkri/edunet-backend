import { Request, Response } from "express";

import { ViewChatsParams } from "../../params/message/viewChats";
import { getChats } from "../../dataaccess/message";
import User from "../../models/user";

const SUCCESS_VIEW_CHATS = "Viewed chats successfully";

const ERROR_FAILED_TO_VIEW_CHATS = "Failed to view chats";

export default async function handleViewChats(
  req: Request,
  res: Response,
  params: ViewChatsParams
) {
  try {
    const user: User = req.body.user;
    const id = req.params.id;
    const response = await getChats(user.id);

    console.log(response);

    res.status(201).json({
      message: SUCCESS_VIEW_CHATS,
      chats: response,
    });
  } catch (error: any) {
    res.status(500).json({
      message: ERROR_FAILED_TO_VIEW_CHATS,
      error: error.message,
    });
  }
}
