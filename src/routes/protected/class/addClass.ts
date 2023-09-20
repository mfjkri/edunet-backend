import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/class/addClass";
import handleAddClass from "../../../handlers/class/addClass";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleAddClass(req, res, params);
});

export default router;
