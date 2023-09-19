import { castParams } from "../params";

export interface GetOTPParams {
  email: string;
}

export function parseParams(json: any): GetOTPParams | undefined {
  return castParams<GetOTPParams>(json, typeMap);
}

const typeMap: any = {
  props: [{ json: "email", js: "email", typ: "" }],
  additional: false,
};
