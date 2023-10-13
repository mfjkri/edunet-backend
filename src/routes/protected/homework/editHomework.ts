import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/homework/editHomework";
import handleEditHomework from "../../../handlers/homework/editHomework";

const router: Router = Router();

router.put("/", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleEditHomework(req, res, params);
});

export default router;
