import { Router } from "express";
import {
  getTopGames,
  searchGames,
  getGameDetails,
} from "../controllers/rawgController.js";

const router = Router();

router.get("/", getTopGames);
router.get("/search", searchGames);
router.get("/:id", getGameDetails);

export default router;
