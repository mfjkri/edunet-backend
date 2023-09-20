import { castParams } from "../params";

export interface AddTutorParams {
  fullName: string;
  email: string;
  contact: string;
}

export function parseParams(json: any): AddTutorParams | undefined {
  return castParams<AddTutorParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "fullName", js: "fullName", typ: "" },
    { json: "email", js: "email", typ: "" },
    { json: "contact", js: "contact", typ: "" },
  ],
  additional: false,
};
