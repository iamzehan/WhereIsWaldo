import { Router } from "express";
import authRoutes from "./auth.routes.js";
import gameRoutes from "./game.routes.js"

const router = Router();

router.use("/auth", authRoutes);
router.use("/game", gameRoutes);
export default router;
