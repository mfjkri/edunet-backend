import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/auth/updateAvatar";
import handleUpdateAvatar from "../../../handlers/auth/updateAvatar";

const router: Router = Router();

router.put("/updateAvatar", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleUpdateAvatar(req, res, params);
});

export default router;
