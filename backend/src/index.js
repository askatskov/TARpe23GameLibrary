import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./data/dbConfig.js";

import "./data/ListingModel.js";

import rawgRoutes from "./routes/rawgRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";

import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const swaggerPath = path.join(__dirname, "docs/swagger.json");
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, "utf8"));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/v1/games", rawgRoutes);
app.use("/api/v1/listings", listingRoutes);

const PORT = process.env.PORT || 8000;

sequelize.sync().then(() => {
  console.log("DB synced");
  app.listen(PORT, () => console.log("Server running on port", PORT));
});
