import { castParams } from "../params";

export interface DeleteAssessmentParams {
  classId: number;
  assessmentId: number;
}

export function parseParams(json: any): DeleteAssessmentParams | undefined {
  return castParams<DeleteAssessmentParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "classId", js: "classId", typ: 0 },
    { json: "assessmentId", js: "assessmentId", typ: 0 },
  ],
  additional: false,
};
