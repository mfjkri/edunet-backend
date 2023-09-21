import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/note/viewNote";
import handleViewNote from "../../../handlers/note/viewNote";

const router: Router = Router();

router.get("/view/:id", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleViewNote(req, res, params);
});

export default router;
