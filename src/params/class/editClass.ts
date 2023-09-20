import { castParams } from "../params";

export interface EditClassParams {
  classId: number;
  name: string;
  day: string;
  time: string;
  venue: string;
}

export function parseParams(json: any): EditClassParams | undefined {
  return castParams<EditClassParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "classId", js: "classId", typ: 0 },
    { json: "name", js: "name", typ: "", opt: true, defaultValue: "" },
    { json: "day", js: "day", typ: "", opt: true, defaultValue: "" },
    { json: "time", js: "time", typ: "", opt: true, defaultValue: "" },
    { json: "venue", js: "venue", typ: "", opt: true, defaultValue: "" },
  ],
  additional: false,
};
