import { Router } from "express";

import DeleteUserRouter from "./deleteUser";
import GetUserRouter from "./getUser";
import UpdateAvatarRouter from "./updateAvatar";
import UpdatePasswordRouter from "./updatePassword";
import UpdateUserRouter from "./updateUser";
import ViewUsersRouter from "./viewUsers";
import checkStudent from "../../../middleware/checkStudent";

const router: Router = Router();

router.use(
  "/auth",
  checkStudent,
  DeleteUserRouter,
  GetUserRouter,
  UpdateAvatarRouter,
  UpdatePasswordRouter,
  UpdateUserRouter,
  ViewUsersRouter
);

export default router;
