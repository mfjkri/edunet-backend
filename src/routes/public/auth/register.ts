import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/auth/register";
import handleRegister from "../../../handlers/auth/register";

const router: Router = Router();

router.post("/register", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleRegister(req, res, params);
});

export default router;
