import { castParams } from "../params";

export interface AssignTutorParams {
  tutorId: number;
  classId: number;
}

export function parseParams(json: any): AssignTutorParams | undefined {
  return castParams<AssignTutorParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "tutorId", js: "tutorId", typ: 0 },
    { json: "classId", js: "classId", typ: 0 },
  ],
  additional: false,
};
