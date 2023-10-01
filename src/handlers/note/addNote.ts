import { Request, Response } from "express";

import { AddNoteParams } from "../../params/note/addNote";
import { createNote } from "../../dataaccess/note";
import User from "../../models/user";

const SUCCESS_CREATED_NOTE = "Note created successfully";

const ERROR_FAILED_TO_CREATE_NOTE = "Failed to create note";

export default async function handleAddNote(
  req: Request,
  res: Response,
  params: AddNoteParams
) {
  try {
    const user = req.body.user as User;

    const response = await createNote(
      user.centreId,
      params.userId,
      user.id,
      params.title,
      params.content
    );

    res.status(201).json({ message: SUCCESS_CREATED_NOTE, note: response });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: ERROR_FAILED_TO_CREATE_NOTE, error: error.message });
  }
}
