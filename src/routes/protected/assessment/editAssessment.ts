import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/assessment/editAssessment";
import handleEditAssessment from "../../../handlers/assessment/editAssessment";

const router: Router = Router();

router.put("/", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleEditAssessment(req, res, params);
});

export default router;
