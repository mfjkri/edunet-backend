import { castParams } from "../params";

export interface AssignTutorParams {
  tutorId: number;
  classIds: number[];
}

export function parseParams(json: any): AssignTutorParams | undefined {
  return castParams<AssignTutorParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "tutorId", js: "tutorId", typ: 0 },
    { json: "classIds", js: "classIds", typ: { arrayItems: 0 } },
  ],
  additional: false,
};
