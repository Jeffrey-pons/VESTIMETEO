import { Router } from "express";
import { userController } from "../controllers/user.controllers.js";

const initUserRoutes = (app: any, sm: any, jwt: any) => {
  const router = Router();
  
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
   *               username:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       '200':
   *         description: Compte créé avec succès
   *       '400':
   *         description: Erreur lors de l'inscription
   */
  router.post("/register", sm, userController.register);

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
   *               username:
   *                 type: string
   *               password:
   *                 type: string
   *     responses:
   *       '200':
   *         description: Connexion réussie
   *       '401':
   *         description: Échec de l'authentification. Veuillez vérifier votre adresse e-mail et votre mot de passe.
   */
  router.post("/login", sm, userController.login);

/**
 * @swagger
 * /users/{userId}:
 *   delete:
 *     summary: Delete a user
 *     tags: 
 *      -Users
 *     parameters:
 *       - in: path
 *         name: id
 *     security:
 *       - apiKey: []
 *     responses:
 *       '200':
 *         description: Compte utilisateur supprimé avec succès
 *       '401':
 *         description: Erreur lors de la suppression du compte utilisateur
 */
  router.delete("/:id", jwt, userController.deleteUser);

  app.use("/users", router);
};

export default initUserRoutes;
