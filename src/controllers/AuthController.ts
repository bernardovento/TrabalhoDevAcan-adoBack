import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { CheckUserPassword } from '../utils/HashPassword';
import { generateJwToken } from '../utils/JWT';

const prisma = new PrismaClient();

class AuthController {
    constructor() {}

    async signin(req: Request, res: Response) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    status: 400,
                    message: "Email e senha são obrigatórios.",
                });
            }

            const user = await prisma.user.findFirst({
                where: { email },
            });

            if (!user) {
                // Resposta genérica para evitar exposição
                return res.status(401).json({
                    status: 401,
                    message: "Credenciais inválidas.",
                });
            }

            const passwordCheck = await CheckUserPassword(password, user.password);

            if (!passwordCheck) {
                return res.status(401).json({
                    status: 401,
                    message: "Credenciais inválidas.",
                });
            }

            const token = await generateJwToken({ email: user.email });



            // Envia o token como resposta JSON
            return res.status(200).json({
                status: 200,
                message: "Login realizado com sucesso!",
                token, // Incluindo o token na resposta JSON
            });
        } catch (error) {
            console.error("Erro no signin:", error);
            return res.status(500).json({
                status: 500,
                message: "Erro interno no servidor.",
            });
        }
    }

    async signup(req: Request, res: Response) {
        try {
            const { email, password, name } = req.body;

            if (!email || !password || !name) {
                return res.status(400).json({
                    status: 400,
                    message: "Email, senha e nome são obrigatórios.",
                });
            }

            // Validação simples de e-mail
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                return res.status(400).json({
                    status: 400,
                    message: "Formato de email inválido.",
                });
            }

            // Verifica se o e-mail já está cadastrado
            const existingUser = await prisma.user.findFirst({
                where: { email },
            });

            if (existingUser) {
                return res.status(409).json({
                    status: 409,
                    message: "Email já está em uso.",
                });
            }

            // Hash da senha
            const hashedPassword = await bcrypt.hash(password, 10);

            // Criação do usuário
            const newUser = await prisma.user.create({
                data: {
                    email,
                    name,
                    password: hashedPassword,
                },
            });

            return res.status(201).json({
                status: 201,
                message: "Usuário criado com sucesso!",
                userId: newUser.id,
            });
        } catch (error) {
            console.error("Erro no signup:", error);
            return res.status(500).json({
                status: 500,
                message: "Erro interno no servidor.",
            });
        }
    }

    async signout(req: Request, res: Response) {
        try {
            // desisti de usar cookies
            // res.clearCookie('authToken');
            return res.status(200).json({
                status: 200,
                message: "Logout realizado com sucesso.",
            });
        } catch (error) {
            console.error("Erro no signout:", error);
            return res.status(500).json({
                status: 500,
                message: "Erro interno no servidor.",
            });
        }
    }
}

export default new AuthController();