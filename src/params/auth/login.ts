import { castParams } from "../params";

export interface LoginParams {
  email: string;
  password: string;
  type: string;
}

export function parseParams(json: any): LoginParams | undefined {
  return castParams<LoginParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "email", js: "email", typ: "" },
    { json: "password", js: "password", typ: "" },
    { json: "type", js: "type", typ: "" },
  ],
  additional: false,
};
