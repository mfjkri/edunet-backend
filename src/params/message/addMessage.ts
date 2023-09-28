import { castParams } from "../params";

export interface AddMessageParam {
  receiverId: number;
  content: string;
}

export function parseParams(json: any): AddMessageParam | undefined {
  return castParams<AddMessageParam>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "receiverId", js: "receiverId", typ: 0 },
    { json: "content", js: "content", typ: "" },
  ],
  additional: false,
};
