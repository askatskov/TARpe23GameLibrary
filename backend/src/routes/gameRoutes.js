import { Router } from "express";
import { gameController } from "../controllers/gameController.js";

const router = Router();

router.get("/", gameController.getAllGames);
router.get("/featured", gameController.getFeatured);
router.get("/:id", gameController.getGameById);
router.get("/:id/price-history", gameController.getPriceHistory);
router.get("/:id/reviews", gameController.getReviews);
router.post("/:id/reviews", gameController.addReview);
router.post("/", gameController.createGame);
router.put("/:id", gameController.updateGame);
router.delete("/:id", gameController.deleteGame);

export default router;
