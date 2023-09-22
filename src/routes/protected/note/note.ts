import { Router } from "express";

import AddNoteRouter from "./addNote";
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
  EditNoteRouter,
  DeleteNoteRouter,
  ViewNotesRouter,
  ViewNotesByStudentId,
  ViewNotesByTutorId
);

export default router;
