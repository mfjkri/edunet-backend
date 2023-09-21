import { castParams } from "../params";

export interface RegisterParams {
  centreName: string;
  fullName: string;
  email: string;
  password: string;
  contact: string;
  type: string;
}

export function parseParams(json: any): RegisterParams | undefined {
  return castParams<RegisterParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "centreName", js: "centreName", typ: "" },
    { json: "fullName", js: "fullName", typ: "" },
    { json: "email", js: "email", typ: "" },
    { json: "password", js: "password", typ: "" },
    { json: "contact", js: "contact", typ: "" },
    { json: "type", js: "type", typ: "" },
  ],
  additional: false,
};
