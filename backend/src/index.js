import express from "express";
import http from "http";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerDoc from "./docs/swagger.json" with { type: "json" };
import { sync } from "./data/dbConfig.js";
import { userService } from "./data/userService.js";
import gameRoutes from "./routes/gameRoutes.js";

dotenv.config();

const app = express();
const httpServer = http.createServer(app);

app.use(express.json());

app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:8000"],
  })
);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.get("/", async (req, res) => {
  const user = await userService.getUser("Tiit");
  res.status(200).type("text/plain").send(`Hello, ${user.username}!`);
});

app.use("/api/v1/games", gameRoutes);

const PORT = process.env.PORT || 8000;

httpServer.listen(PORT, async () => {
  await sync();
  await userService.createUser("Tiit", "pass");

  console.log(`✅ Server is running at http://localhost:${PORT}/`);
});

export { httpServer, app };
