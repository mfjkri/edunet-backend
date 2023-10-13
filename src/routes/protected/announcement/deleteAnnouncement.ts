import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/announcement/deleteAnnouncement";
import handleDeleteAnnouncement from "../../../handlers/announcement/deleteAnnouncement";

const router: Router = Router();

router.delete("/", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleDeleteAnnouncement(req, res, params);
});

export default router;
