import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/class/editClass";
import handleEditClass from "../../../handlers/class/editClass";

const router: Router = Router();

router.put("/", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleEditClass(req, res, params);
});

export default router;
