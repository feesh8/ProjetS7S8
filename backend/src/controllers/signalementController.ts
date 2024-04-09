import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Signalement } from "../entities/Signalement";

export class SignalementController {
  static async getSignalement(req: Request, res: Response) {
    try {
      const signalementRepository = AppDataSource.getRepository(Signalement);
      const signalements = await signalementRepository.find();
  
      // Vérifiez si les données sont un tableau et chaque élément est un objet JSON
      const isValidResponse = Array.isArray(signalements) && signalements.every(signalement => typeof signalement === 'object');
  
      if (isValidResponse) {
      return res.json({ data : signalements });
      } else {
        // En cas de réponse non conforme, renvoyez un message d'erreur
        return res.status(500).json({
          error: 'Les données reçues ne sont pas sous forme de tableau d\'objets JSON.',
        });
      }
    } catch (error) {
      // En cas d'erreur lors de la récupération des données, renvoyez un message d'erreur
      return res.status(500).json({
        error: 'Erreur lors de la récupération des données: ' + error.message,
      });
    }
  }

}
