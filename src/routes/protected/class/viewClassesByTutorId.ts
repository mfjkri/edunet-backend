import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/class/viewClasses";
import handleViewClassesByTutorId from "../../../handlers/class/viewClassesByTutorId";

const router: Router = Router();

router.get("/tutor/:id", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleViewClassesByTutorId(req, res, params);
});

export default router;
