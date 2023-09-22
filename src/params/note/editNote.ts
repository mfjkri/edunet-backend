import { castParams } from "../params";

export interface EditNoteParams {
  noteId: number;
  title: string;
  content: string;
}

export function parseParams(json: any): EditNoteParams | undefined {
  return castParams<EditNoteParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "noteId", js: "noteId", typ: 0 },
    { json: "title", js: "title", typ: "", opt: true, defaultValue: "" },
    { json: "content", js: "content", typ: "", opt: true, defaultValue: "" },
  ],
  additional: false,
};
