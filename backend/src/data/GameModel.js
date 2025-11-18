// backend/src/data/GameModel.js
import { sequelize } from "./dbConfig.js";
import { DataTypes } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const GameModel = sequelize.define(
  "Game",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    developer: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    rating: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: true,
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    priceHistory: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    reviews: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
    tableName: "Games",
    timestamps: true,
  }
);

if (process.env.DB_SYNC === "true") {
  try {
    await sequelize.sync({ alter: true });
    console.log("✅ Database synchronized.");

    if (process.env.DB_SEED === "true") {
      const baseGames = [
        {
          name: "The Witcher 3: Wild Hunt",
          developer: "CD Projekt Red",
          genre: "Action RPG",
          description:
            "Avatud maailma fantaasia-RPG, kus mängid nõiduri Geraltina.",
          releaseDate: "2015-05-19T00:00:00.000Z",
          price: 29.99,
          rating: 9.8,
          imageUrl:
            "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/292030/header.jpg",
          priceHistory: [
            { date: "2022-01-01", price: 39.99 },
            { date: "2023-01-01", price: 29.99 },
            { date: "2024-01-01", price: 19.99 },
          ],
          reviews: [
            {
              username: "Geralt",
              rating: 10,
              comment: "Best RPG ever made.",
              createdAt: "2024-06-01T12:00:00.000Z",
            },
            {
              username: "Yennefer",
              rating: 9,
              comment: "Story & world-building are insane.",
              createdAt: "2024-07-10T09:30:00.000Z",
            },
          ],
        },
        {
          name: "Cyberpunk 2077",
          developer: "CD Projekt Red",
          genre: "Action RPG",
          description:
            "Futuristlik avatud maailma RPG Night City tänavatel.",
          releaseDate: "2020-12-10T00:00:00.000Z",
          price: 59.99,
          rating: 9.0,
          imageUrl:
            "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1091500/header.jpg",
          priceHistory: [
            { date: "2022-01-01", price: 59.99 },
            { date: "2023-01-01", price: 49.99 },
            { date: "2024-01-01", price: 39.99 },
          ],
          reviews: [
            {
              username: "V",
              rating: 9,
              comment: "After patches this is a beast.",
              createdAt: "2024-02-02T14:20:00.000Z",
            },
          ],
        },
        {
          name: "Elden Ring",
          developer: "FromSoftware",
          genre: "Soulslike RPG",
          description: "Avatud maailma soulslike FromSoftware’ilt.",
          releaseDate: "2022-02-25T00:00:00.000Z",
          price: 59.99,
          rating: 9.8,
          imageUrl:
            "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/1245620/header.jpg",
          priceHistory: [
            { date: "2022-03-01", price: 59.99 },
            { date: "2023-03-01", price: 49.99 },
            { date: "2024-03-01", price: 44.99 },
          ],
          reviews: [
            {
              username: "Tarnished",
              rating: 10,
              comment: "Pain, beauty, freedom.",
              createdAt: "2024-03-15T18:45:00.000Z",
            },
          ],
        },
      ];

      for (const game of baseGames) {
        await GameModel.findOrCreate({
          where: { name: game.name },
          defaults: game,
        });
      }

      console.log("🎮 Seeded base games with images, price history & reviews.");
    }
  } catch (err) {
    console.error("❌ Error syncing/seeding GameModel:", err);
  }
}

export default GameModel;
