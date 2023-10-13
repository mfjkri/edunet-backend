import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/homework/viewHomework";
import handleViewHomeworkByStudentId from "../../../handlers/homework/viewHomeworkByStudentId";

const router: Router = Router();

router.get("/student/:id", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleViewHomeworkByStudentId(req, res, params);
});

export default router;
