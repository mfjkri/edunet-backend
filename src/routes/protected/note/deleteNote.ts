import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/note/deleteNote";
import handleDeleteNote from "../../../handlers/note/deleteNote";

const router: Router = Router();

router.delete("/", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleDeleteNote(req, res, params);
});

export default router;
