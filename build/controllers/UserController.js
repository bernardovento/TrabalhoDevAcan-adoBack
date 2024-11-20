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
const client_1 = require("@prisma/client");
const HashPassword_1 = require("../utils/HashPassword");
const prisma = new client_1.PrismaClient();
class UserController {
    constructor() {
    }
    listUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield prisma.user.findMany();
                res.json(users);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    error: error
                });
            }
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userdata = req.body;
                if (!userdata.email && !userdata.password) {
                    return res.status(400).json({
                        status: 400,
                        message: "Você precisa passar o email e a senha no corpo da requisição",
                    });
                }
                userdata.password = yield (0, HashPassword_1.CreateHashPassword)(userdata.password);
                console.log(userdata.password);
                console.log(userdata);
                const newuser = yield prisma.user.create({
                    data: userdata,
                });
                console.log(newuser);
                res.json({
                    status: 200,
                    newuser: newuser,
                });
            }
            catch (error) {
                console.log(error);
                res.json({
                    status: 500,
                    message: error,
                });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                const body = req.body;
                const updatedUser = yield prisma.user.update({
                    where: {
                        id: parseInt(id),
                    },
                    data: body,
                });
                if (updatedUser) {
                    return res.json({
                        status: 200,
                        updatedUser: updatedUser,
                    });
                }
            }
            catch (error) {
                console.log(error);
                res.json({
                    status: 500,
                    message: error,
                });
            }
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const id = req.params.id;
                yield prisma.user.delete({
                    where: {
                        id: parseInt(id),
                    },
                });
                res.status(200).json({
                    status: 200,
                    message: "Usuário deletado com sucesso",
                });
            }
            catch (error) {
                console.log(error);
                res.status(400).json({
                    message: "Falha ao deletar o registro",
                });
            }
        });
    }
}
exports.default = new UserController();
