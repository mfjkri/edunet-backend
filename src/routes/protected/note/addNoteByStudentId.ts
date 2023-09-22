import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/note/addNoteByStudentId";
import handleAddNoteByStudentId from "../../../handlers/note/addNoteByStudentId";

const router: Router = Router();

router.post("/student", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleAddNoteByStudentId(req, res, params);
});

export default router;
