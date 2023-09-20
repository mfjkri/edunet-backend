import { castParams } from "../params";

export interface DeleteTutorParams {
  tutorId: number;
}

export function parseParams(json: any): DeleteTutorParams | undefined {
  return castParams<DeleteTutorParams>(json, typeMap);
}

const typeMap: any = {
  props: [{ json: "tutorId", js: "tutorId", typ: 0 }],
  additional: false,
};
