import { Router, Request, Response } from "express";

import handleUploadHomeworkGrades from "../../../handlers/homework/uploadHomeworkGrades";

const router: Router = Router();

router.post("/upload", async (req: Request, res: Response) => {
  await handleUploadHomeworkGrades(req, res);
});

export default router;
