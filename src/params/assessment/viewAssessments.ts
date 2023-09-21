import { castParams } from "../params";

export interface ViewAssessmentsParams {}

export function parseParams(json: any): ViewAssessmentsParams | undefined {
  return castParams<ViewAssessmentsParams>(json, typeMap);
}

const typeMap: any = {
  props: [],
  additional: false,
};
