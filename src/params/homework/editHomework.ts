import { castParams } from "../params";

export interface EditHomeworkParams {
  homeworkId: number;
  title: string;
  description: string;
  dueDate: string;
}

export function parseParams(json: any): EditHomeworkParams | undefined {
  return castParams<EditHomeworkParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    { json: "homeworkId", js: "homeworkId", typ: 0 },
    { json: "title", js: "title", typ: "", opt: true, defaultValue: "" },
    {
      json: "description",
      js: "description",
      typ: "",
      opt: true,
      defaultValue: "",
    },
    { json: "dueDate", js: "dueDate", typ: "", opt: true, defaultValue: "" },
  ],
  additional: false,
};
