import { Command } from "commander";

import { init } from "../src/main";
import { getDB } from "../src/database/database";
import seed from "./seed/seed";
import migrateModels from "../src/models/models";

async function Main() {
  await init();
  const db = getDB();
  await db.sync();

  const program = new Command();
  program.name("db-util").description("CLI to manage the database");

  program
    .command("seed")
    .description("Seed the database")
    .action(() => {
      seedDB();
    });

  program
    .command("drop")
    .description("Drop the database")
    .action(() => {
      dropDB();
    });

  program.parse();
}

async function dropDB() {
  const db = getDB();
  await db.drop();
}

async function makeDB() {
  await dropDB();

  await migrateModels();
  const db = getDB();
  await db.sync();
}

async function seedDB() {
  await makeDB();
  await seed();
}

Main();
