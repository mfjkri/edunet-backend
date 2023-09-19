import { castParams } from "../params";

export interface RefreshTokenParams {
  refreshToken: string;
}

export function parseParams(json: any): RefreshTokenParams | undefined {
  return castParams<RefreshTokenParams>(json, typeMap);
}

const typeMap: any = {
  props: [{ json: "refreshToken", js: "refreshToken", typ: "" }],
  additional: false,
};
