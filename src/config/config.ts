import dotenv from "dotenv";

type DBConfig = {
  DBHostname: string;
  DBPort: number;
  DBName: string;
  DBUsername: string;
  DBPassword: string;
};

type Config = DBConfig & {
  ServerPort: number;
  JWTSecretKey: string;

  UseLocalDB: boolean;

  EmailActive: string;
  EmailUsername: string;
  EmailPassword: string;

  AWSAccessKeyId: string;
  AWSSecretAccessKey: string;
};

export function loadEnv() {
  dotenv.config();
  validateEnv();
}

export function getConfig(): Config {
  const {
    SERVER_PORT,

    JWT_SECRET_KEY,

    USE_LOCAL_DB,
    DB_HOSTNAME,
    DB_PORT,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    LOCAL_DB_HOSTNAME,
    LOCAL_DB_PORT,
    LOCAL_DB_NAME,
    LOCAL_DB_USERNAME,
    LOCAL_DB_PASSWORD,

    EMAIL_ACTIVE,
    EMAIL_USERNAME,
    EMAIL_PASSWORD,

    AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY,
  } = process.env;
  const dbConfig: DBConfig =
    USE_LOCAL_DB === "true"
      ? {
          DBHostname: LOCAL_DB_HOSTNAME || "localhost",
          DBPort: parseInt(LOCAL_DB_PORT || "5432"),
          DBName: LOCAL_DB_NAME || "postgres",
          DBUsername: LOCAL_DB_USERNAME || "postgres",
          DBPassword: LOCAL_DB_PASSWORD || "postgres",
        }
      : {
          DBHostname: DB_HOSTNAME || "localhost",
          DBPort: parseInt(DB_PORT || "5432"),
          DBName: DB_NAME || "postgres",
          DBUsername: DB_USERNAME || "postgres",
          DBPassword: DB_PASSWORD || "postgres",
        };

  return {
    ServerPort: parseInt(SERVER_PORT || "8080"),

    JWTSecretKey: JWT_SECRET_KEY || "secret",

    UseLocalDB: USE_LOCAL_DB === "true",
    ...dbConfig,

    EmailActive: EMAIL_ACTIVE || "false",
    EmailUsername: EMAIL_USERNAME || "",
    EmailPassword: EMAIL_PASSWORD || "",

    AWSAccessKeyId: AWS_ACCESS_KEY_ID || "",
    AWSSecretAccessKey: AWS_SECRET_ACCESS_KEY || "",
  };
}

function validateEnv() {
  const {
    SERVER_PORT,
    DB_HOSTNAME,
    DB_PORT,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
    JWT_SECRET_KEY,
  } = process.env;

  if (!SERVER_PORT) {
    throw new Error("SERVER_PORT is not defined");
  }

  if (!DB_HOSTNAME) {
    throw new Error("DB_HOSTNAME is not defined");
  }
  if (!DB_PORT) {
    throw new Error("DB_PORT is not defined");
  }
  if (!DB_NAME) {
    throw new Error("DB_NAME is not defined");
  }
  if (!DB_USERNAME) {
    throw new Error("DB_USERNAME is not defined");
  }
  if (!DB_PASSWORD) {
    throw new Error("DB_PASSWORD is not defined");
  }
  if (!JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY is not defined");
  }
}
