import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/tutor/assignTutor";
import handleAssignTutor from "../../../handlers/tutor/assignTutor";

const router: Router = Router();

router.put("/assign", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleAssignTutor(req, res, params);
});

export default router;
