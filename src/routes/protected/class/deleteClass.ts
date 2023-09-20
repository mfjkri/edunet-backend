import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/class/deleteClass";
import handleDeleteClass from "../../../handlers/class/deleteClass";

const router: Router = Router();

router.delete("/", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleDeleteClass(req, res, params);
});

export default router;
