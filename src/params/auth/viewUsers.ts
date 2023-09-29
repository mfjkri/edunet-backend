import { castParams } from "../params";

export interface ViewUsersParams {}

export function parseParams(json: any): ViewUsersParams | undefined {
  return castParams<ViewUsersParams>(json, typeMap);
}

const typeMap: any = {
  props: [],
  additional: false,
};
