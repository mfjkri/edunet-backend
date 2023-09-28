import { Router, Request, Response } from "express";

import handleAddMessage from "../../../handlers/message/addMessage";
import { parseParams } from "../../../params/message/addMessage";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleAddMessage(req, res, params);
});

export default router;
