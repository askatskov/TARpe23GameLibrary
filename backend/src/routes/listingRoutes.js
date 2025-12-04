import { Router } from "express";
import {
  createListing,
  getListing,
  listListings,
  updateListingHandler,
  deleteListingHandler,
} from "../controllers/listingController.js";

const router = Router();

router.get("/", listListings);
router.post("/", createListing);
router.get("/:id", getListing);
router.put("/:id", updateListingHandler);
router.delete("/:id", deleteListingHandler);

export default router;
