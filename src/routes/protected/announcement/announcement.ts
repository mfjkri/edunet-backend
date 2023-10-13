import { Router } from "express";

import AddAnnouncementRouter from "./addAnnouncement";
import DeleteAnnouncementRouter from "./deleteAnnouncement";
import EditAnnouncementRouter from "./editAnnouncement";
import ViewAnnouncementsByStudentId from "./viewAnnouncementsByStudentId";
import ViewAnnouncementsByClassId from "./viewAnnouncementsByClassId";
import checkTutor from "../../../middleware/checkTutor";
import checkStudent from "../../../middleware/checkStudent";

const router: Router = Router();

router.use(
  "/announcement",
  checkStudent,
  ViewAnnouncementsByStudentId,
  ViewAnnouncementsByClassId,
  checkTutor,
  AddAnnouncementRouter,
  EditAnnouncementRouter,
  DeleteAnnouncementRouter
);

export default router;
