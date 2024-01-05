import { Router } from "express";
import { userController } from "../controllers/user.controllers.js";

const initUserRoutes = (app: any, sm: any, jwt: any) => {
  const router = Router();

  router.post("/register", sm, userController.register);
  router.post("/login", sm, userController.login);
  router.delete("/:id", jwt, userController.deleteUser);

  app.use("/users", router);
};

export default initUserRoutes;
