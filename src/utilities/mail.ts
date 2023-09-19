import nodemailer from "nodemailer";
import { getConfig } from "../config/config";

let transporter: nodemailer.Transporter;

export function initMailer() {
  const config = getConfig();
  transporter = nodemailer.createTransport({
    host: "smtp-relay.sendinblue.com",
    port: 587,
    secure: false,
    auth: {
      user: config.EmailUsername,
      pass: config.EmailPassword,
    },
  });
}

export async function sendEmailWithOTP(userEmail: string, otp: string) {
  const config = getConfig();
  transporter
    .sendMail({
      from: config.EmailUsername,
      to: userEmail,
      subject: "Password Reset OTP",
      text: `Your OTP for resetting the password is: ${otp}`,
    })
    .then((info) => {
      console.log("Email sent:", info.response);
    })
    .catch((error) => {
      console.error("Error sending email:", error);
    });
}
