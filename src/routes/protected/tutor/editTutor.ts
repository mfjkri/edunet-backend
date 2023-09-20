import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/tutor/editTutor";
import handleEditTutor from "../../../handlers/tutor/editTutor";

const router: Router = Router();

router.put("/", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleEditTutor(req, res, params);
});

export default router;
