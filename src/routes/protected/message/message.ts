import { Router } from "express";

import AddMessageRouter from "./addMessage";
import ViewMessagesRouter from "./viewMessages";
import ViewChatsRouter from "./viewChats";
import checkStudent from "../../../middleware/checkStudent";

const router: Router = Router();

router.use(
  "/message",
  checkStudent,
  ViewChatsRouter,
  ViewMessagesRouter,
  AddMessageRouter
);

export default router;
