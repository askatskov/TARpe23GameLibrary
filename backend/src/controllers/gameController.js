import { gameService } from "../data/gameService.js";

export const gameController = {
  async getAllGames(req, res) {
    try {
      const games = await gameService.getGames();
      return res.json(games);
    } catch (error) {
      console.error("❌ Error in getAllGames:", error);
      return res.status(500).send({ error: "Failed to fetch games." });
    }
  },

  async getGameById(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ error: "URL does not contain ID" });
    }

    try {
      const game = await gameService.getGame(id);
      if (!game) {
        return res.status(404).send({ error: "Game not found" });
      }
      return res.json(game);
    } catch (error) {
      console.error("❌ Error in getGameById:", error);
      return res.status(500).send({ error: "Failed to fetch game." });
    }
  },

  async createGame(req, res) {
    const { name, developer, releaseDate: releaseDateStr, price: priceStr } = req.body;

    if (!name) {
      return res.status(400).send({ error: "Missing or empty required field: name" });
    }

    const releaseDate = releaseDateStr ? Date.parse(releaseDateStr) : undefined;
    if (releaseDateStr && isNaN(releaseDate)) {
      return res
        .status(400)
        .send({ error: "Empty or malformed date string in field: releaseDate" });
    }

    const price =
      priceStr !== undefined && priceStr !== null && priceStr !== ""
        ? parseFloat(priceStr)
        : undefined;

    if (priceStr && isNaN(price)) {
      return res
        .status(400)
        .send({ error: "Malformed number string in field: price" });
    }

    try {
      const game = await gameService.createGame({
        name,
        developer,
        releaseDate,
        price,
      });
      return res.status(201).json(game);
    } catch (error) {
      console.error("❌ Error in createGame:", error);
      return res.status(400).send({ error: error.message });
    }
  },

  async updateGame(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ error: "URL does not contain ID" });
    }

    const { name, developer, releaseDate: releaseDateStr, price: priceStr } = req.body;

    const releaseDate = releaseDateStr ? Date.parse(releaseDateStr) : undefined;
    if (releaseDateStr && isNaN(releaseDate)) {
      return res
        .status(400)
        .send({ error: "Malformed date string in field: releaseDate" });
    }

    const price =
      priceStr !== undefined && priceStr !== null && priceStr !== ""
        ? parseFloat(priceStr)
        : undefined;

    if (priceStr && isNaN(price)) {
      return res
        .status(400)
        .send({ error: "Malformed number string in field: price" });
    }

    try {
      const updatedGame = await gameService.updateGame(id, {
        name,
        developer,
        releaseDate,
        price,
      });

      return res.status(200).json(updatedGame);
    } catch (error) {
      console.error("❌ Error in updateGame:", error);
      if (error.message.includes("not found")) {
        return res.status(404).send({ error: error.message });
      }
      return res.status(400).send({ error: error.message });
    }
  },

  async deleteGame(req, res) {
    const { id } = req.params;

    if (!id) {
      return res.status(400).send({ error: "URL does not contain ID" });
    }

    try {
      const deleted = await gameService.deleteGame(id);
      if (!deleted) {
        return res.status(404).send({ error: "Game not found" });
      }
      return res.status(204).send();
    } catch (error) {
      console.error("❌ Error in deleteGame:", error);
      return res.status(400).send({ error: error.message });
    }
  },
  
  async getFeatured(req, res) {
    try {
      const games = await gameService.getFeaturedGames(5);
      res.json(games);
    } catch (e) {
      console.error(e);
      res.status(500).send({ error: "Failed to load featured games." });
    }
  },

  async getPriceHistory(req, res) {
    try {
      const history = await gameService.getPriceHistory(req.params.id);
      if (history === null) {
        return res.status(404).send({ error: "Game not found" });
      }
      res.json(history);
    } catch (e) {
      console.error(e);
      res.status(500).send({ error: "Failed to load price history." });
    }
  },

  async getReviews(req, res) {
    try {
      const reviews = await gameService.getReviews(req.params.id);
      if (reviews === null) {
        return res.status(404).send({ error: "Game not found" });
      }
      res.json(reviews);
    } catch (e) {
      console.error(e);
      res.status(500).send({ error: "Failed to load reviews." });
    }
  },

  async addReview(req, res) {
    const { username, rating, comment } = req.body;
    if (!rating) {
      return res.status(400).send({ error: "Rating is required" });
    }
    try {
      const review = await gameService.addReview(req.params.id, {
        username,
        rating,
        comment,
      });
      res.status(201).json(review);
    } catch (e) {
      console.error(e);
      if (e.message === "Game not found") {
        return res.status(404).send({ error: "Game not found" });
      }
      res.status(500).send({ error: "Failed to add review." });
    }
  },
};