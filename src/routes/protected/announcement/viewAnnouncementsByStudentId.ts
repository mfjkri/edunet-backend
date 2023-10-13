import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/announcement/viewAnnouncements";
import handleViewAnnouncementsByStudentId from "../../../handlers/announcement/viewAnnouncementsByStudentId";

const router: Router = Router();

router.get("/student/:id", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleViewAnnouncementsByStudentId(req, res, params);
});

export default router;
