import { Request, Response } from "express";

import { AddNoteByTutorIdParams } from "../../params/note/addNoteByTutorId";
import { createNoteByTutorId } from "../../dataaccess/note";
import User from "../../models/user";

const SUCCESS_CREATED_NOTE = "Note created successfully";

const ERROR_FAILED_TO_CREATE_NOTE = "Failed to create note";

export default async function handleAddNoteByTutorId(
  req: Request,
  res: Response,
  params: AddNoteByTutorIdParams
) {
  try {
    const user = req.body.user as User;

    const response = await createNoteByTutorId(
      user.centreId,
      user.id,
      params.tutorId,
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
