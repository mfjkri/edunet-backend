import { castParams } from "../params";

export interface ViewMessagesParams {}

export function parseParams(json: any): ViewMessagesParams | undefined {
  return castParams<ViewMessagesParams>(json, typeMap);
}

const typeMap: any = {
  props: [],
  additional: false,
};
