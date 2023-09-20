import { castParams } from "../params";

export interface AddClassParams {
  name: string;
  day: string;
  time: string;
  venue: string;
}

export function parseParams(json: any): AddClassParams | undefined {
  return castParams<AddClassParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "name", js: "name", typ: "" },
    { json: "day", js: "day", typ: "" },
    { json: "time", js: "time", typ: "" },
    { json: "venue", js: "venue", typ: "" },
  ],
  additional: false,
};
