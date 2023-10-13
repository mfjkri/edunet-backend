import { castParams } from "../params";

export interface ViewHomeworkParams {}

export function parseParams(json: any): ViewHomeworkParams | undefined {
  return castParams<ViewHomeworkParams>(json, typeMap);
}

const typeMap: any = {
  props: [],
  additional: false,
};
