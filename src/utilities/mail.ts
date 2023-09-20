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

async function sendEmail(toEmail: string, subject: string, text: string) {
  const config = getConfig();
  if (config.EmailActive !== "true") {
    console.log("Email not active, not sending email");
    return;
  }

  transporter
    .sendMail({
      from: config.EmailUsername,
      to: toEmail,
      subject: subject,
      text: text,
    })
    .then((info) => {
      console.log("Email sent:", info.response);
    })
    .catch((error) => {
      console.error("Error sending email:", error);
    });
}

export async function sendEmailWithOTP(userEmail: string, otp: string) {
  await sendEmail(
    userEmail,
    "Password Reset OTP",
    `Your OTP for resetting the password is: ${otp}`
  );
}

export async function sendEmailWithPassword(
  userEmail: string,
  password: string
) {
  await sendEmail(
    userEmail,
    "Account Created",
    `Your login details are:
    \n    Email: ${userEmail}
    \n    Password: ${password}
    \n\nPlease reset your password as soon as possible.`
  );
}
