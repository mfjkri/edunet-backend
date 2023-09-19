import { castParams } from "../params";

export interface UpdateAvatarParams {
  sex: string;
  bgColor: string;
  faceColor: string;

  hairStyle: string;
  hairColor: string;

  hatColor: string;
  hatStyle: string;

  shirtStyle: string;
  shirtColor: string;

  earSize: string;
  eyeStyle: string;
  glassesStyle: string;
  noseStyle: string;
  mouthStyle: string;
}

export function parseParams(json: any): UpdateAvatarParams | undefined {
  return castParams<UpdateAvatarParams>(json, typeMap);
}

const typeMap: any = {
  props: [
    {
      json: "sex",
      js: "sex",
      typ: "",
      opt: true,
      def: undefined,
      defaultValue: "male",
    },
    { json: "bgColor", js: "bgColor", typ: "" },
    { json: "faceColor", js: "faceColor", typ: "" },
    { json: "hairStyle", js: "hairStyle", typ: "" },
    { json: "hairColor", js: "hairColor", typ: "" },
    { json: "hatColor", js: "hatColor", typ: "" },
    { json: "hatStyle", js: "hatStyle", typ: "" },
    { json: "shirtStyle", js: "shirtStyle", typ: "" },
    { json: "shirtColor", js: "shirtColor", typ: "" },
    { json: "earSize", js: "earSize", typ: "" },
    { json: "eyeStyle", js: "eyeStyle", typ: "" },
    { json: "glassesStyle", js: "glassesStyle", typ: "" },
    { json: "noseStyle", js: "noseStyle", typ: "" },
    { json: "mouthStyle", js: "mouthStyle", typ: "" },
  ],
  additional: false,
};
