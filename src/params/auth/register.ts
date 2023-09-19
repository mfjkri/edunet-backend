import { castParams } from "../params";

export interface RegisterParams {
  fullname: string;
  email: string;
  password: string;
  type: string;
}

export function parseParams(json: any): RegisterParams | undefined {
  return castParams<RegisterParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "fullname", js: "fullname", typ: "" },
    { json: "email", js: "email", typ: "" },
    { json: "password", js: "password", typ: "" },
    { json: "type", js: "type", typ: "" },
  ],
  additional: false,
};
