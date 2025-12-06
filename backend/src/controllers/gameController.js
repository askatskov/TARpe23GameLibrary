/*import { gameService } from "../data/gameService.js";

function parseId(req, res) {
  const id = Number(req.params.id);
  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({ error: "Invalid ID" });
    return null;
  }
  return id;
}

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function parseGamePayload(body, { partial = false } = {}) {
  const {
    name,
    description,
    descriptionRaw,
    imageUrl,
    backgroundImageAdditional,
    website,
    releaseDate,
    genres,
    platforms,
    tags,
    stores,
    rating,
    ratingTop,
    ratingsCount,
    playtime,
    esrbRating,
  } = body;

  const errors = [];

  if (!partial) {
    if (!name) errors.push("name is required");
    if (!imageUrl) errors.push("imageUrl is required");
  }

  let parsedDate;
  if (releaseDate) {
    const ms = Date.parse(releaseDate);
    if (Number.isNaN(ms)) {
      errors.push("releaseDate must be a valid date string");
    } else {
      parsedDate = new Date(ms);
    }
  }

  let parsedRating;
  if (rating !== undefined) {
    parsedRating = Number(rating);
    if (Number.isNaN(parsedRating)) {
      errors.push("rating must be a number");
    }
  }

  let parsedRatingTop;
  if (ratingTop !== undefined) {
    parsedRatingTop = Number(ratingTop);
    if (Number.isNaN(parsedRatingTop)) {
      errors.push("ratingTop must be a number");
    }
  }

  let parsedRatingsCount;
  if (ratingsCount !== undefined) {
    parsedRatingsCount = Number(ratingsCount);
    if (!Number.isInteger(parsedRatingsCount)) {
      errors.push("ratingsCount must be an integer");
    }
  }

  let parsedPlaytime;
  if (playtime !== undefined) {
    parsedPlaytime = Number(playtime);
    if (!Number.isInteger(parsedPlaytime)) {
      errors.push("playtime must be an integer");
    }
  }

  if (errors.length > 0) {
    const err = new Error(errors.join(", "));
    err.statusCode = 400;
    throw err;
  }

  const payload = {
    ...(name !== undefined && { name, slug: slugify(name) }),
    ...(description !== undefined && { description }),
    ...(descriptionRaw !== undefined && { descriptionRaw }),
    ...(imageUrl !== undefined && { imageUrl }),
    ...(backgroundImageAdditional !== undefined && {
      backgroundImageAdditional,
    }),
    ...(website !== undefined && { website }),
    ...(parsedDate !== undefined && { releaseDate: parsedDate }),
    ...(Array.isArray(genres) && { genres }),
    ...(Array.isArray(platforms) && { platforms }),
    ...(Array.isArray(tags) && { tags }),
    ...(Array.isArray(stores) && { stores }),
    ...(parsedRating !== undefined && { rating: parsedRating }),
    ...(parsedRatingTop !== undefined && { ratingTop: parsedRatingTop }),
    ...(parsedRatingsCount !== undefined && {
      ratingsCount: parsedRatingsCount,
    }),
    ...(parsedPlaytime !== undefined && { playtime: parsedPlaytime }),
    ...(esrbRating !== undefined && { esrbRating }),
  };

  return payload;
}

async function getAllGames(req, res) {
  try {
    const games = await gameService.getAllGames();
    res.json(games);
  } catch (error) {
    console.error("❌ Error in getAllGames:", error);
    res.status(500).json({ error: "Failed to fetch games." });
  }
}

async function getGameById(req, res) {
  const id = parseId(req, res);
  if (id == null) return;

  try {
    const game = await gameService.getGameById(id);
    if (!game) return res.status(404).json({ error: "Game not found" });
    res.json(game);
  } catch (error) {
    console.error("❌ Error in getGameById:", error);
    res.status(500).json({ error: "Failed to fetch game." });
  }
}

async function getFeatured(req, res) {
  try {
    const games = await gameService.getFeaturedGames();
    res.json(games);
  } catch (error) {
    console.error("❌ Error in getFeatured:", error);
    res.status(500).json({ error: "Failed to fetch featured games." });
  }
}

async function getGamesByGenres(req, res) {
  try {
    const genres = await gameService.getGamesByGenres();
    res.json(genres);
  } catch (error) {
    console.error("❌ Error in getGamesByGenres:", error);
    res
      .status(500)
      .json({ error: "Failed to group games by genre." });
  }
}

async function getSimilarGames(req, res) {
  const id = parseId(req, res);
  if (id == null) return;

  try {
    const games = await gameService.getSimilarGames(id);
    if (games === null) {
      return res.status(404).json({ error: "Game not found" });
    }
    res.json(games);
  } catch (error) {
    console.error("❌ Error in getSimilarGames:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch similar games." });
  }
}

async function createGame(req, res) {
  try {
    const payload = parseGamePayload(req.body, { partial: false });
    const created = await gameService.createGame(payload);
    res.status(201).json(created);
  } catch (error) {
    console.error("❌ Error in createGame:", error);
    if (error.statusCode) {
      return res
        .status(error.statusCode)
        .json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to create game." });
  }
}

async function updateGame(req, res) {
  const id = parseId(req, res);
  if (id == null) return;

  try {
    const payload = parseGamePayload(req.body, { partial: true });
    const updated = await gameService.updateGame(id, payload);
    if (!updated) return res.status(404).json({ error: "Game not found" });
    res.json(updated);
  } catch (error) {
    console.error("❌ Error in updateGame:", error);
    if (error.statusCode) {
      return res
        .status(error.statusCode)
        .json({ error: error.message });
    }
    res.status(500).json({ error: "Failed to update game." });
  }
}

async function deleteGame(req, res) {
  const id = parseId(req, res);
  if (id == null) return;

  try {
    const deleted = await gameService.deleteGame(id);
    if (!deleted) return res.status(404).json({ error: "Game not found" });
    res.status(204).send();
  } catch (error) {
    console.error("❌ Error in deleteGame:", error);
    res.status(500).json({ error: "Failed to delete game." });
  }
}

export const gameController = {
  getAllGames,
  getGameById,
  getFeatured,
  getGamesByGenres,
  createGame,
  updateGame,
  deleteGame,
  getSimilarGames,
};
*/
