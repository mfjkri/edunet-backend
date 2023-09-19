import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/auth/refreshToken";
import handleRefreshToken from "../../../handlers/auth/refreshToken";

const router: Router = Router();

router.post("/refreshToken", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleRefreshToken(req, res, params);
});

export default router;
