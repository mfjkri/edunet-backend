import { castParams } from "../params";

export interface EnrollStudentParams {
  studentId: number;
  classIds: number[];
}

export function parseParams(json: any): EnrollStudentParams | undefined {
  return castParams<EnrollStudentParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "studentId", js: "studentId", typ: 0 },
    { json: "classIds", js: "classIds", typ: { arrayItems: 0 } },
  ],
  additional: false,
};
