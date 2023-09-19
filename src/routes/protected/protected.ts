import { Router } from "express";

import authenticateToken from "../../middleware/auth";
import AuthRouter from "./auth/auth";

const router: Router = Router();

router.use("/api", authenticateToken, AuthRouter);

export default router;
