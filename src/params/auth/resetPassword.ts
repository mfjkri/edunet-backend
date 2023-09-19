import { castParams } from "../params";

export interface ResetPasswordParams {
  email: string;
  otp: string;
  newPassword: string;
  confirmNewPassword: string;
}

export function parseParams(json: any): ResetPasswordParams | undefined {
  return castParams<ResetPasswordParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "email", js: "email", typ: "" },
    { json: "otp", js: "otp", typ: "" },
    { json: "newPassword", js: "newPassword", typ: "" },
    { json: "confirmNewPassword", js: "confirmNewPassword", typ: "" },
  ],
  additional: false,
};
