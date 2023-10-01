import { Client } from "pg";
import { Options, Sequelize } from "sequelize";

import pgtools from "pgtools";

import { getConfig } from "../config/config";

const connectedDBs: Map<string, Sequelize> = new Map();

export async function connectDB(dbName?: string) {
  const config = getConfig();
  const name = dbName || config.DBName;
  const db = connect({
    Hostname: config.DBHostname,
    Port: config.DBPort,
    Name: name,
    User: config.DBUsername,
    Password: config.DBPassword,
    LocalDB: config.UseLocalDB,
  });

  try {
    await db.authenticate();
    connectedDBs.set(name, db);
    console.log(`Connection to ${name} DB has been established successfully.`);
  } catch (error: any) {
    console.error(`Unable to connect to ${name} DB:`, error);
  }

  return db;
}

export function getDB(dbName?: string) {
  const config = getConfig();
  dbName = dbName || config.DBName;
  const targetDb = connectedDBs.get(dbName);
  if (connectedDBs.size === 0 || !targetDb) {
    throw new Error("Database not connected");
  }
  return targetDb;
}

type Config = {
  Hostname: string;
  Port: number;
  Name: string;
  User: string;
  Password: string;
  LocalDB: boolean;
};

function connect(config: Config) {
  const { Hostname, Port, Name, User, Password, LocalDB } = config;
  const options: Options = {
    host: Hostname,
    port: Port,
    dialect: "postgres",
  };
  if (!LocalDB) {
    options.dialectOptions = {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    };
  }
  return new Sequelize(Name, User, Password, options);
}
export async function createBackupDB() {
  const config = getConfig();
  const backupDBName = "gifty_backup";

  try {
    const client = new Client({
      user: config.DBUsername,
      password: config.DBPassword,
      host: config.DBHostname,
      port: config.DBPort,
      database: "postgres",
    });

    await client.connect();
    const res = await client.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [backupDBName]
    );
    await client.end();

    if (res.rows.length === 0) {
      await pgtools.createdb(
        {
          user: config.DBUsername,
          password: config.DBPassword,
          host: config.DBHostname,
          port: config.DBPort,
        },
        backupDBName
      );
      const backupDB = await connectDB(backupDBName);
      await backupDB.authenticate();
      console.log(`Created backup database: ${backupDBName}`);
      return backupDB;
    } else {
      const backupDB = await connectDB(backupDBName);
      await backupDB.authenticate();
      console.log(`Backup database already exists: ${backupDBName}`);
      return backupDB;
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export default getDB;
