import { Router } from "express";

import AddStudentRouter from "./addStudent";
import DeleteStudentRouter from "./deleteStudent";
import EditStudentRouter from "./editStudent";
import RemoveStudentRouter from "./removeStudent";
import ViewStudentRouter from "./viewStudent";
import ViewStudentsRouter from "./viewStudents";
import checkAdmin from "../../../middleware/checkAdmin";
import checkStudent from "../../../middleware/checkStudent";
import checkTutor from "../../../middleware/checkTutor";

const router: Router = Router();

router.use(
  "/student",
  checkStudent,
  ViewStudentRouter,

  checkTutor,
  ViewStudentsRouter,

  checkAdmin,
  AddStudentRouter,
  DeleteStudentRouter,
  EditStudentRouter,
  RemoveStudentRouter
);

export default router;
