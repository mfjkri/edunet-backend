import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/student/removeStudent";
import handleRemoveStudent from "../../../handlers/student/removeStudent";

const router: Router = Router();

router.put("/remove", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleRemoveStudent(req, res, params);
});

export default router;
