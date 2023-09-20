import { Request, Response } from "express";

import { EditTutorParams } from "../../params/tutor/editTutor";
import { editTutorById } from "../../dataaccess/tutor";
import User from "../../models/user";

const SUCCESS_EDITED_TUTOR = "Tutor edited successfully";

const ERROR_FAILED_TO_EDIT_TUTOR = "Failed to edit tutor";

export default async function handleEditTutor(
  req: Request,
  res: Response,
  params: EditTutorParams
) {
  try {
    const user: User = req.body.user;
    const response = await editTutorById(
      user.centreId,
      params.tutorId,
      params.fullName,
      params.contact
    );

    res.status(201).json({ message: SUCCESS_EDITED_TUTOR, tutor: response });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: ERROR_FAILED_TO_EDIT_TUTOR, error: error.message });
  }
}
