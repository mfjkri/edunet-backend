import {
  RekognitionClient,
  DetectLabelsCommand,
} from "@aws-sdk/client-rekognition";
import { createReadStream, readFileSync } from "fs";
import { parse } from "csv";
import { getConfig } from "../../config/config";

const food: string[] = [];

createReadStream("aws/labels.csv")
  .pipe(parse({ delimiter: ",", from_line: 2 }))
  .on("data", function (row) {
    if (row[1] === "food") {
      food.push(row[0]);
    }
  });

let client: RekognitionClient | null = null;

function setup() {
  const config = getConfig();
  if (client === null) {
    client = new RekognitionClient({
      region: "us-east-1",
      credentials: {
        accessKeyId: config.AWSAccessKeyId,
        secretAccessKey: config.AWSSecretAccessKey,
      },
    });
  }
}

async function sendCommand(command: DetectLabelsCommand) {
  setup();
  return await client?.send(command);
}

export async function getLabels(base64_string: string) {
  var imageBytes2 = Buffer.from(base64_string, "base64");

  const input = {
    Image: {
      Bytes: imageBytes2,
    },

    MinConfidence: 0.5,
    Features: ["GENERAL_LABELS"],
    Settings: {
      GeneralLabels: {
        LabelCategoryInclusionFilters: ["Food and Beverage"],
      },
    },
  };

  const command = new DetectLabelsCommand(input);
  const response: any = await sendCommand(command);

  return response.Labels.filter((data: any) => food.includes(data.Name)).map(
    (data: any) => ({ name: data.Name, confidence: data.Confidence })
  );
}
