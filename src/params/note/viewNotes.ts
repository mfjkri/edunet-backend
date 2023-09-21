import { castParams } from "../params";

export interface ViewNotesParams {}

export function parseParams(json: any): ViewNotesParams | undefined {
  return castParams<ViewNotesParams>(json, typeMap);
}

const typeMap: any = {
  props: [],
  additional: false,
};
