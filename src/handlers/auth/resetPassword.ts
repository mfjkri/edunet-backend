import { Request, Response } from "express";

import ResetPasswordToken from "../../models/resetPasswordToken";
import User from "../../models/user";
import { ResetPasswordParams } from "../../params/auth/resetPassword";

const SUCCESS_RESET_PASSWORD = "Reset password successfully";

const ERROR_USER_NOT_FOUND = "User not found";
const ERROR_OTP_NOT_FOUND = "OTP token not found";
const ERROR_INVALID_OTP = "Invalid OTP";
const ERROR_OTP_EXPIRED = "OTP expired";
const ERROR_PASSWORD_DO_NOT_MATCH = "Passwords do not match";
const ERROR_FAILED_TO_RESET_PASSWORD = "Failed to reset password";

export default async function handleResetPassword(
  req: Request,
  res: Response,
  params: ResetPasswordParams
) {
  try {
    const user = await User.findOne({
      where: { email: params.email.toLowerCase() },
    });
    if (!user) {
      return res.status(400).json({ message: ERROR_USER_NOT_FOUND });
    }

    const resetPasswordToken = await ResetPasswordToken.findOne({
      where: { userId: user.id },
    });
    if (!resetPasswordToken) {
      return res.status(404).json({ message: ERROR_OTP_NOT_FOUND });
    }
    if (resetPasswordToken.otp !== params.otp) {
      return res.status(400).json({ message: ERROR_INVALID_OTP });
    }
    if (resetPasswordToken.expireAt < new Date()) {
      return res.status(400).json({ message: ERROR_OTP_EXPIRED });
    }
    if (params.confirmNewPassword !== params.newPassword) {
      return res.status(401).json({ message: ERROR_PASSWORD_DO_NOT_MATCH });
    }

    await user.update({ password: params.newPassword });
    await resetPasswordToken.destroy();

    res.status(201).json({ message: SUCCESS_RESET_PASSWORD });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_RESET_PASSWORD, error });
  }
}
