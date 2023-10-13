import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/announcement/editAnnouncement";
import handleEditAnnouncement from "../../../handlers/announcement/editAnnouncement";

const router: Router = Router();

router.put("/", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleEditAnnouncement(req, res, params);
});

export default router;
