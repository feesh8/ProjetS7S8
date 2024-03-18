"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const Accident_1 = require("./entities/Accident");
const DangerousZone_1 = require("./entities/DangerousZone");
const Utilisateur_1 = require("./entities/Utilisateur");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "fannyshehabi",
    password: "postgres",
    database: "signalements_utilisateurs",
    synchronize: true,
    logging: false,
    entities: [Accident_1.Accident, Utilisateur_1.Utilisateur, DangerousZone_1.DangerousZone],
    migrations: [],
    subscribers: [],
});
