import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/student/viewStudent";
import handleViewStudent from "../../../handlers/student/viewStudent";

const router: Router = Router();

router.get("/:id", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleViewStudent(req, res, params);
});

export default router;
