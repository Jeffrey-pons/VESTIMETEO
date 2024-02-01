import { Request, Response} from 'express';
import { compareHash } from './../utils/hash.utils.js';
import { userDaos } from './../daos/user.daos.js';
import bcrypt from 'bcrypt';
import { userInfos } from '../utils/user.utils.js';
import { jwtSign } from '../middlewares/jwt.middlewares.js';
import User, { IUser } from "../models/user.model.js";
import isPasswordValid from "../utils/password.utils.js"
import isEmailValid from "../utils/mail.utils.js";
import { getWeatherAdvice } from '../clients/weather.clients.js';
import { ManagementError } from '../utils/managementError.utils.js';

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Operations related to user management
 */

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       description: User registration data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Compte créé avec succès.
 *       '400':
 *         description: Vos informations sont incorrectes.
 *       '401':
 *         description: Vos informations sont incomplètes.
 */
// Inscription
const register = async (req: Request, res: Response) => {
  try {
    const { name, lastname, email, password } = req.body;
  
    const { valid } = isPasswordValid(password);
    if (!valid) {
        throw new ManagementError(400, "Le mot de passe ne répond pas aux critères de complexité");
    }

    if (!isEmailValid(email)) {
        throw new ManagementError(400, "Adresse e-mail invalide");
    }

    const emailExists = await userDaos.findByEmail(email);

    if (emailExists.user) {
        throw new ManagementError(400, "Adresse e-mail déjà utilisée");
    }
  
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);
  
    const { user, error } = await userDaos.register(
      name,
      lastname,
      email,
      passwordHash
    );
  
    if (!!error || !user) {
      throw new ManagementError(400, "Erreur lors de l'inscription");
    }
  
    const token = jwtSign(user.id);
  
    res.status(201).json({
      message: "Compte créé avec succès",
      user: userInfos(user),
      token: token,
    });
  } catch (error) {
    console.error(error);
    throw new ManagementError(400, "Erreur lors de l'inscription");
  }
};

  /**                                     
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in a user
 *     tags: [Users]
 *     requestBody:
 *       description: User login data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Connexion réussie.
 *       '400':
 *         description: Échec de l'authentification. Veuillez vérifier votre adresse e-mail et votre mot de passe.
 */
// Connexion
const login = async (req: Request, res: Response): Promise<void> => {
try {
  const { email, password } = req.body;

  const { user, error } = await userDaos.findByEmail(email);
  if (!!error || !user) {
     throw new ManagementError(400, `Échec de l'authentification. Veuillez vérifier votre adresse e-mail et votre mot de passe.`);
  }

  const { err, match } = await compareHash(password, user.password);
  if (!!err || !match) {
    throw new ManagementError(400, `Échec de l'authentification. Veuillez vérifier votre adresse e-mail et votre mot de passe.`);
  } else {
    const token = jwtSign(user.id);

    res.status(201).json({ message: "Connexion réussie", user: userInfos(user), token: token });
  }
} catch (error) {
  throw new ManagementError(500, `Erreur lors de la connexion`);
}
  
};

/**
 * @swagger
 * /users/{userId}:
 *   get:
 *     summary: Get user information by user ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to retrieve information for
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Informations utilisateur récupérées avec succès.
 *       '404':
 *         description: Utilisateur introuvable.
 *       '500':
 *         description: Erreur technique sur notre serveur. Veuillez réessayer plus tard.
 */
// Récupération des infos utilisateur
const getUserInfos = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);

    if (!user) {
      throw new ManagementError(404, 'Utilisateur introuvable');
    }

    res.status(200).json({
      name: user.name,
      lastname: user.lastname,
      mail: user.email,
      lastLoginDate: user.lastLoginDate,
    });
  } catch (error) {
    throw new ManagementError(500, "Erreur lors de la récupération des informations utilisateur" );
  }
};

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     summary: Update user information by user ID
 *     tags: [Users]
 *     security:
 *       - apiKey: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to update information for
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated user information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               lastname:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Informations utilisateur mises à jour avec succès.
 *       '401':
 *         description: Erreur lors de la mise à jour des informations utilisateur.
 *       '404':
 *         description: Utilisateur introuvable.
 *       '500':
 *         description: Erreur technique sur notre serveur. Veuillez réessayer plus tard.
 */
//Modification des infos utilisateur
const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;
    const { name, lastname, email, password } = req.body;

    await User.findByIdAndUpdate(userId, { name, lastname, email, password });

    res.status(200).json({ message: "Informations utilisateur mises à jour avec succès" });
  } catch (error) {
    throw new ManagementError(500, "Erreur lors de la mise à jour des informations utilisateur");
  }
};

/**
 * @swagger
 * /users/token:
 *   get:
 *     summary: Verify user by token
 *     tags: [Users]
 *     requestBody:
 *       description: User token data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *     responses:
 *       '202':
 *         description: Vérification du jeton réussie.
 *       '401':
 *         description: Erreur lors de la vérification du jeton réussie.
 */
// Verification Token
const getUserbyToken = async (req: Request, res: Response): Promise<void> => {
  try {
  const token = req.body.token;
  const { user} = await userDaos.findByToken(token);
  if (user) {
    res.status(202).json({message: "Vérification du jeton réussie"});
  } else {
    throw new ManagementError(401, "Erreur lors de la vérification du jeton réussie");
  }
 } catch (error) {
  throw new ManagementError(500, "Erreur lors de la vérification du jeton")
 }
};

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Delete a user account
 *     tags: [Users]
 *     security:
 *       - apiKey: []
 *     responses:
 *       '200':
 *         description: Compte utilisateur supprimé avec succès.
 *       '401':
 *         description: Erreur lors de la suppression du compte utilisateur.
 *       '404':
 *         description: Utilisateur introuvable.
 *       '500':
 *         description: Erreur technique sur notre serveur. Veuillez réessayer plus tard.
 */
