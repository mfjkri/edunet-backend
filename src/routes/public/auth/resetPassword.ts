import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/auth/resetPassword";
import handleResetPassword from "../../../handlers/auth/resetPassword";

const router: Router = Router();

router.post("/resetPassword", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleResetPassword(req, res, params);
});

export default router;
