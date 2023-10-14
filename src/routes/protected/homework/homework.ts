import { Router } from "express";

import AddHomeworkRouter from "./addHomework";
import DeleteHomeworkRouter from "./deleteHomework";
import EditHomeworkRouter from "./editHomework";
import ViewHomeworkByStudentId from "./viewHomeworkByStudentId";
import ViewHomeWorkByClassId from "./viewHomeworkByClassId";
import UploadAssessmentGradesRouter from "./uploadHomeworkGrades";
import checkTutor from "../../../middleware/checkTutor";
import checkStudent from "../../../middleware/checkStudent";

const router: Router = Router();

router.use(
  "/homework",
  checkStudent,
  ViewHomeworkByStudentId,
  ViewHomeWorkByClassId,
  checkTutor,
  AddHomeworkRouter,
  EditHomeworkRouter,
  DeleteHomeworkRouter,
  UploadAssessmentGradesRouter
);

export default router;
