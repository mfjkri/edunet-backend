import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/tutor/viewTutor";
import handleViewTutor from "../../../handlers/tutor/viewTutor";

const router: Router = Router();

router.get("/:id", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleViewTutor(req, res, params);
});

export default router;
