import { Router } from "express";

import AddNoteRouter from "./addNote";
import AddNoteByStudentIdRouter from "./addNoteByStudentId";
import AddNoteByTutorIdRouter from "./addNoteByTutorId";
import DeleteNoteRouter from "./deleteNote";
import EditNoteRouter from "./editClass";
import ViewNoteRouter from "./viewNote";
import ViewNotesRouter from "./viewNotes";
import ViewNotesByStudentId from "./viewNotesByStudentId";
import ViewNotesByTutorId from "./viewNotesByTutorId";
import checkTutor from "../../../middleware/checkTutor";
import checkStudent from "../../../middleware/checkStudent";

const router: Router = Router();

router.use(
  "/note",
  checkStudent,
  ViewNotesRouter,
  ViewNotesByStudentId,
  checkTutor,
  ViewNotesByTutorId,
  ViewNoteRouter,
  AddNoteRouter,
  AddNoteByStudentIdRouter,
  AddNoteByTutorIdRouter,
  EditNoteRouter,
  DeleteNoteRouter
);

export default router;
