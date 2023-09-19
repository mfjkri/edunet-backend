import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/auth/getUser";
import handleDeleteUser from "../../../handlers/auth/deleteUser";

const router: Router = Router();

router.delete("/deleteUser", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleDeleteUser(req, res, params);
});

export default router;
