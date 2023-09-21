import { castParams } from "../params";

export interface DeleteNoteParams {
  noteId: number;
}

export function parseParams(json: any): DeleteNoteParams | undefined {
  return castParams<DeleteNoteParams>(json, typeMap);
}

const typeMap: any = {
  props: [{ json: "noteId", js: "noteId", typ: 0 }],
  additional: false,
};
