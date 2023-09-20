import { castParams } from "../params";

export interface ViewStudentParams {}

export function parseParams(json: any): ViewStudentParams | undefined {
  return castParams<ViewStudentParams>(json, typeMap);
}

const typeMap: any = {
  props: [],
  additional: false,
};
