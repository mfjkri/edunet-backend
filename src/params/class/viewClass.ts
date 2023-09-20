import { castParams } from "../params";

export interface ViewClassParams {}

export function parseParams(json: any): ViewClassParams | undefined {
  return castParams<ViewClassParams>(json, typeMap);
}

const typeMap: any = {
  props: [],
  additional: false,
};
