import { Router } from "express";

import GetOTPRouter from "./getOTP";
import LoginRouter from "./login";
import RegisterRouter from "./register";
import RefreshTokenRouter from "./refreshToken";
import ResetPasswordRouter from "./resetPassword";

const router: Router = Router();

router.use(
  "/auth",
  GetOTPRouter,
  LoginRouter,
  RegisterRouter,
  RefreshTokenRouter,
  ResetPasswordRouter
);

export default router;
