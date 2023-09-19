import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import getTokens from "./jwt";
import User from "../../models/user";
import { getConfig } from "../../config/config";
import { RefreshTokenParams } from "../../params/auth/refreshToken";

const ERROR_INVALID_REFRESH_TOKEN = "Invalid refresh token";

export default async function handleRefreshToken(
  req: Request,
  res: Response,
  params: RefreshTokenParams
) {
  try {
    const config = getConfig();
    const decodedRefreshToken = jwt.verify(
      params.refreshToken,
      config.JWTSecretKey
    ) as { userId: string };

    const user = await User.findOne({
      where: { id: decodedRefreshToken.userId },
    });
    if (!user) {
      return res.status(404).json({ message: ERROR_INVALID_REFRESH_TOKEN });
    }

    const tokens = getTokens(user);
    res.json({ tokens });
  } catch (error) {
    res.status(401).json({ message: ERROR_INVALID_REFRESH_TOKEN });
  }
}
