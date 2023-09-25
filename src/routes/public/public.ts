import { Router } from "express";

import AuthRouter from "./auth/auth";

const router: Router = Router();

router.use("/public", AuthRouter);
router.use("/ping", (req, res) => {
  res.status(200).json({ message: "Pong" });
});

export default router;
