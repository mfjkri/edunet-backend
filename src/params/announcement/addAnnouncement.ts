import { castParams } from "../params";

export interface AddAnnouncementParams {
  classId: number;
  title: string;
  content: string;
}

export function parseParams(json: any): AddAnnouncementParams | undefined {
  return castParams<AddAnnouncementParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "classId", js: "classId", typ: 0 },
    { json: "title", js: "title", typ: "" },
    { json: "content", js: "content", typ: "" },
  ],
  additional: false,
};
