import { Router } from "express";

import AddAssessmentRouter from "./addAssessment";
import DeleteAssessmentRouter from "./deleteAssessment";
import EditAssessmentRouter from "./editAssessment";
import ViewAssessmentsRouter from "./viewAssessments";
import checkTutor from "../../../middleware/checkTutor";

const router: Router = Router();

router.use(
  "/assessment",
  checkTutor,
  AddAssessmentRouter,
  EditAssessmentRouter,
  DeleteAssessmentRouter,
  ViewAssessmentsRouter
);

export default router;
