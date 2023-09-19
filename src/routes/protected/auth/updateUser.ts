import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/auth/updateUser";
import handleUpdateUser from "../../../handlers/auth/updateUser";

const router: Router = Router();

router.put("/updateUser", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleUpdateUser(req, res, params);
});

export default router;
