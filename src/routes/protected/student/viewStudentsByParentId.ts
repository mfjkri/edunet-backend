import { Router, Request, Response } from "express";

import handleViewStudentsByParentId from "../../../handlers/student/viewStudentsByParentId";
import { parseParams } from "../../../params/student/viewStudents";

const router: Router = Router();

router.get("/parent/:id", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleViewStudentsByParentId(req, res, params);
});

export default router;
