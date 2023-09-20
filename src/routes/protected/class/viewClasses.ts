import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/class/viewClasses";
import handleViewClasses from "../../../handlers/class/viewClasses";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleViewClasses(req, res, params);
});

export default router;
