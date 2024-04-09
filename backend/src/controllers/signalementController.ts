import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Signalement } from "../entities/Signalement";

export class AccidentSignalementController {
  static async getAccidents(req: Request, res: Response) {
    const accidentRepository = AppDataSource.getRepository(Signalement);
    const accidents = await accidentRepository.find();
    return res.status(200).json({
      data: accidents,
    });
  }
}
