import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/note/editNote";
import handleEditNote from "../../../handlers/note/editNote";

const router: Router = Router();

router.put("/", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleEditNote(req, res, params);
});

export default router;
