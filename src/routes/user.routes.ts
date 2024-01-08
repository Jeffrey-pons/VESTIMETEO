import { Router } from "express";
import { userController } from "../controllers/user.controllers.js";

const initUserRoutes = (app: any, sm: any, jwt: any) => {
  const router = Router();
  router.post("/register", sm, userController.register);
  router.post("/login", sm, userController.login);
  router.get("/infos/:id", jwt, userController.getUserInfos);
  router.put("/:id", jwt, userController.updateUser);
  router.delete("/:id", jwt, userController.deleteUser);
  router.get("/history/:id", jwt, userController.getUserHistory);
  router.post("/favorites/:id", jwt, userController.addFavoritesCities);
  router.get('/favorites/:id', userController.getFavoritesCities);
  router.delete('/favorites/:id', jwt, userController.deleteFavoritesCities);
 

  app.use("/users", router);
};

export default initUserRoutes;
