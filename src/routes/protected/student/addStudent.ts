import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/student/addStudent";
import handleAddStudent from "../../../handlers/student/addStudent";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleAddStudent(req, res, params);
});

export default router;
