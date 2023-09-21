import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/note/addNote";
import handleAddNote from "../../../handlers/note/addNote";

const router: Router = Router();

router.post("/", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleAddNote(req, res, params);
});

export default router;
