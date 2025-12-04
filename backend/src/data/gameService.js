import Games from "./GameModel.js";

export const gameService = {

  async getGame(id) {
    try {
      const game = await Games.findByPk(id, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      return game ? game.get({ plain: true }) : null;
    } catch (err) {
      console.error("❌ Error fetching game:", err);
      throw new Error("Failed to fetch game.");
    }
  },

  async getGames() {
    try {
      const games = await Games.findAll({
        attributes: [
          "id",
          "name",
          "developer",
          "genre",
          "price",
          "rating",
          "imageUrl",
        ],
        order: [["rating", "DESC"]],
      });

      return games.map(g => g.get({ plain: true }));
    } catch (err) {
      console.error("❌ Error fetching games:", err);
      throw new Error("Failed to load games.");
    }
  },

  async createGame(data) {
    try {
      if (!data.name || data.name.length < 2) {
        throw new Error("Name must be at least 2 characters.");
      }

      const existing = await Games.findOne({ where: { name: data.name } });
      if (existing) throw new Error("Game already exists.");

      const created = await Games.create(data);
      return created.get({ plain: true });

    } catch (err) {
      console.error("❌ Error creating game:", err);
      throw new Error(err.message);
    }
  },

  async updateGame(id, fields) {
    try {
      const game = await Games.findByPk(id);
      if (!game) throw new Error("Game not found.");

      await game.update(fields);
      return game.get({ plain: true });

    } catch (err) {
      console.error("❌ Error updating:", err);
      throw new Error("Failed to update game.");
    }
  },

  async deleteGame(id) {
    try {
      const result = await Games.destroy({ where: { id } });
      if (!result) throw new Error("Game not found.");
      return true;

    } catch (err) {
      console.error("❌ Error deleting:", err);
      throw new Error("Failed to delete game.");
    }
  },

  async getFeaturedGames(limit = 5) {
    const games = await Games.findAll({
      order: [["rating", "DESC"]],
      limit,
    });
    return games.map(g => g.get({ plain: true }));
  },

  async getPriceHistory(id) {
    const game = await Games.findByPk(id);
    if (!game) return null;
    return game.priceHistory || [];
  },

  async getReviews(id) {
    const game = await Games.findByPk(id);
    if (!game) return null;
    return game.reviews || [];
  },

  async addReview(id, { username, rating, comment }) {
    const game = await Games.findByPk(id);
    if (!game) throw new Error("Game not found");

    const reviews = Array.isArray(game.reviews) ? [...game.reviews] : [];
    const newReview = {
      username: username || "Anonüümne",
      rating: Number(rating),
      comment: comment || "",
      createdAt: new Date().toISOString(),
    };

    reviews.push(newReview);
    game.reviews = reviews;
    await game.save();

    return newReview;
  }
};
