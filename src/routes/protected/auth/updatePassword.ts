import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/auth/updatePassword";
import handleUpdatePassword from "../../../handlers/auth/updatePassword";

const router: Router = Router();

router.put("/updatePassword", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleUpdatePassword(req, res, params);
});

export default router;
