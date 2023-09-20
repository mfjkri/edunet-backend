import { Router } from "express";

import AddTutorRouter from "./addClass";
import DeleteClassRouter from "./deleteClass";
import EditClassRouter from "./editClass";
import ViewClassRouter from "./viewClass";
import ViewClassesRouter from "./viewClasses";
import checkAdmin from "../../../middleware/checkAdmin";
import checkTutor from "../../../middleware/checkTutor";

const router: Router = Router();

router.use(
  "/class",
  checkTutor,
  ViewClassRouter,

  checkAdmin,
  AddTutorRouter,
  DeleteClassRouter,
  EditClassRouter,
  ViewClassesRouter
);

export default router;
