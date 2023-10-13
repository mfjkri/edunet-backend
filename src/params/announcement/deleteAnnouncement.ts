import { castParams } from "../params";

export interface DeleteAnnouncementParams {
  announcementId: number;
}

export function parseParams(json: any): DeleteAnnouncementParams | undefined {
  return castParams<DeleteAnnouncementParams>(json, typeMap);
}

const typeMap: any = {
  props: [{ json: "announcementId", js: "announcementId", typ: 0 }],
  additional: false,
};
