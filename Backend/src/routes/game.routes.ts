import { Router } from "express";
import * as controller from "../controllers/game.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";


const router = Router();

router.get("/all", controller.getAllGames)
router.get("/", requireAuth, controller.getOneGame);

export default router;