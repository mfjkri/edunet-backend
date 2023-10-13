import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/homework/addHomework";
import handleAddHomework from "../../../handlers/homework/addHomework";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleAddHomework(req, res, params);
});

export default router;
