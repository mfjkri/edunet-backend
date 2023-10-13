import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/homework/deleteHomework";
import handleDeleteHomework from "../../../handlers/homework/deleteHomework";

const router: Router = Router();

router.delete("/", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleDeleteHomework(req, res, params);
});

export default router;
