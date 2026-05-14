import { Router } from "express";
import * as controller from "../controllers/game.controller.js";


const router = Router();

router.get("/all", controller.getAllGames)
router.get("/", controller.getOneGame);

export default router;