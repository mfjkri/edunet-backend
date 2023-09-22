import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/note/addNoteByTutorId";
import handleAddNoteByTutorId from "../../../handlers/note/addNoteByTutorId";

const router: Router = Router();

router.post("/tutor", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleAddNoteByTutorId(req, res, params);
});

export default router;
