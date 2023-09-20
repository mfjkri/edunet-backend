import { castParams } from "../params";

export interface RegisterParams {
  fullName: string;
  email: string;
  password: string;
  type: string;
}

export function parseParams(json: any): RegisterParams | undefined {
  return castParams<RegisterParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "fullName", js: "fullName", typ: "" },
    { json: "email", js: "email", typ: "" },
    { json: "password", js: "password", typ: "" },
    { json: "type", js: "type", typ: "" },
  ],
  additional: false,
};
