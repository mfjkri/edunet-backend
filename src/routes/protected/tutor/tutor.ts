import { Router } from "express";

import AddTutorRouter from "./addTutor";
import AssignTutorRouter from "./assignTutor";
import DeleteTutorRouter from "./deleteTutor";
import EditTutorRouter from "./editTutor";
import UnassignTutorRouter from "./unassignTutor";
import ViewTutorRouter from "./viewTutor";
import ViewTutorsRouter from "./viewTutors";
import checkAdmin from "../../../middleware/checkAdmin";

const router: Router = Router();

router.use(
  "/tutor",
  checkAdmin,
  AddTutorRouter,
  AssignTutorRouter,
  DeleteTutorRouter,
  EditTutorRouter,
  UnassignTutorRouter,
  ViewTutorRouter,
  ViewTutorsRouter
);

export default router;
