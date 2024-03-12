import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { DangerousZone } from "../entities/DangerousZone";

export class ZonesDangereusesController {
  static async getDanger(req: Request, res: Response) {
    const dangerRepository = AppDataSource.getRepository(DangerousZone);
    const dangers = await dangerRepository.find();
    return res.status(200).json({
      data: dangers,
    });
  }
}
