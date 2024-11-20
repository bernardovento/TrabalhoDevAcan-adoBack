import { Router } from "express";
import UserMiddleware from "../middlewares/UserMiddleWare";
import AuthController from "../controllers/AuthController";

const AuthRouter = Router();

// Tentar login
AuthRouter.post("/auth/signin", AuthController.signin);

// Tentar cadastro
AuthRouter.post("/auth/signup", AuthController.signup);

// Sair da conta
AuthRouter.post(
    "/auth/signout",
    UserMiddleware.analyzeToken, // Middleware para verificar o token
    AuthController.signout
);

export default AuthRouter;