import { castParams } from "../params";

export interface EditTutorParams {
  tutorId: number;
  fullName: string;
  contact: string;
}

export function parseParams(json: any): EditTutorParams | undefined {
  return castParams<EditTutorParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "tutorId", js: "tutorId", typ: 0 },
    { json: "fullName", js: "fullName", typ: "", opt: true, defaultValue: "" },
    { json: "contact", js: "contact", typ: "", opt: true, defaultValue: "" },
  ],
  additional: false,
};
