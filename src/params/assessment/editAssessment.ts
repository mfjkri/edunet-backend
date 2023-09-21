import { castParams } from "../params";

export interface EditAssessmentParams {
  classId: number;
  assessmentId: number;
  name: string;
  total: number;
  score: number;
}

export function parseParams(json: any): EditAssessmentParams | undefined {
  return castParams<EditAssessmentParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "classId", js: "classId", typ: 0 },
    { json: "assessmentId", js: "assessmentId", typ: 0 },
    { json: "name", js: "name", typ: "", opt: true, defaultValue: "" },
    { json: "total", js: "total", typ: 0, opt: true, defaultValue: 0 },
    { json: "score", js: "score", typ: 0, opt: true, defaultValue: 0 },
  ],
  additional: false,
};
