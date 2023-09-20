import { castParams } from "../params";

export interface DeleteClassParams {
  classId: number;
}

export function parseParams(json: any): DeleteClassParams | undefined {
  return castParams<DeleteClassParams>(json, typeMap);
}

const typeMap: any = {
  props: [{ json: "classId", js: "classId", typ: 0 }],
  additional: false,
};
