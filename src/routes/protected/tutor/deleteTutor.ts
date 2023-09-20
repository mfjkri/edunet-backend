import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/tutor/deleteTutor";
import handleDeleteTutor from "../../../handlers/tutor/deleteTutor";

const router: Router = Router();

router.delete("/", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleDeleteTutor(req, res, params);
});

export default router;
