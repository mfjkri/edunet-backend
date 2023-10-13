import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/homework/viewHomework";
import handleViewHomeworkByClassId from "../../../handlers/homework/viewHomeworkByClassId";

const router: Router = Router();

router.get("/class/:id", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleViewHomeworkByClassId(req, res, params);
});

export default router;
