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
exports.UserController = void 0;
const data_source_1 = require("../data-source");
const Utilisateur_1 = require("../entities/Utilisateur");
class UserController {
    static getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userRepository = data_source_1.AppDataSource.getRepository(Utilisateur_1.Utilisateur);
            const users = yield userRepository.find();
            return res.status(200).json({
                data: users,
            });
        });
    }
    static getUserByEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Récupérer l'email à partir des paramètres de requête
                const email = req.params.email;
                // Récupérer le référentiel utilisateur
                const userRepository = data_source_1.AppDataSource.getRepository(Utilisateur_1.Utilisateur);
                // Rechercher l'utilisateur par son email
                const user = yield userRepository.findOne({ where: { email } });
                // Vérifier si l'utilisateur existe
                if (!user) {
                    return res.status(404).json({ message: 'Utilisateur non trouvé' });
                }
                // Retourner l'utilisateur trouvé
                return res.status(200).json(user);
            }
            catch (error) {
                console.error('Erreur lors de la récupération de l\'utilisateur par email :', error);
                return res.status(500).json({ message: 'Erreur lors de la récupération de l\'utilisateur' });
            }
        });
    }
    static loginUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, mot_de_passe } = req.body;
            try {
                const userRepository = data_source_1.AppDataSource.getRepository(Utilisateur_1.Utilisateur);
                const user = yield userRepository.findOne({ where: { email, mot_de_passe } });
                if (user) {
                    res.status(200).json({ user });
                }
                else {
                    res.status(401).json({ message: 'Invalid email or password' });
                }
            }
            catch (error) {
                console.error('Error occurred while logging in:', error);
                res.status(500).json({ message: 'Error occurred while logging in' });
            }
        });
    }
    static signUpUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, mot_de_passe } = req.body;
            try {
                const userRepository = data_source_1.AppDataSource.getRepository(Utilisateur_1.Utilisateur);
                // Check if user with the provided email already exists
                const existingUser = yield userRepository.findOne({ where: { email } });
                if (existingUser) {
                    return res.status(400).json({ message: 'User with this email already exists' });
                }
                // Create a new user
                const newUser = new Utilisateur_1.Utilisateur();
                newUser.email = email;
                newUser.mot_de_passe = mot_de_passe;
                // Save the new user to the database
                yield userRepository.save(newUser);
                // Return success response
                res.status(201).json({ message: 'User created successfully', user: newUser });
            }
            catch (error) {
                console.error('Error occurred while signing up user:', error);
                res.status(500).json({ message: 'Error occurred while signing up user' });
            }
        });
    }
}
exports.UserController = UserController;
