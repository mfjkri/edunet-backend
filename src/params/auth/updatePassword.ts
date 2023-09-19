import { castParams } from "../params";

export interface UpdatePasswordParams {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export function parseParams(json: any): UpdatePasswordParams | undefined {
  return castParams<UpdatePasswordParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "currentPassword", js: "currentPassword", typ: "" },
    { json: "newPassword", js: "newPassword", typ: "" },
    { json: "confirmNewPassword", js: "confirmNewPassword", typ: "" },
  ],
  additional: false,
};
