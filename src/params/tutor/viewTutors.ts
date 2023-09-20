import { castParams } from "../params";

export interface ViewTutorsParams {}

export function parseParams(json: any): ViewTutorsParams | undefined {
  return castParams<ViewTutorsParams>(json, typeMap);
}

const typeMap: any = {
  props: [],
  additional: false,
};
