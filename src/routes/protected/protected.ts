import { Router } from "express";

import authenticateToken from "../../middleware/auth";
import AuthRouter from "./auth/auth";
import AssessmentRouter from "./assessment/assessment";
import ClassRouter from "./class/class";
import NoteRouter from "./note/note";
import StudentRouter from "./student/student";
import TutorRouter from "./tutor/tutor";
import simulateLag from "../../middleware/simulateLag";

const router: Router = Router();

router.use(
  "/api",
  simulateLag,
  authenticateToken,
  AssessmentRouter,
  AuthRouter,
  ClassRouter,
  NoteRouter,
  StudentRouter,
  TutorRouter
);

export default router;
