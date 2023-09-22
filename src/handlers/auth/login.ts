import { Request, Response } from "express";
import bcrypt from "bcrypt";

import User from "../../models/user";
import getTokens from "./jwt";
import { LoginParams } from "../../params/auth/login";

const SUCCESS_USER_LOGGED_IN = "User logged in successfully";

const ERROR_USER_DOES_NOT_EXIST = "User does not exist";
const ERROR_INVALID_PASSWORD = "Invalid password";
const ERROR_FAILED_TO_LOGIN = "Failed to login";

export default async function handleLogin(
  req: Request,
  res: Response,
  params: LoginParams
) {
  try {
    const password = req.body.password as string;
    const email = req.body.email as string;

    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (!user) {
      return res.status(404).json({ message: ERROR_USER_DOES_NOT_EXIST });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: ERROR_INVALID_PASSWORD });
    }

    const tokens = getTokens(user);
    res.json({
      message: SUCCESS_USER_LOGGED_IN,
      tokens,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        type: user.type,
      },
    });
  } catch (error: any) {
    res
      .status(500)
      .json({ message: ERROR_FAILED_TO_LOGIN, error: error.message });
  }
}
