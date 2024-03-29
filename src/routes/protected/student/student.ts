import { Router } from "express";

import ViewStudentRouter from "./viewStudent";
import ViewStudentsRouter from "./viewStudents";
import ViewStudentsByTutorIdRouter from "./viewStudentsByTutorId";
import ViewStudentsByParentIdRouter from "./viewStudentsByParentId";
import AddStudentRouter from "./addStudent";
import DeleteStudentRouter from "./deleteStudent";
import EditStudentRouter from "./editStudent";
import RemoveStudentRouter from "./removeStudent";
import EnrollStudentRouter from "./enrollStudent";
import checkAdmin from "../../../middleware/checkAdmin";
import checkStudent from "../../../middleware/checkStudent";
import checkTutor from "../../../middleware/checkTutor";

const router: Router = Router();

router.use(
  "/student",
  checkStudent,
  ViewStudentRouter,
  ViewStudentsByParentIdRouter,

  checkTutor,
  ViewStudentsRouter,
  ViewStudentsByTutorIdRouter,

  checkAdmin,
  AddStudentRouter,
  DeleteStudentRouter,
  EditStudentRouter,
  RemoveStudentRouter,
  EnrollStudentRouter
);

export default router;
