import { castParams } from "../params";

export interface AddNoteParams {
  userId: number;
  content: string;
}

export function parseParams(json: any): AddNoteParams | undefined {
  return castParams<AddNoteParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "userId", js: "userId", typ: 0 },
    { json: "content", js: "content", typ: "" },
  ],
  additional: false,
};
