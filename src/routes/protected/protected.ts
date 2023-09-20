import { Router } from "express";

import authenticateToken from "../../middleware/auth";
import AuthRouter from "./auth/auth";
import ClassRouter from "./class/class";
import StudentRouter from "./student/student";
import TutorRouter from "./tutor/tutor";

const router: Router = Router();

router.use(
  "/api",
  authenticateToken,
  AuthRouter,
  ClassRouter,
  StudentRouter,
  TutorRouter
);

export default router;
