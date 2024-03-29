import { Sequelize } from "sequelize";

const models = [
  "avatar",
  "centre",
  "user",
  "resetPasswordToken",
  "admin",
  "tutor",
  "parent",
  "student",
  "class",
  "studentClass",
  "tutorClass",
  "assessment",
  "note",
  "message",
  "announcement",
  "homework",
];

export default async function migrateModels(db?: Sequelize) {
  for (const model of models) {
    const modelDefiner = require(`./${model}`);
    await modelDefiner.init(db);
  }
}
