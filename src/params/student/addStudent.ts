import { castParams } from "../params";

export interface AddStudentParams {
  classId: number;

  studentFullName: string;
  studentEmail: string;
  studentContact: string;

  parentFullName: string;
  parentEmail: string;
  parentContact: string;
}

export function parseParams(json: any): AddStudentParams | undefined {
  return castParams<AddStudentParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "classId", js: "classId", typ: 0 },

    { json: "studentFullName", js: "studentFullName", typ: "" },
    { json: "studentEmail", js: "studentEmail", typ: "" },
    { json: "studentContact", js: "studentContact", typ: "" },

    { json: "parentFullName", js: "parentFullName", typ: "" },
    { json: "parentEmail", js: "parentEmail", typ: "" },
    { json: "parentContact", js: "parentContact", typ: "" },
  ],
  additional: false,
};
