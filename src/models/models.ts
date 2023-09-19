import { Sequelize } from "sequelize";

const models = ["avatar", "user", "resetPasswordToken"];

export default async function migrateModels(db?: Sequelize) {
  for (const model of models) {
    const modelDefiner = require(`./${model}`);
    await modelDefiner.init(db);
  }
}
