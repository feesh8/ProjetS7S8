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

  static async getUserByEmail(req: Request, res: Response) {
    try {
      // Récupérer l'email à partir des paramètres de requête
      const email = req.params.email;

      // Récupérer le référentiel utilisateur
      const userRepository = AppDataSource.getRepository(Utilisateur);

      // Rechercher l'utilisateur par son email
      const user = await userRepository.findOne({ where: { email } });

      // Vérifier si l'utilisateur existe
      if (!user) {
        return res.status(404).json({ message: 'Utilisateur non trouvé' });
      }

      // Retourner l'utilisateur trouvé
      return res.status(200).json(user);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur par email :', error);
      return res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur' });
    }
  }
}
