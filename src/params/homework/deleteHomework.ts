import { castParams } from "../params";

export interface DeleteHomeworkParams {
  homeworkId: number;
}

export function parseParams(json: any): DeleteHomeworkParams | undefined {
  return castParams<DeleteHomeworkParams>(json, typeMap);
}

const typeMap: any = {
  props: [{ json: "homeworkId", js: "homeworkId", typ: 0 }],
  additional: false,
};
