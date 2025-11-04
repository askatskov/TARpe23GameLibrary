import Games from "./GameModel.js";

export const gameService = {

  async getGame(gameId) {
    try {
      const game = await Games.findByPk(gameId, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      return game ? game.get({ plain: true }) : null;
    } catch (error) {
      console.error("❌ Error fetching game by ID:", error);
      throw new Error("Failed to fetch game.");
    }
  },

  async getGames() {
    try {
      const games = await Games.findAll({
        attributes: ["id", "name", "developer", "price"],
        order: [["id", "ASC"]],
      });
      return games.map((g) => g.get({ plain: true }));
    } catch (error) {
      console.error("❌ Error fetching games:", error);
      throw new Error("Failed to fetch games.");
    }
  },

  async createGame(name, developer, releaseDate, price) {
    try {
      if (!name || name.trim().length < 2) {
        throw new Error("Game name must be at least 2 characters long.");
      }

      if (price && (isNaN(price) || parseFloat(price) < 0)) {
        throw new Error("Price must be a valid positive number.");
      }

      const existingGame = await Games.findOne({ where: { name } });
      if (existingGame) {
        throw new Error(`Game '${name}' already exists.`);
      }

      const createdGame = await Games.create({
        name,
        developer,
        releaseDate,
        price,
      });

      console.log(`✅ Game '${name}' created successfully.`);
      return createdGame.get({ plain: true });
    } catch (error) {
      console.error("❌ Error creating game:", error.message);
      throw new Error(error.message || "Failed to create game.");
    }
  },

  async updateGame(gameId, updatedFields) {
    try {
      const game = await Games.findByPk(gameId);
      if (!game) {
        throw new Error(`Game with ID ${gameId} not found.`);
      }

      if (updatedFields.price && parseFloat(updatedFields.price) < 0) {
        throw new Error("Price cannot be negative.");
      }

      await game.update(updatedFields);
      console.log(`🔄 Game '${game.name}' updated successfully.`);
      return game.get({ plain: true });
    } catch (error) {
      console.error("❌ Error updating game:", error);
      throw new Error("Failed to update game.");
    }
  },

  async deleteGame(gameId) {
    try {
      const deleteResult = await Games.destroy({
        where: { id: gameId },
      });

      if (deleteResult === 0) {
        throw new Error(`Game with ID ${gameId} not found.`);
      }

      console.log(`🗑️ Game with ID ${gameId} deleted successfully.`);
      return true;
    } catch (error) {
      console.error("❌ Error deleting game:", error);
      throw new Error("Failed to delete game.");
    }
  },
};
