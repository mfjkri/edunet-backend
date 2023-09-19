import { castParams } from "../params";

export interface DeleteUserParams {}

export function parseParams(json: any): DeleteUserParams | undefined {
  return castParams<DeleteUserParams>(json, typeMap);
}

const typeMap: any = {
  props: [],
  additional: false,
};
