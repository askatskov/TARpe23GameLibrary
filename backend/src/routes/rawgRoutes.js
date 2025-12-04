import { Router } from "express";
import { searchGames, getGameDetails } from "../controllers/rawgController.js";

const router = Router();

router.get("/search", searchGames);
router.get("/:id", getGameDetails);

export default router;
