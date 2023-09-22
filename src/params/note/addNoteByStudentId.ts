import { castParams } from "../params";

export interface AddNoteByStudentIdParams {
  studentId: number;
  title: string;
  content: string;
}

export function parseParams(json: any): AddNoteByStudentIdParams | undefined {
  return castParams<AddNoteByStudentIdParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "studentId", js: "studentId", typ: 0 },
    { json: "title", js: "title", typ: "" },
    { json: "content", js: "content", typ: "" },
  ],
  additional: false,
};
