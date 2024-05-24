"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignalementController = void 0;
const data_source_1 = require("../data-source");
const Signalement_1 = require("../entities/Signalement");
const Utilisateur_1 = require("../entities/Utilisateur");
class SignalementController {
    static getSignalement(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const signalementRepository = data_source_1.AppDataSource.getRepository(Signalement_1.Signalement);
                const signalements = yield signalementRepository.find();
                // Vérifiez si les données sont un tableau et chaque élément est un objet JSON
                const isValidResponse = Array.isArray(signalements) &&
                    signalements.every((signalement) => typeof signalement === "object");
                if (isValidResponse) {
                    return res.json({ data: signalements });
                }
                else {
                    // En cas de réponse non conforme, renvoyez un message d'erreur
                    return res.status(500).json({
                        error: "Les données reçues ne sont pas sous forme de tableau d'objets JSON.",
                    });
                }
            }
            catch (error) {
                // En cas d'erreur lors de la récupération des données, renvoyez un message d'erreur
                if (error instanceof Error) {
                    return res.status(500).json({
                        error: "Erreur lors de la récupération des données: " + error.message,
                    });
                }
            }
        });
    }
    static createSignalement(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { latitude, longitude, adresse, date, description, type, userId } = req.body;
                // Obtenez l'utilisateur correspondant à l'ID fourni
                const utilisateurRepository = data_source_1.AppDataSource.getRepository(Utilisateur_1.Utilisateur);
                const utilisateur = yield utilisateurRepository.findOne({
                    where: { id: userId },
                });
                // Vérifiez si l'utilisateur existe
                if (!utilisateur) {
                    return res.status(404).json({ error: "Utilisateur non trouvé" });
                }
                // Créez un nouveau signalement associé à cet utilisateur
                const signalementRepository = data_source_1.AppDataSource.getRepository(Signalement_1.Signalement);
                const newSignalement = yield signalementRepository.create({
                    latitude,
                    longitude,
                    adresse,
                    date,
                    description,
                    type,
                    user: utilisateur,
                });
                yield signalementRepository.save(newSignalement);
                return res.status(201).json({ data: newSignalement });
            }
            catch (error) {
                console.error("Error creating signalement:", error);
                return res.status(500).json({ error: "Internal Server Error" });
            }
        });
    }
}
exports.SignalementController = SignalementController;
