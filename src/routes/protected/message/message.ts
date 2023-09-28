import { Router } from "express";

import AddMessageRouter from "./addMessage";
import ViewMessagesRouter from "./viewMessages";
import checkStudent from "../../../middleware/checkStudent";

const router: Router = Router();

router.use("/message", checkStudent, ViewMessagesRouter, AddMessageRouter);

export default router;
