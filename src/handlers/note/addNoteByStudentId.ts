import { Request, Response } from "express";

import { AddNoteByStudentIdParams } from "../../params/note/addNoteByStudentId";
import { createNoteByStudentId } from "../../dataaccess/note";
import User from "../../models/user";

const SUCCESS_CREATED_NOTE = "Note created successfully";

const ERROR_FAILED_TO_CREATE_NOTE = "Failed to create note";

export default async function handleAddNoteByStudentId(
  req: Request,
  res: Response,
  params: AddNoteByStudentIdParams
) {
  try {
    const user = req.body.user as User;

    const response = await createNoteByStudentId(
      user.centreId,
      params.studentId,
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
