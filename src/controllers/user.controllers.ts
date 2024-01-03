import { Request, Response } from 'express';
import { compareHash, hash } from './../utils/hash.utils.js';
import { userDaos } from './../daos/user.daos.js';
import bcrypt from 'bcrypt';
import { userInfos } from '../utils/user.utils.js';
import { jwtSign } from '../middlewares/jwt.middlewares.js';
import User from "../models/user.model.js";
import isPasswordValid from "../utils/password.utils.js"
import isEmailValid from "../utils/mail.utils.js";

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

// Verification Token

const getUserbyToken = async (req: Request, res: Response): Promise<void> => {
  const token = req.body.token;
  const { user, error } = await userDaos.findByToken(token);
  if (user) {
    res.status(202).json({});
  } else {
    res.status(401).json({});
  }
};

// Suppression compte

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.body.userId;
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
