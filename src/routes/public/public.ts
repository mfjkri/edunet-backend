import { Router } from "express";

import AuthRouter from "./auth/auth";
import { getLabels } from "./aws";

const router: Router = Router();

router.use("/public", AuthRouter);

router.get("/ping", async (req, res) => {
  return res.status(200).json({ data: "pong" });
});

router.post("/ingredients", async (req, res) => {
  try {
    const rest = await getLabels(req.body.base64_string);
    return res.status(200).json({ data: rest });
  } catch (error: any) {
    console.log("Ingredients Error: ", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
