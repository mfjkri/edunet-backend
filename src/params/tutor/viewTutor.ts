import { castParams } from "../params";

export interface ViewTutorParams {}

export function parseParams(json: any): ViewTutorParams | undefined {
  return castParams<ViewTutorParams>(json, typeMap);
}

const typeMap: any = {
  props: [],
  additional: false,
};
