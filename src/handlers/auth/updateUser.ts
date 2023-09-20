import { Request, Response } from "express";

import User from "../../models/user";
import { UpdateUserParams } from "../../params/auth/updateUser";

const SUCCESS_UPDATED_USER = "User updated successfully";

const ERROR_FAILED_TO_UPDATE_USER = "Failed to update user";

export default async function handleUpdateUser(
  req: Request,
  res: Response,
  params: UpdateUserParams
) {
  try {
    const user: User = req.body.user;

    if (params.newEmail) {
      user.email = params.newEmail.toLowerCase();
    }
    await user.save();

    res.status(201).json({ message: SUCCESS_UPDATED_USER, user });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: ERROR_FAILED_TO_UPDATE_USER, error: error.message });
  }
}
