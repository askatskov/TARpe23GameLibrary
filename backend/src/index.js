import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import rawgRoutes from "./routes/rawgRoutes.js";
import listingRoutes from "./routes/listingRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Compute dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* --------------------------------------------------
   FRONTEND SERVE
-------------------------------------------------- */
const publicPath = path.join(__dirname, "../public"); 
// because `src` → go up one folder → look for /public

app.use(express.static(publicPath));

// SPA fallback (EXCEPT API)
app.get("*", (req, res, next) => {
  if (req.path.startsWith("/api")) return next();
  res.sendFile(path.join(publicPath, "index.html"));
});
/* -------------------------------------------------- */

// Swagger
const swaggerPath = path.join(__dirname, "docs/swagger.json");
const swaggerDocument = JSON.parse(fs.readFileSync(swaggerPath, "utf8"));

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// API routes
app.use("/api/v1/games", rawgRoutes);
app.use("/api/v1/listings", listingRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`🚀 Marketplace server running on http://localhost:${PORT}`);
});
