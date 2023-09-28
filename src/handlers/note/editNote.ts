import { Request, Response } from "express";

import { editNote } from "../../dataaccess/note";
import { EditNoteParams } from "../../params/note/editNote";
import User from "../../models/user";

const SUCCESS_EDITED_NOTE = "Note edited successfully";

const ERROR_FAILED_TO_EDIT_NOTE = "Failed to edit note";

export default async function handleEditNote(
  req: Request,
  res: Response,
  params: EditNoteParams
) {
  try {
    const user: User = req.body.user;
    await editNote(user.centreId, params.noteId, params.title, params.content);

    res.status(201).json({ message: SUCCESS_EDITED_NOTE });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: ERROR_FAILED_TO_EDIT_NOTE, error: error.message });
  }
}
