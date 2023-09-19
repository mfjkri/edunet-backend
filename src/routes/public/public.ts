import { Router } from "express";

import AuthRouter from "./auth/auth";

const router: Router = Router();

router.use("/public", AuthRouter);

export default router;
