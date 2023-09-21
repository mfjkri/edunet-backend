import { castParams } from "../params";

export interface AddAssessmentParam {
  classId: number;
  studentId: number;
  name: string;
  total: number;
  score: number;
}

export function parseParams(json: any): AddAssessmentParam | undefined {
  return castParams<AddAssessmentParam>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "classId", js: "classId", typ: 0 },
    { json: "studentId", js: "studentId", typ: 0 },
    { json: "name", js: "name", typ: "" },
    { json: "total", js: "total", typ: 0 },
    { json: "score", js: "score", typ: 0 },
  ],
  additional: false,
};
