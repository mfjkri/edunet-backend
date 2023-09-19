import { castParams } from "../params";

export interface UpdateUserParams {
  newUsername?: string;
  newEmail?: string;
  newBirthday?: string;
}

export function parseParams(json: any): UpdateUserParams | undefined {
  return castParams<UpdateUserParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    {
      json: "newUsername",
      js: "newUsername",
      typ: "",
      opt: true,
      defaultValue: "",
    },
    { json: "newEmail", js: "newEmail", typ: "", opt: true, defaultValue: "" },
    {
      json: "newBirthday",
      js: "newBirthday",
      typ: "",
      opt: true,
      defaultValue: "",
    },
  ],
  additional: true,
};
