import { Request, Response } from "express";

import { getNotesByUserId } from "../../dataaccess/note";
import { ViewNotesParams } from "../../params/note/viewNotes";
import User from "../../models/user";

const SUCCESS_VIEW_NOTES = "Viewed notes successfully";

const ERROR_FAILED_TO_VIEW_NOTES = "Failed to view notes";

export default async function handleViewNotes(
  req: Request,
  res: Response,
  params: ViewNotesParams
) {
  try {
    const user: User = req.body.user;
    const id = req.params.id;
    const response = await getNotesByUserId(user.centreId, parseInt(id));

    res.status(201).json({
      message: SUCCESS_VIEW_NOTES,
      notes: response,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: ERROR_FAILED_TO_VIEW_NOTES, error: error.message });
  }
}
