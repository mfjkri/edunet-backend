import { castParams } from "../params";

export interface EditStudentParams {
  studentId: number;

  studentFullName: string;
  studentContact: string;

  parentFullName: string;
  parentContact: string;
}

export function parseParams(json: any): EditStudentParams | undefined {
  return castParams<EditStudentParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "studentId", js: "studentId", typ: 0 },

    { json: "studentFullName", js: "studentFullName", typ: "" },
    { json: "studentContact", js: "studentContact", typ: "" },

    { json: "parentFullName", js: "parentFullName", typ: "" },
    { json: "parentContact", js: "parentContact", typ: "" },
  ],
  additional: false,
};
