import { castParams } from "../params";

export interface DeleteStudentParams {
  studentId: number;
}

export function parseParams(json: any): DeleteStudentParams | undefined {
  return castParams<DeleteStudentParams>(json, typeMap);
}

const typeMap: any = {
  props: [{ json: "studentId", js: "studentId", typ: 0 }],
  additional: false,
};
