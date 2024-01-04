import { Request, Response } from 'express';
import { compareHash, hash } from './../utils/hash.utils.js';
import { userDaos } from './../daos/user.daos.js';
import bcrypt from 'bcrypt';
import { userInfos } from '../utils/user.utils.js';
import { jwtSign } from '../middlewares/jwt.middlewares.js';
import User from "../models/user.model.js";
import isPasswordValid from "../utils/password.utils.js"
import isEmailValid from "../utils/mail.utils.js";

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
 *         description: Compte créé avec succès
 *       '400':
 *         description: Erreur lors de l'inscription
 *       '401':
 *         description: Erreur lors de l'inscription
 */

// Inscription

const register = async (req: any, res: any) => {
    const { name, lastname, email, password } = req.body;
  
    // Verification mail / mot de passe correct
     
    const { valid, errors } = isPasswordValid(password);
    if (!valid) {
        return res.status(400).json({ message: "Le mot de passe ne répond pas aux critères de complexité", errors });
    }

    if (!isEmailValid(email)) {
        return res.status(400).json({ message: "Adresse e-mail invalide" });
    }

    const emailExists = await userDaos.findByEmail(email);

    if (emailExists.user) {
        return res.status(400).json({ message: "Adresse e-mail déjà utilisée" });
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
      return res.status(400).json({ message: "Erreur lors de l'inscription" });
    }
  
    const token = jwtSign(user.id);
  
    res.status(201).json({
      message: "Compte créé avec succès",
      user: userInfos(user),
      token: token,
    });
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
 *         description: Connexion réussie
 *       '400':
 *         description: Échec de l'authentification. Veuillez vérifier votre adresse e-mail et votre mot de passe.
 */

// Connexion

const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
  const errMsg = `Échec de l'authentification. Veuillez vérifier votre adresse e-mail et votre mot de passe.`;

  const { user, error } = await userDaos.findByEmail(email);
  if (!!error || !user) {
     res.status(400).json({ message: errMsg });
  }

  const { err, match } = await compareHash(password, user.password);
  if (!!err || !match)  res.status(400).json({ message: errMsg });

  const token = jwtSign(user.id);

   res
    .status(201)
    .json({ message: "Connexion réussie", user: userInfos(user), token: token });
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
 *         description: Vérification du jeton réussie
 *       '401':
 *         description: Erreur lors de la vérification du jeton réussie
 */

// Verification Token

const getUserbyToken = async (req: Request, res: Response): Promise<void> => {
  const token = req.body.token;
  const { user, error } = await userDaos.findByToken(token);
  if (user) {
    res.status(202).json({message: "Vérification du jeton réussie"});
  } else {
    res.status(401).json({message : "Erreur lors de la vérification du jeton réussie"});
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
 *         description: Compte utilisateur supprimé avec succès
 *       '401':
 *         description: Erreur lors de la suppression du compte utilisateur
 *       '500':
 *         description: Erreur lors de la suppression du compte utilisateur
 */


// Suppression compte

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
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
    console.error(
      "Erreur lors de la suppression du compte utilisateur :",
      error
    );
    res
      .status(500)
      .json({ error: "Erreur lors de la suppression du compte utilisateur" });
  }
};

export const userController = {
  register,
  login,
  getUserbyToken,
  deleteUser,
};
