import { castParams } from "../params";

export interface AddHomeworkParams {
  classId: number;
  title: string;
  description: string;
  dueDate: string;
}

export function parseParams(json: any): AddHomeworkParams | undefined {
  return castParams<AddHomeworkParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "classId", js: "classId", typ: 0 },
    { json: "title", js: "title", typ: "" },
    {
      json: "description",
      js: "description",
      typ: "",
    },
    { json: "dueDate", js: "dueDate", typ: "" },
  ],
  additional: false,
};
