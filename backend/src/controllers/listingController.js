import { listingService } from "../data/listingService.js";

function parseId(req, res, name = "id") {
  const raw = req.params[name];
  const id = Number(raw);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: `Invalid ${name}` });
    return null;
  }
  return id;
}

function parseListFilters(req) {
  const {
    type,
    itemType,
    status,
    gameRawgId,
    platform,
    userId,
    minPrice,
    maxPrice,
  } = req.query;

  const filters = {};

  if (type && ["BUY", "SELL"].includes(type)) filters.type = type;
  if (itemType && ["KEY", "ACCOUNT"].includes(itemType))
    filters.itemType = itemType;
  if (status && ["ACTIVE", "SOLD", "EXPIRED", "CANCELLED"].includes(status))
    filters.status = status;
  if (gameRawgId) filters.gameRawgId = Number(gameRawgId);
  if (platform) filters.platform = platform;
  if (userId) filters.userId = Number(userId);
  if (minPrice) filters.minPrice = Number(minPrice);
  if (maxPrice) filters.maxPrice = Number(maxPrice);

  return filters;
}

function validateListingPayload(body, { partial = false } = {}) {
  const {
    gameRawgId,
    gameSlug,
    gameName,
    type,
    itemType,
    platform,
    price,
    currency,
    description,
    userId,
    status,
  } = body;

  const errors = [];

  if (!partial) {
    if (!gameRawgId) errors.push("gameRawgId is required");
    if (!gameName) errors.push("gameName is required");
    if (!type) errors.push("type is required");
    if (!itemType) errors.push("itemType is required");
    if (price == null) errors.push("price is required");
  }

  let parsedGameRawgId;
  if (gameRawgId != null) {
    parsedGameRawgId = Number(gameRawgId);
    if (!Number.isInteger(parsedGameRawgId)) {
      errors.push("gameRawgId must be an integer");
    }
  }

  const allowedTypes = ["BUY", "SELL"];
  if (type && !allowedTypes.includes(type)) {
    errors.push(`type must be one of: ${allowedTypes.join(", ")}`);
  }

  const allowedItemTypes = ["KEY", "ACCOUNT"];
  if (itemType && !allowedItemTypes.includes(itemType)) {
    errors.push(`itemType must be one of: ${allowedItemTypes.join(", ")}`);
  }

  let parsedPrice;
  if (price != null) {
    parsedPrice = Number(price);
    if (Number.isNaN(parsedPrice) || parsedPrice < 0) {
      errors.push("price must be a non-negative number");
    }
  }

  let parsedUserId;
  if (userId != null) {
    parsedUserId = Number(userId);
    if (!Number.isInteger(parsedUserId)) {
      errors.push("userId must be an integer");
    }
  }

  const allowedStatus = ["ACTIVE", "SOLD", "EXPIRED", "CANCELLED"];
  if (status && !allowedStatus.includes(status)) {
    errors.push(`status must be one of: ${allowedStatus.join(", ")}`);
  }

  if (errors.length > 0) {
    const err = new Error(errors.join(", "));
    err.statusCode = 400;
    throw err;
  }

  const payload = {
    ...(parsedGameRawgId != null && { gameRawgId: parsedGameRawgId }),
    ...(gameSlug !== undefined && { gameSlug }),
    ...(gameName !== undefined && { gameName }),
    ...(type !== undefined && { type }),
    ...(itemType !== undefined && { itemType }),
    ...(platform !== undefined && { platform }),
    ...(parsedPrice != null && { price: parsedPrice }),
    ...(currency !== undefined && { currency }),
    ...(description !== undefined && { description }),
    ...(parsedUserId != null && { userId: parsedUserId }),
    ...(status !== undefined && { status }),
  };

  return payload;
}

export async function createListing(req, res) {
  try {
    const payload = validateListingPayload(req.body, { partial: false });
    const listing = await listingService.createListing(payload);
    res.status(201).json(listing);
  } catch (err) {
    console.error("❌ createListing error:", err);
    res
      .status(err.statusCode || 500)
      .json({ error: err.message || "Failed to create listing." });
  }
}

export async function getListing(req, res) {
  const id = parseId(req, res);
  if (id == null) return;

  try {
    const listing = await listingService.getListingById(id);
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }
    res.json(listing);
  } catch (err) {
    console.error("❌ getListing error:", err);
    res.status(500).json({ error: "Failed to fetch listing." });
  }
}

export async function listListings(req, res) {
  try {
    const filters = parseListFilters(req);
    const listings = await listingService.listListings(filters);
    res.json(listings);
  } catch (err) {
    console.error("❌ listListings error:", err);
    res.status(500).json({ error: "Failed to fetch listings." });
  }
}

export async function updateListingHandler(req, res) {
  const id = parseId(req, res);
  if (id == null) return;

  try {
    const payload = validateListingPayload(req.body, { partial: true });
    const updated = await listingService.updateListing(id, payload);
    if (!updated) {
      return res.status(404).json({ error: "Listing not found" });
    }
    res.json(updated);
  } catch (err) {
    console.error("❌ updateListing error:", err);
    res
      .status(err.statusCode || 500)
      .json({ error: err.message || "Failed to update listing." });
  }
}

export async function deleteListingHandler(req, res) {
  const id = parseId(req, res);
  if (id == null) return;

  try {
    const deleted = await listingService.deleteListing(id);
    if (!deleted) {
      return res.status(404).json({ error: "Listing not found" });
    }
    res.status(204).send();
  } catch (err) {
    console.error("❌ deleteListing error:", err);
    res.status(500).json({ error: "Failed to delete listing." });
  }
}
