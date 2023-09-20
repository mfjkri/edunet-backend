import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/student/viewStudents";
import handleViewStudents from "../../../handlers/student/viewStudents";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleViewStudents(req, res, params);
});

export default router;
