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

const router: Router = Router();

router.use(
  "/note",
  checkTutor,
  ViewNoteRouter,
  AddNoteRouter,
  AddNoteByStudentIdRouter,
  AddNoteByTutorIdRouter,
  EditNoteRouter,
  DeleteNoteRouter,
  ViewNotesRouter,
  ViewNotesByStudentId,
  ViewNotesByTutorId
);

export default router;
