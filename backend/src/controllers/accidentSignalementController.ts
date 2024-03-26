import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Accident } from "../entities/Accident";

export class AccidentSignalementController {

  // static async getAccidents(req: Request, res: Response) {
  //   const accidentRepository = AppDataSource.getRepository(Accident);
  //   const accidents = await accidentRepository.find();
  //   return res.status(200).json({
  //     data: accidents,
  //   });
  // }

  static async getAccidents(req: Request, res: Response) {
    try {
      const accidentRepository = AppDataSource.getRepository(Accident);
      const accidents = await accidentRepository.find();
  
      // Vérifiez si les données sont un tableau et chaque élément est un objet JSON
      const isValidResponse = Array.isArray(accidents) && accidents.every(accident => typeof accident === 'object');
  
      if (isValidResponse) {
      return res.json({ data : accidents });
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
