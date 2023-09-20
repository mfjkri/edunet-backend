import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/tutor/addTutor";
import handleAddTutor from "../../../handlers/tutor/addTutor";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleAddTutor(req, res, params);
});

export default router;
