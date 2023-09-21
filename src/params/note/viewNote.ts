import { castParams } from "../params";

export interface ViewNoteParams {}

export function parseParams(json: any): ViewNoteParams | undefined {
  return castParams<ViewNoteParams>(json, typeMap);
}

const typeMap: any = {
  props: [],
  additional: false,
};
