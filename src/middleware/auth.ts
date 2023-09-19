import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import { getConfig } from "../config/config";
import User from "../models/user";
import Avatar from "../models/avatar";

const ERROR_INVALID_USER_IN_AUTHENTICATE_TOKEN =
  "Invalid user in authenticate token";

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({ message: "Authentication token missing" });
  }

  jwt.verify(token, getConfig().JWTSecretKey, async (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
    if (user && typeof user !== "string") {
      const userModel = await User.findOne({
        where: { id: user.userId },
        include: { model: Avatar, as: "avatar" },
      });
      if (!userModel) {
        return res
          .status(403)
          .json({ message: ERROR_INVALID_USER_IN_AUTHENTICATE_TOKEN });
      } else {
        req.body.user = userModel;
      }
      next();
    } else {
      return res
        .status(403)
        .json({ message: ERROR_INVALID_USER_IN_AUTHENTICATE_TOKEN });
    }
  });
};

export default authenticateToken;
