import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/assessment/viewAssessments";
import handleViewAssessments from "../../../handlers/assessment/viewAssessments";

const router: Router = Router();

router.get("/:id/:classId", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleViewAssessments(req, res, params);
});

export default router;
