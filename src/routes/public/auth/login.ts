import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/auth/login";
import handleLogin from "../../../handlers/auth/login";

const router: Router = Router();

router.post("/login", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleLogin(req, res, params);
});

export default router;
