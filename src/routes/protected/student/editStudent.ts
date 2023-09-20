import { Router, Request, Response } from "express";

import { parseParams } from "../../../params/student/editStudent";
import handleEditStudent from "../../../handlers/student/editStudent";

const router: Router = Router();

router.put("/", async (req: Request, res: Response) => {
  const params = parseParams(req.body);
  if (!params) {
    return res.status(400).json({ message: "Invalid params" });
  }

  await handleEditStudent(req, res, params);
});

export default router;
