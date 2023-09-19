import jwt from "jsonwebtoken";

import { getConfig } from "../../config/config";
import User from "../../models/user";

export function signToken(user: User, type: "access" | "refresh") {
  const config = getConfig();
  const expiresIn = type === "access" ? "2 days" : "30 days";
  return jwt.sign({ userId: user.id }, config.JWTSecretKey, {
    expiresIn,
  });
}

export default function getTokens(user: User) {
  return {
    accessToken: signToken(user, "access"),
    refreshToken: signToken(user, "refresh"),
  };
}
