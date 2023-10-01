import { Request, Response, NextFunction } from "express";
import User from "../models/user";

const checkStudent = (req: Request, res: Response, next: NextFunction) => {
  const user: User = req.body.user;

  if (
    user.type === "parent" ||
    user.type === "student" ||
    user.type === "tutor" ||
    user.type === "admin"
  ) {
    next();
  } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
};

export default checkStudent;
