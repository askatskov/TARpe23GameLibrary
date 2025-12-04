import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const isTest = process.env.NODE_ENV === "test";
console.log("isTest:", isTest);

const sequelize = isTest
  ? new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
    })
  : new Sequelize({
      dialect: "sqlite",
      storage: process.env.DB_FILE || "database.sqlite",
      logging: false,
    });

async function syncDatabase() {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connection has been established.");

    await sequelize.sync({ alter: true });
    console.log("✅ All models were synchronized.");
  } catch (error) {
    console.error("❌ Unable to initialize the database:", error);
    throw error;
  }
}

export { sequelize, syncDatabase };
