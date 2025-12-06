/*import Game from "./GameModel.js";

async function getGameById(id) {
  const game = await Game.findByPk(id);
  if (!game) return null;
  return game.get({ plain: true });
}

async function getAllGames() {
  const games = await Game.findAll({
    order: [["name", "ASC"]],
  });

  return games.map((g) => g.get({ plain: true }));
}

async function getFeaturedGames(limit = 5) {
  const games = await Game.findAll({
    limit,
    order: [
      ["rating", "DESC"],
      ["ratingsCount", "DESC"],
    ],
  });

  return games.map((g) => g.get({ plain: true }));
}

async function createGame(payload) {
  const game = await Game.create(payload);
  return game.get({ plain: true });
}

async function updateGame(id, payload) {
  const game = await Game.findByPk(id);
  if (!game) return null;

  Object.assign(game, payload);
  await game.save();

  return game.get({ plain: true });
}

async function deleteGame(id) {
  return Game.destroy({ where: { id } });
}

async function getGamesByGenres() {
  const games = await Game.findAll({
    attributes: [
      "id",
      "name",
      "imageUrl",
      "genres",
      "platforms",
      "rating",
    ],
  });

  const map = {};

  for (const row of games) {
    const game = row.get({ plain: true });
    if (!Array.isArray(game.genres)) continue;

    for (const genre of game.genres) {
      if (!map[genre]) {
        map[genre] = {
          genre,
          count: 0,
          games: [],
        };
      }
      map[genre].count++;
      map[genre].games.push(game);
    }
  }

  const result = Object.values(map).sort((a, b) => b.count - a.count);

  // max 20 mängu per žanr
  return result.map((g) => ({
    ...g,
    games: g.games.slice(0, 20),
  }));
}

async function getSimilarGames(id, limit = 10) {
  const base = await Game.findByPk(id);
  if (!base) return null;

  const basePlain = base.get({ plain: true });
  const baseGenres = Array.isArray(basePlain.genres) ? basePlain.genres : [];
  const baseTags = Array.isArray(basePlain.tags) ? basePlain.tags : [];

  if (baseGenres.length === 0 && baseTags.length === 0) return [];

  const all = await Game.findAll({
    where: { id: { [Game.sequelize.Op.ne]: id } },
    attributes: [
      "id",
      "name",
      "imageUrl",
      "genres",
      "tags",
      "rating",
      "platforms",
    ],
  });

  const scored = all.map((row) => {
    const g = row.get({ plain: true });
    const gGenres = Array.isArray(g.genres) ? g.genres : [];
    const gTags = Array.isArray(g.tags) ? g.tags : [];

    const genreOverlap = gGenres.filter((x) => baseGenres.includes(x)).length;
    const tagOverlap = gTags.filter((x) => baseTags.includes(x)).length;
    const score = genreOverlap * 3 + tagOverlap;

    return { ...g, _score: score };
  });

  return scored
    .filter((g) => g._score > 0)
    .sort(
      (a, b) =>
        b._score - a._score ||
        (b.rating || 0) - (a.rating || 0)
    )
    .slice(0, limit)
    .map(({ _score, ...rest }) => rest);
}

export const gameService = {
  getGameById,
  getAllGames,
  getFeaturedGames,
  createGame,
  updateGame,
  deleteGame,
  getGamesByGenres,
  getSimilarGames,
};
*/