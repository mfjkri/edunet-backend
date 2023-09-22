import { castParams } from "../params";

export interface AddNoteByTutorIdParams {
  tutorId: number;
  title: string;
  content: string;
}

export function parseParams(json: any): AddNoteByTutorIdParams | undefined {
  return castParams<AddNoteByTutorIdParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "tutorId", js: "tutorId", typ: 0 },
    { json: "title", js: "title", typ: "" },
    { json: "content", js: "content", typ: "" },
  ],
  additional: false,
};
