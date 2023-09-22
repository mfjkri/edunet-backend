import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/note/viewNotes";
import handleViewNotesByTutorId from "../../../handlers/note/viewNotesByTutorId";

const router: Router = Router();

router.get("/tutor/:id", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleViewNotesByTutorId(req, res, params);
});

export default router;
