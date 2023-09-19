import { Request, Response } from "express";
import bcrypt from "bcrypt";

import User from "../../models/user";
import { UpdatePasswordParams } from "../../params/auth/updatePassword";

const SUCCESS_UPDATED_PASSWORD = "Password updated successfully";

const ERROR_PASSWORD_DO_NOT_MATCH = "Passwords do not match";
const ERROR_INCORRECT_PASSWORD = "Incorrect current password";
const ERROR_FAILED_TO_UPDATE_PASSWORD = "Failed to update password";

export default async function handleUpdatePassword(
  req: Request,
  res: Response,
  params: UpdatePasswordParams
) {
  try {
    const user: User = req.body.user;

    const isPasswordValid = await bcrypt.compare(
      params.currentPassword,
      user.password
    );
    if (params.newPassword !== params.confirmNewPassword) {
      return res.status(401).json({ message: ERROR_PASSWORD_DO_NOT_MATCH });
    }
    if (!isPasswordValid) {
      return res.status(401).json({ message: ERROR_INCORRECT_PASSWORD });
    }

    await user.update({ password: params.newPassword });

    res.status(201).json({ message: SUCCESS_UPDATED_PASSWORD, user });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_UPDATE_PASSWORD, error });
  }
}
