import { castParams } from "../params";

export interface GetUserParams {
  id?: number;
}

export function parseParams(json: any): GetUserParams | undefined {
  return castParams<GetUserParams>(json, typeMap);
}

const typeMap: any = {
  props: [{ json: "id", js: "id", typ: 0, opt: true, defaultValue: 0 }],
  additional: false,
};
