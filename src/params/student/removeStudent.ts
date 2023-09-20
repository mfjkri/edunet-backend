import { castParams } from "../params";

export interface RemoveStudentParams {
  studentId: number;
  classId: number;
}

export function parseParams(json: any): RemoveStudentParams | undefined {
  return castParams<RemoveStudentParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "studentId", js: "studentId", typ: 0 },
    { json: "classId", js: "classId", typ: 0 },
  ],
  additional: false,
};
