"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("../controllers/UserController"));
const UserRouter = (0, express_1.Router)();
//Listar usuários
UserRouter.get("/users", /*UserMiddleWare.analisyToken*/ UserController_1.default.listUser);
//Inserir usuários
UserRouter.post("/user", UserController_1.default.createUser);
//Atualizar usuários
UserRouter.put("/user/:id", UserController_1.default.updateUser);
//Deletar usuários
UserRouter.delete("/user/:id", UserController_1.default.deleteUser);
exports.default = UserRouter;
