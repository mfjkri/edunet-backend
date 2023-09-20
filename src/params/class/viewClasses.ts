import { castParams } from "../params";

export interface ViewClassesParams {}

export function parseParams(json: any): ViewClassesParams | undefined {
  return castParams<ViewClassesParams>(json, typeMap);
}

const typeMap: any = {
  props: [],
  additional: false,
};
