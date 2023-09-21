import { Request, Response } from "express";

import { ViewNoteParams } from "../../params/note/viewNote";
import { getNoteById } from "../../dataaccess/note";
import User from "../../models/user";

const SUCCESS_VIEW_NOTE = "Viewed note successfully";

const ERROR_FAILED_TO_VIEW_NOTE = "Failed to view note";

export default async function handleViewNote(
  req: Request,
  res: Response,
  params: ViewNoteParams
) {
  try {
    const user: User = req.body.user;
    const id = req.params.id;
    const response = await getNoteById(user.centreId, parseInt(id));

    res.status(201).json({
      message: SUCCESS_VIEW_NOTE,
      note: response,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: ERROR_FAILED_TO_VIEW_NOTE, error: error.message });
  }
}
