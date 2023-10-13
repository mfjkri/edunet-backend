import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/announcement/addAnnouncement";
import handleAddAnnouncement from "../../../handlers/announcement/addAnnouncement";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleAddAnnouncement(req, res, params);
});

export default router;
