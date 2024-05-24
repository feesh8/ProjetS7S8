"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Signalement_1 = require("./entities/Signalement");
const Utilisateur_1 = require("./entities/Utilisateur");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "db",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "signalements_utilisateurs",
    logging: false,
    entities: [Utilisateur_1.Utilisateur, Signalement_1.Signalement],
    migrations: [],
    subscribers: [],
});
