import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/announcement/viewAnnouncements";
import handleViewAnnouncementsByClassId from "../../../handlers/announcement/viewAnnouncementsByClassId";

const router: Router = Router();

router.get("/class/:id", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleViewAnnouncementsByClassId(req, res, params);
});

export default router;
