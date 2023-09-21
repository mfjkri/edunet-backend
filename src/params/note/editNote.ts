import { castParams } from "../params";

export interface EditNoteParams {
  noteId: number;
  content: string;
}

export function parseParams(json: any): EditNoteParams | undefined {
  return castParams<EditNoteParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "noteId", js: "noteId", typ: 0 },
    { json: "content", js: "content", typ: "" },
  ],
  additional: false,
};
