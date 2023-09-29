import { Request, Response } from "express";

import { ViewUsersParams } from "../../params/auth/viewUsers";
import { getUsersWithRelationAndCentreByCentreId } from "../../dataaccess/user";
import User from "../../models/user";

const SUCCESS_FETCHED_USERS = "Fetched users successfully";

const ERROR_FAILED_TO_GET_USERS = "Failed to get users";

export default async function handleViewUsers(
  req: Request,
  res: Response,
  params: ViewUsersParams
) {
  try {
    const user: User = req.body.user;
    const response = await getUsersWithRelationAndCentreByCentreId(
      user.centreId
    );

    return res.status(201).json({
      message: SUCCESS_FETCHED_USERS,
      users: response,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: ERROR_FAILED_TO_GET_USERS, error: error.message });
  }
}
