import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/auth/getUser";
import handleGetUser from "../../../handlers/auth/getUser";

const router: Router = Router();

router.get("/?:id", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleGetUser(req, res, params);
});

export default router;
