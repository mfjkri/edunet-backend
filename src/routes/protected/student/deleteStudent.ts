import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/student/deleteStudent";
import handleDeleteStudent from "../../../handlers/student/deleteStudent";

const router: Router = Router();

router.delete("/", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleDeleteStudent(req, res, params);
});

export default router;
