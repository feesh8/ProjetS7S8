import "reflect-metadata";
import { DataSource } from "typeorm";
import { Accident } from "./entities/Accident";
import { DangerousZone } from "./entities/DangerousZone";
import { Utilisateur } from "./entities/Utilisateur";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "fannyshehabi",
  password: "postgres",
  database: "signalements_utilisateurs",
  synchronize: true,
  logging: false,
  entities: [Accident, Utilisateur, DangerousZone],
  migrations: [],
  subscribers: [],
});
