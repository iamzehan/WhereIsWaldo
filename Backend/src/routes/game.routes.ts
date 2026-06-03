import { Router } from "express";
import * as controller from "../controllers/game.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";


const router = Router();

router.get("/all", controller.getAllGames)
router.get("/", requireAuth, controller.getOneGame);
router.get("/leaderboard", controller.getLeaderBoard);
router.delete("/logs/cleanup", requireAuth, controller.cleanupLogs);
router.post("/logs/submit", requireAuth, controller.submitResults);

export default router;