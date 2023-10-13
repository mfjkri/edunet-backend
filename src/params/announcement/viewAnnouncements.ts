import { castParams } from "../params";

export interface ViewAnnouncementsParams {}

export function parseParams(json: any): ViewAnnouncementsParams | undefined {
  return castParams<ViewAnnouncementsParams>(json, typeMap);
}

const typeMap: any = {
  props: [],
  additional: false,
};
