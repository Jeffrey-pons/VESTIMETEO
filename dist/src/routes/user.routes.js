import { Router } from "express";
import { userController } from "../controllers/user.controllers.js";
import { verifyToken } from "../middlewares/jwt.middlewares.js";
const initUserRoutes = (app, jwt = verifyToken) => {
    const router = Router();
    router.post("/register", userController.register);
    router.post("/login", userController.login);
    router.get("/infos/:id", jwt, userController.getUserInfos);
    router.put("/:id", jwt, userController.updateUser);
    router.delete("/:id", jwt, userController.deleteUser);
    router.post("/favorites/:id", jwt, userController.addFavoritesCities);
    router.get('/favorites/:id', userController.getFavoritesCities);
    router.delete('/favorites/:id', jwt, userController.deleteFavoritesCities);
    router.get("/history/:id", jwt, userController.getUserHistory);
    app.use("/users", router);
};
export default initUserRoutes;
