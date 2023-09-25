import { Router } from "express";

import AddTutorRouter from "./addTutor";
import AssignTutorRouter from "./assignTutor";
import DeleteTutorRouter from "./deleteTutor";
import EditTutorRouter from "./editTutor";
import UnassignTutorRouter from "./unassignTutor";
import ViewTutorRouter from "./viewTutor";
import ViewTutorsRouter from "./viewTutors";
import checkAdmin from "../../../middleware/checkAdmin";
import checkTutor from "../../../middleware/checkTutor";

const router: Router = Router();

router.use(
  "/tutor",
  checkTutor,
  ViewTutorRouter,

  checkAdmin,
  AddTutorRouter,
  AssignTutorRouter,
  DeleteTutorRouter,
  EditTutorRouter,
  UnassignTutorRouter,
  ViewTutorsRouter
);

export default router;
