import { Router } from "express";

import AddTutorRouter from "./addClass";
import DeleteClassRouter from "./deleteClass";
import EditClassRouter from "./editClass";
import ViewClassRouter from "./viewClass";
import ViewClassesRouter from "./viewClasses";
import ViewClassesByStudentId from "./viewClassesByStudentId";
import ViewClassesByTutorId from "./viewClassesByTutorId";
import checkAdmin from "../../../middleware/checkAdmin";
import checkTutor from "../../../middleware/checkTutor";
import checkStudent from "../../../middleware/checkStudent";

const router: Router = Router();

router.use(
  "/class",
  checkStudent,
  ViewClassesByStudentId,
  ViewClassRouter,

  checkTutor,
  ViewClassesByTutorId,

  checkAdmin,
  AddTutorRouter,
  DeleteClassRouter,
  EditClassRouter,
  ViewClassesRouter
);

export default router;
