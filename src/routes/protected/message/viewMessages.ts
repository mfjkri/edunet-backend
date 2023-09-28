import { Router, Request, Response } from "express";

import handleViewMessages from "../../../handlers/message/viewMessages";
import { parseParams } from "../../../params/message/viewMessages";

const router: Router = Router();

router.get("/:id/", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleViewMessages(req, res, params);
});

export default router;
