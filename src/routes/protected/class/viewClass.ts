import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/class/viewClass";
import handleViewClass from "../../../handlers/class/viewClass";

const router: Router = Router();

router.get("/:id", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleViewClass(req, res, params);
});

export default router;
