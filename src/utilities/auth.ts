import bcrypt from "bcrypt";
import { getConfig } from "../config/config";

export async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

export function generatePassword() {
  const config = getConfig();
  return config.EmailActive === "true"
    ? Math.random().toString(36).slice(-8)
    : "123";
}
