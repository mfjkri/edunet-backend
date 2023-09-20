import { castParams } from "../params";

export interface ViewStudentsParams {}

export function parseParams(json: any): ViewStudentsParams | undefined {
  return castParams<ViewStudentsParams>(json, typeMap);
}

const typeMap: any = {
  props: [],
  additional: false,
};
