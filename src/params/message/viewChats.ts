import { castParams } from "../params";

export interface ViewChatsParams {}

export function parseParams(json: any): ViewChatsParams | undefined {
  return castParams<ViewChatsParams>(json, typeMap);
}

const typeMap: any = {
  props: [],
  additional: false,
};
