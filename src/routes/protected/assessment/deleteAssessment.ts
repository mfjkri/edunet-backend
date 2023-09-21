import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/assessment/deleteAssessment";
import handleDeleteAssessment from "../../../handlers/assessment/deleteAssessment";

const router: Router = Router();

router.delete("/", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleDeleteAssessment(req, res, params);
});

export default router;
