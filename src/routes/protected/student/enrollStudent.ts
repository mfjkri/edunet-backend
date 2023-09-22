import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/student/enrollStudent";
import handleEnrollStudent from "../../../handlers/student/enrollStudent";

const router: Router = Router();

router.put("/enroll", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleEnrollStudent(req, res, params);
});

export default router;