// Suppression compte utilisateur
const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.id;
    console.log(req.params)
    console.log(userId)
    await User.findByIdAndDelete(userId);
    res.clearCookie("token");
    res
      .status(200)
      .json({ message: "Compte utilisateur supprimé avec succès" });
  } catch (error) {
    throw new ManagementError(500, "Erreur lors de la suppression du compte utilisateur");
  }
};

// Ajout d'une ville au favoris
/**
 * @swagger
 * /users/favorites/{userId}:
 *   post:
 *     summary: Add a city to user's favorites
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to add a city to favorites
 *         schema:
 *           type: string
 *     requestBody:
 *       description: City to be added to favorites
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               favoritesCity:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Ville ajoutée aux favoris avec succès.
 *         content:
 *           application/json:
 *             example:
 *               message: 'Ville ajoutée aux favoris avec succès'
 *       '404':
 *         description: Utilisateur introuvable.
 *       '500':
 *         description: Erreur lors de l'ajout de la ville aux favoris.
 */
const addFavoritesCities = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { favoritesCity } = req.body;

    const user: IUser | null = await User.findById(userId);
    if (!user) {
      throw new ManagementError(404, 'Utilisateur introuvable' );
    }

    await user.addFavoriteCity(favoritesCity);

    res.status(200).json({ message: `Ville ${favoritesCity} ajoutée aux favoris avec succès` });
  } catch (error) {
    throw new ManagementError(500, "Erreur lors de l'ajout de la ville aux favoris" );
  }
};

// Suppression d'une ville au favoris
/**
 * @swagger
 * /users/favorites/{userId}:
 *   delete:
 *     summary: Delete a city to user's favorites
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to deleted a city to favorites
 *         schema:
 *           type: string
 *       - in: body
 *         name: favoritesToDelete
 *         required: true
 *         description: Tableau des favoris à supprimer
 *         schema:
 *           type: object
 *           properties:
 *             favoritesToDelete:
 *               type: array
 *               items:
 *                 type: string
 *         example:
 *           favoritesToDelete: ["Lyon", "Bordeaux"]
 *     responses:
 *       '200':
 *         description: Favoris supprimés avec succès.
 *       '404':
 *         description: Utilisateur introuvable.
 *       '500':
 *         description: Erreur technique sur notre serveur. Veuillez réessayer plus tard.
 */
const deleteFavoritesCities = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { favoritesToDelete } = req.body;

    const user: IUser | null = await User.findById(userId);
    if (!user) {
      throw new ManagementError(404, 'Utilisateur introuvable' );
    }

    user.favoritesCity = user.favoritesCity.filter((fav: string) => !favoritesToDelete.includes(fav));
    await user.save();

    res.status(200).json({ message: 'Favoris supprimés avec succès' });
  } catch (error) {
    throw new ManagementError(500, "Erreur lors de la suppression des favoris" );
  }
};

// Afficher les favoris d'un utilisateur
/**
 * @swagger
 * /users/favorites/{userId}:
 *   get:
 *     summary: Get user's favorite cities and temperatures
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID de l'utilisateur pour lequel récupérer les villes favorites
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Villes favorites et températures récupérées avec succès.
 *       '404':
 *         description: Utilisateur introuvable.
 *       '500':
 *         description: Erreur technique sur notre serveur. Veuillez réessayer plus tard.
 */
export const getFavoritesCities = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);
    if (!user) {
      throw new ManagementError(404, 'Utilisateur introuvable' );
    }

    const favoriteCities = user.favoritesCity;
    const temperatures = [];

    for (const city of favoriteCities) {
      const weatherInfo = await getWeatherAdvice(city);

      if ('error' in weatherInfo) {
        throw new ManagementError(500, `Erreur lors de la récupération des informations météorologiques pour ${city}: ${weatherInfo.error}`);
      } else {
        temperatures.push({
          city,
          temperature: weatherInfo.temperature,
          feelsLike: weatherInfo.feelsLike,
          weatherCondition: weatherInfo.weatherCondition,
          weatherConditionDescription: weatherInfo.weatherConditionDescription,
          temperatureAdvice: weatherInfo.temperatureAdvice,
          weatherConditionAdvice: weatherInfo.weatherConditionAdvice
        });
      }
    }

    res.status(200).json(temperatures);
  } catch (error) {
    throw new ManagementError(500, "Erreur lors de la récupération des villes favorites et des températures" );
  }
};

/**
 * @swagger
 * /users/history/{userId}:
 *   get:
 *     summary: Get user advice history by user ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to retrieve advice history for
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Historique des conseils utilisateur récupéré avec succès.
 *       '404':
 *         description: Utilisateur introuvable.
 *       '500':
 *         description: Erreur technique sur notre serveur. Veuillez réessayer plus tard.
 */
// Bug
const getUserHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      throw new ManagementError(404, 'Utilisateur introuvable' );
    }
    const adviceHistory = user.weatherHistory;

    // Répondez avec l'historique des conseils
    res.status(200).json(adviceHistory);
  } catch (error) {
    throw new ManagementError(500, "Erreur lors de la récupération de l'historique des conseils utilisateur" );
  }
};

export const userController = {
  register,
  login,
  getUserInfos,
  updateUser,
  getUserbyToken,
  deleteUser,
  addFavoritesCities,
  deleteFavoritesCities,
  getFavoritesCities,
  getUserHistory
};
