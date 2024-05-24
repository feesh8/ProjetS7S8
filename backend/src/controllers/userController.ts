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

  static async loginUser(req: Request, res: Response) {
    const { email, mot_de_passe } = req.body;

    try {
      const userRepository = AppDataSource.getRepository(Utilisateur);
      const user = await userRepository.findOne({ where: { email, mot_de_passe } });

      if (user) {
        res.status(200).json({ user });
      } else {
        res.status(401).json({ message: 'Invalid email or password' });
      }
    } catch (error) {
      console.error('Error occurred while logging in:', error);
      res.status(500).json({ message: 'Error occurred while logging in' });
    }
  }


  static async signUpUser(req: Request, res: Response) {
    const { email, mot_de_passe } = req.body;

    try {
      const userRepository = AppDataSource.getRepository(Utilisateur);

      // Check if user with the provided email already exists
      const existingUser = await userRepository.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: 'User with this email already exists' });
      }
        
      const newUser = userRepository.create({ email, mot_de_passe });

      // Save the new user to the database
      await userRepository.save(newUser);

      // Return success response
      res.status(201).json({ message: 'User created successfully', user: newUser });
      
      
    } catch (error) {
      console.error('Error occurred while signing up user:', error);
      res.status(500).json({ message: 'Error occurred while signing up user' });
    }
  }
}
