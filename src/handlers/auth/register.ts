import { Request, Response } from "express";

import User from "../../models/user";
import getTokens from "./jwt";
import { RegisterParams } from "../../params/auth/register";
import {
  createUserWithCentreAndAdmin,
  getUserWithRelationAndCentre,
} from "../../dataaccess/user";

const SUCCESS_USER_REGISTERED = "User registered successfully";

const ERROR_USER_ALREADY_EXIST = "User already exists";
const ERROR_INVALID_EMAIL_FORMAT = "Invalid email format";
const ERROR_FAILED_TO_REGISTER_USER = "Failed to register user";

export default async function handleRegister(
  req: Request,
  res: Response,
  params: RegisterParams
) {
  try {
    if (
      (await User.findOne({ where: { fullName: params.fullName } })) ||
      (await User.findOne({ where: { email: params.email.toLowerCase() } }))
    ) {
      return res.status(400).json({ message: ERROR_USER_ALREADY_EXIST });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(params.email)) {
      return res.status(400).json({ message: ERROR_INVALID_EMAIL_FORMAT });
    }

    if (params.type !== "admin") {
    }

    const response = await createUserWithCentreAndAdmin(
      params.centreName,
      params.fullName,
      params.email.toLowerCase(),
      params.password,
      params.contact
    );

    const tokens = getTokens(response.adminUser);
    const fullUser = await getUserWithRelationAndCentre(
      response.adminUser.centreId,
      response.adminUser.id
    );
    res.status(201).json({
      message: SUCCESS_USER_REGISTERED,
      tokens,
      user: fullUser,
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: ERROR_FAILED_TO_REGISTER_USER, error: error.message });
  }
}
