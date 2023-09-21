import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/assessment/addAssessment";
import handleAddAssessment from "../../../handlers/assessment/addAssessment";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleAddAssessment(req, res, params);
});

export default router;
