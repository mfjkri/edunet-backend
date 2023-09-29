import { Router, Request, Response } from "express";

import handleViewUsers from "../../../handlers/auth/viewUsers";
import { parseParams } from "../../../params/auth/viewUsers";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }
  await handleViewUsers(req, res, params);
});

export default router;
