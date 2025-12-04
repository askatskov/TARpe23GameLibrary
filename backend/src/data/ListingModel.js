import { sequelize } from "./dbConfig.js";
import { DataTypes } from "sequelize";

const Listing = sequelize.define(
  "Listing",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    gameRawgId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    gameSlug: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    gameName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    type: {
      type: DataTypes.ENUM("BUY", "SELL"),
      allowNull: false,
    },

    itemType: {
      type: DataTypes.ENUM("KEY", "ACCOUNT"),
      allowNull: false,
    },

    platform: {
      type: DataTypes.STRING,
      allowNull: true,
    },

    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    currency: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "EUR",
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      defaultValue: "",
    },

    userId: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM("ACTIVE", "SOLD", "EXPIRED", "CANCELLED"),
      allowNull: false,
      defaultValue: "ACTIVE",
    },
  },
  {
    tableName: "Listings",
    timestamps: true,
  }
);

export default Listing;
export { Listing };
