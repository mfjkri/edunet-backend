import { Request, Response } from "express";

import User from "../../models/user";
import { DeleteUserParams } from "../../params/auth/deleteUser";

const SUCCESS_DELETED_USER = "Deleted user successfully";

const ERROR_USER_DOES_NOT_EXIST = "User does not exist";
const ERROR_FAILED_TO_DELETE_USER = "Failed to delete user";

export default async function handleDeleteUser(
  req: Request,
  res: Response,
  params: DeleteUserParams
) {
  try {
    const user: User = req.body.user;

    if (!user) {
      return res.status(404).json({ message: ERROR_USER_DOES_NOT_EXIST });
    }

    await user.destroy();

    return res.status(201).json({
      message: SUCCESS_DELETED_USER,
    });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_DELETE_USER, error });
  }
}
