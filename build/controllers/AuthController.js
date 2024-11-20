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
const JWT_1 = require("../utils/JWT");
const prisma = new client_1.PrismaClient();
class AuthController {
    constructor() { }
    signin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Chegou");
            try {
                const { email, password } = req.body;
                console.log("email:", email);
                console.log("password:", password);
                if (!email || !password) {
                    return res.json({
                        status: 400,
                        message: "Não contém o email ou senha no body"
                    });
                }
                const user = yield prisma.user.findFirst({
                    where: {
                        email
                    },
                });
                if (!user) {
                    return res.json({
                        status: 500,
                        message: "Email não encontrado"
                    });
                }
                const passwordCheck = yield (0, HashPassword_1.CheckUserPassword)(password, user.password);
                if (!passwordCheck) {
                    return res.json({
                        status: 401,
                        message: "Usuário ou senha inválidos!"
                    });
                }
                return res.json({
                    status: 200,
                    message: "logado com sucesso!",
                    token: yield (0, JWT_1.generateJwToken)(req.body)
                });
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    error: error
                });
            }
        });
    }
    signup() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    signout() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = new AuthController;
