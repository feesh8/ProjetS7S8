import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { DangerousZone } from "../entities/DangerousZone";

export class ZonesDangereusesController {
  static async getDanger(req: Request, res: Response) {
    try{
    const dangerRepository = AppDataSource.getRepository(DangerousZone);
    const dangers = await dangerRepository.find();
    // Vérifiez si les données sont un tableau et chaque élément est un objet JSON
    const isValidResponse = Array.isArray(dangers) && dangers.every(dangers => typeof dangers === 'object');
  
    if (isValidResponse) {
    return res.json({ data : dangers });
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

    // return res.status(200).json({
    //   data: dangers,
    // });
  }
}
