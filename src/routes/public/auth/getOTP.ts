import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/auth/getOTP";
import handleGenerateOTP from "../../../handlers/auth/getOTP";

const router: Router = Router();

router.post("/getOTP", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleGenerateOTP(req, res, params);
});

export default router;
