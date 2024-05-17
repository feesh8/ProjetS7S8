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

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://projets7s8.esir.univ-rennes1.fr:8080",
    ], // Liste des domaines autorisés
    methods: ["GET", "POST", "PUT", "DELETE"], // Méthodes HTTP autorisées
    allowedHeaders: ["Content-Type", "Authorization"], // En-têtes autorisés
  })
);

AppDataSource.initialize()
  .then(async () => {
    app.listen(port, () => {
      console.log("Server is running!");
    });
    console.log("Data Source has been initialized!");
  })
  .catch((error) => console.log(error));

export { app };
