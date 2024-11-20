import { Request, Response, NextFunction } from 'express';
import { verifyJwToken, generateJwToken } from '../utils/JWT';

// Lista de tokens revogados (para demonstração, usando memória)
const revokedTokens = new Set<string>();

// Estenda o objeto Request para incluir `newToken`
interface CustomRequest extends Request {
    newToken?: string;
}

class UserMiddleware {
    constructor() {}

    async analyzeToken(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            // Obtém o token do cabeçalho Authorization
            const authHeader = req.headers['authorization'];
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                return res.status(401).json({
                    message: "Token não fornecido ou formato inválido",
                });
            }

            const token = authHeader.split(' ')[1]; // Remove "Bearer " do início
            if (!token) {
                return res.status(401).json({
                    message: "Token ausente",
                });
            }

            // Verifica se o token já foi revogado
            if (revokedTokens.has(token)) {
                return res.status(401).json({
                    message: "Token já foi revogado",
                });
            }

            // Valida o token
            const user = await verifyJwToken(token);
            console.log("User:");
            console.log(user);

            // Gera um novo token
            const newToken = await generateJwToken({ email: user.email });

            // Salva o novo token na propriedade `newToken` do objeto Request
            req.newToken = newToken;

            // Revoga o token atual adicionando-o à blacklist
            revokedTokens.add(token);
            console.log(`Token revogado: ${token}`);

            // Remove o token da blacklist após 10 minutos (600.000ms)
            setTimeout(() => {
                revokedTokens.delete(token);
                console.log(`Token removido da blacklist: ${token}`);
            }, 600000);

            // Passa para o próximo middleware
            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Erro interno no servidor" });
        }
    }
}

export default new UserMiddleware();
