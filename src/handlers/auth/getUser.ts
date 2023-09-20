import { Request, Response } from "express";

import { GetUserParams } from "../../params/auth/getUser";
import { getUserWithRelationAndCentre } from "../../dataaccess/user";
import User from "../../models/user";

const SUCCESS_FETCHED_USER = "Fetched user successfully";

const ERROR_USER_DOES_NOT_EXIST = "User does not exist";
const ERROR_FAILED_TO_GET_USER = "Failed to get user";

export default async function handleGetUser(
  req: Request,
  res: Response,
  params: GetUserParams
) {
  try {
    const user: User = req.body.user;
    const userId = req.params.id || req.body.user.id;
    const getUser = await getUserWithRelationAndCentre(user.centreId, userId);

    return res.status(201).json({
      message: SUCCESS_FETCHED_USER,
      user: getUser,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: ERROR_FAILED_TO_GET_USER, error: error.message });
  }
}
