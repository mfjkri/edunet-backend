import { Router, Request, Response } from "express";

import handleViewChats from "../../../handlers/message/viewChats";
import { parseParams } from "../../../params/message/viewChats";

const router: Router = Router();

router.get("/", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleViewChats(req, res, params);
});

export default router;
