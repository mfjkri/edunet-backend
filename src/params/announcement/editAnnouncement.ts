import { castParams } from "../params";

export interface EditAnnouncementParams {
  announcementId: number;
  title: string;
  content: string;
}

export function parseParams(json: any): EditAnnouncementParams | undefined {
  return castParams<EditAnnouncementParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "announcementId", js: "announcementId", typ: 0 },
    { json: "title", js: "title", typ: "", opt: true, defaultValue: "" },
    { json: "content", js: "content", typ: "", opt: true, defaultValue: "" },
  ],
  additional: false,
};
