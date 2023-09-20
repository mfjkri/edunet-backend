import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/tutor/unassignTutor";
import handleUnassignTutor from "../../../handlers/tutor/unassignTutor";

const router: Router = Router();

router.put("/unassign", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleUnassignTutor(req, res, params);
});

export default router;
