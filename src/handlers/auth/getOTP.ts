import { Request, Response } from "express";

import ResetPasswordToken from "../../models/resetPasswordToken";
import User from "../../models/user";
import { sendEmailWithOTP } from "../../utilities/mail";
import { GetOTPParams } from "../../params/auth/getOTP";

const SUCCESS_OTP_GENERATED = "OTP token generated successfully";

const ERROR_USER_NOT_FOUND = "User not found";
const ERROR_FAILED_TO_GENERATE_OTP = "Failed to generate OTP token";

export default async function handleGenerateOTP(
  req: Request,
  res: Response,
  params: GetOTPParams
) {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expirationTime = 900;
    const expireAt = new Date(Date.now() + expirationTime * 1000);

    const user = await User.findOne({
      where: { email: params.email.toLowerCase() },
    });
    if (!user) {
      return res.status(400).json({ message: ERROR_USER_NOT_FOUND });
    }

    let resetPasswordToken = await ResetPasswordToken.findOne({
      where: { userId: user.id },
    });

    if (!resetPasswordToken) {
      resetPasswordToken = await ResetPasswordToken.create({
        userId: user.id,
        otp,
        expireAt,
      });
    } else {
      await resetPasswordToken.update({ otp, expireAt });
    }

    await sendEmailWithOTP(user.email, otp);
    res.status(201).json({ message: SUCCESS_OTP_GENERATED });
  } catch (error) {
    res.status(500).json({ message: ERROR_FAILED_TO_GENERATE_OTP, error });
  }
}
