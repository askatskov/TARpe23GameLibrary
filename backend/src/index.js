import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./docs/swagger.json" with { type: "json" };
import { syncDatabase } from "./data/dbConfig.js";
import { seedGames } from "./data/GameModel.js";
import { userService } from "./data/userService.js";
import gameRoutes from "./routes/gameRoutes.js";


dotenv.config();

const app = express();
const httpServer = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get("/", async (req, res) => {
  const user = await userService.getUser("Tiit");
  const name = user?.username || "guest";
  res.status(200).type("text/plain").send(`Hello, ${name}!`);
});

app.use("/api/v1/games", gameRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

const PORT = process.env.PORT || 8000;

httpServer.listen(PORT, async () => {
  await syncDatabase();
  await seedGames();
  await userService.createUser("Tiit", "pass");

  console.log(`✅ Server is running at http://localhost:${PORT}/`);
});

export { httpServer, app };
