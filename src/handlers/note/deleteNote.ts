import { Request, Response } from "express";

import { DeleteNoteParams } from "../../params/note/deleteNote";
import User from "../../models/user";
import { deleteNote } from "../../dataaccess/note";

const SUCCESS_DELETE_NOTE = "Note deleted successfully";

const ERROR_FAILED_TO_DELETE_NOTE = "Failed to delete note";

export default async function handleDeleteNote(
  req: Request,
  res: Response,
  params: DeleteNoteParams
) {
  try {
    const user: User = req.body.user;
    await deleteNote(user.centreId, params.noteId);

    res.status(201).json({ message: SUCCESS_DELETE_NOTE });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: ERROR_FAILED_TO_DELETE_NOTE, error: error.message });
  }
}
