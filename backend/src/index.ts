import express from "express";
import cors from "cors";
import "reflect-metadata";
import accidentRoutes from "./routes/accidentMetropoleRoutes";
import { AppDataSource } from "./data-source";
import signalementRoutes from "./routes/signalementRoutes";

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

app.use("/api", accidentRoutes);
app.use("/", signalementRoutes);

AppDataSource.initialize()
  .then(async () => {
    app.listen(port, () => {
      console.log("Server is running on http://localhost:" + port);
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));

export { app };
