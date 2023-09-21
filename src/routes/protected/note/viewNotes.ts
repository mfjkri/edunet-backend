import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/note/viewNotes";
import handleViewNotes from "../../../handlers/note/viewNotes";

const router: Router = Router();

router.get("/all/:id", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleViewNotes(req, res, params);
});

export default router;
