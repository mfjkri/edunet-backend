import { Express } from "express";

import PublicRouters from "./public/public";
import ProtectedRouters from "./protected/protected";
import logFullRouter from "../middleware/logRoute";

export default function initRoutes(expressApp: Express) {
  expressApp.use(logFullRouter, PublicRouters, ProtectedRouters);
}
