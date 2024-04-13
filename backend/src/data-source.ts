import "reflect-metadata";
import { DataSource } from "typeorm";
import { Signalement } from "./entities/Signalement";
import { Utilisateur } from "./entities/Utilisateur";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "db",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "signalements_utilisateurs",
  logging: false,
  entities: [Utilisateur, Signalement],
  migrations: [],
  subscribers: [],
});
