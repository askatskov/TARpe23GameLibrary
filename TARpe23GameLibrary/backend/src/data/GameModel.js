import { sequelize } from "./dbConfig.js";
import { DataTypes } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const Games = sequelize.define(
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
      validate: {
        len: {
          args: [2, 100],
          msg: "Game name must be between 2 and 100 characters.",
        },
      },
    },
    developer: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: true,
      validate: {
        isDate: {
          msg: "Release date must be a valid date.",
        },
      },
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
      validate: {
        isDecimal: {
          msg: "Price must be a decimal number.",
        },
        minPrice(value) {
          if (value && parseFloat(value) < 0) {
            throw new Error("Price cannot be negative.");
          }
        },
      },
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
    console.log("✅ Database synchronized successfully.");

    if (process.env.DB_SEED === "true") {
      const seedData = [
        {
          name: "Minecraft",
          developer: "Mojang",
          releaseDate: new Date("2011-11-18T00:00:00.000Z"),
          price: "29.99",
        },
        {
          name: "Cyberpunk 2077",
          developer: "CD Projekt Red",
          releaseDate: new Date("2020-12-10T00:00:00.000Z"),
          price: "59.99",
        },
        {
          name: "Stardew Valley",
          developer: "ConcernedApe",
          releaseDate: new Date("2016-02-26T00:00:00.000Z"),
          price: "14.99",
        },
      ];

      for (const game of seedData) {
        await Games.findOrCreate({
          where: { name: game.name },
          defaults: game,
        });
      }

      console.log("🌱 Seed data added successfully.");
    }
  } catch (error) {
    console.error("❌ Error syncing database:", error);
  }
}

export default Games;
