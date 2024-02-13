import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Utilisateur } from "../entities/Utilisateur";

export class UserController {
  static async getUsers(req: Request, res: Response) {
    const userRepository = AppDataSource.getRepository(Utilisateur);
    const users = await userRepository.find();
    return res.status(200).json({
      data: users,
    });
  }
}
