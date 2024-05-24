import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Signalement } from "../entities/Signalement";
import { Utilisateur } from "../entities/Utilisateur";


export class SignalementController {
  static async getSignalement(req: Request, res: Response) {
    try {
      const signalementRepository = AppDataSource.getRepository(Signalement);
      const signalements = await signalementRepository.find();

      // Vérifiez si les données sont un tableau et chaque élément est un objet JSON
      const isValidResponse =
        Array.isArray(signalements) &&
        signalements.every((signalement) => typeof signalement === "object");

      if (isValidResponse) {
        return res.json({ data: signalements });
      } else {
        // En cas de réponse non conforme, renvoyez un message d'erreur
        return res.status(500).json({
          error:
            "Les données reçues ne sont pas sous forme de tableau d'objets JSON.",
        });
      }
    } catch (error) {
      // En cas d'erreur lors de la récupération des données, renvoyez un message d'erreur
      if (error instanceof Error) {
        return res.status(500).json({
          error: "Erreur lors de la récupération des données: " + error.message,
        });
      }
    }
  }

  static async getSignalementbyid(req: Request, res: Response) {
    const { id } = req.params;
    try {
        const signalementRepository = AppDataSource.getRepository(Signalement);
        const signalement = await signalementRepository.findOne({where: { id: id },});
        
        if (!signalement) {
            return res.status(404).json({ error: "Signalement non trouvé" });
        }
        
        return res.json({ data: signalement });
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({
                error: "Erreur lors de la récupération des données: " + error.message,
            });
        }
    }
}


  static async createSignalement(req: Request, res: Response) {
    try {
      const { latitude, longitude, adresse, date, description, type, userId } =
        req.body;

      // Obtenez l'utilisateur correspondant à l'ID fourni
      const utilisateurRepository = AppDataSource.getRepository(Utilisateur);
      const utilisateur = await utilisateurRepository.findOne({
        where: { id: userId },
      });

      // Vérifiez si l'utilisateur existe
      if (!utilisateur) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }

      // Créez un nouveau signalement associé à cet utilisateur
      const signalementRepository = AppDataSource.getRepository(Signalement);
      const newSignalement = await signalementRepository.create({
        latitude,
        longitude,
        adresse,
        date,
        description,
        type,
        user: utilisateur,
      });
      await signalementRepository.save(newSignalement);

      return res.status(201).json({ data: newSignalement });
    } catch (error) {
      console.error("Error creating signalement:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
