import { Request, Response } from "express";

import { createTutorUser } from "../../dataaccess/user";
import { AddTutorParams } from "../../params/tutor/addTutor";
import User from "../../models/user";

const SUCCESS_CREATED_TUTOR = "Tutor created successfully";

const ERROR_FAILED_TO_CREATE_TUTOR = "Failed to create tutor";

export default async function handleAddTutor(
  req: Request,
  res: Response,
  params: AddTutorParams
) {
  try {
    const user = req.body.user as User;

    const response = await createTutorUser(
      user.centreId,
      params.fullName,
      params.email,
      params.contact
    );

    res.status(201).json({ message: SUCCESS_CREATED_TUTOR, ...response });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: ERROR_FAILED_TO_CREATE_TUTOR, error: error.message });
  }
}
