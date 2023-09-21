import { Router } from "express";

import AddNoteRouter from "./addNote";
import DeleteNoteRouter from "./deleteNote";
import EditNoteRouter from "./editClass";
import ViewNoteRouter from "./viewNote";
import ViewNotesRouter from "./viewNotes";
import checkTutor from "../../../middleware/checkTutor";

const router: Router = Router();

router.use(
  "/note",
  checkTutor,
  ViewNoteRouter,
  AddNoteRouter,
  EditNoteRouter,
  DeleteNoteRouter,
  ViewNotesRouter
);

export default router;
