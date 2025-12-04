import { sequelize } from "./dbConfig.js";
import { DataTypes } from "sequelize";

const Game = sequelize.define(
  "Game",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },

    rawgId: {
      type: DataTypes.INTEGER,
      allowNull: true  // manual create ei sisalda rawgId
    },

    slug: {
      type: DataTypes.STRING,
      allowNull: true
    },

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: ""
    },

    descriptionRaw: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: ""
    },

    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },

    backgroundImageAdditional: {
      type: DataTypes.STRING,
      allowNull: true
    },

    website: {
      type: DataTypes.STRING,
      allowNull: true
    },

    releaseDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },

    rating: {
      type: DataTypes.FLOAT,
      allowNull: true
    },

    ratingTop: {
      type: DataTypes.FLOAT,
      allowNull: true
    },

    ratingsCount: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    playtime: {
      type: DataTypes.INTEGER,
      allowNull: true
    },

    genres: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: []
    },

    platforms: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: []
    },

    tags: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: []
    },

    stores: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: []
    },

    esrbRating: {
      type: DataTypes.JSON,
      allowNull: true
    },

    screenshots: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: []
    },

    movies: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: []
    },

    rawgMeta: {
      type: DataTypes.JSON,
      allowNull: true,
      defaultValue: {}
    }
  },
  {
    tableName: "Games",
    timestamps: true
  }
);

export default Game;
export { Game };
