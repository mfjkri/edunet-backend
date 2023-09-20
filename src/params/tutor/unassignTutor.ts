import { castParams } from "../params";

export interface UnassignTutorParams {
  tutorId: number;
  classId: number;
}

export function parseParams(json: any): UnassignTutorParams | undefined {
  return castParams<UnassignTutorParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "tutorId", js: "tutorId", typ: 0 },
    { json: "classId", js: "classId", typ: 0 },
  ],
  additional: false,
};
