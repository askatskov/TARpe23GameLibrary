import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { sequelize } from "./data/dbConfig.js";
import "./data/listingModel.js";

import rawgRoutes from "./routes/rawgRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/v1/games", rawgRoutes);
app.use("/api/v1/listings", listingRoutes);

const PORT = process.env.PORT || 8000;

async function start() {
  try {
    await sequelize.sync({ alter: true });

    console.log("✅ Database synced!");

    app.listen(PORT, () => {
      console.log(`🚀 Marketplace running on http://localhost:${PORT}`);
    });

  } catch (err) {
    console.error("❌ Failed to start server:", err);
  }
}

start();
