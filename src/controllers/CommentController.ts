import {Request, Response} from 'express';

import { PrismaClient } from '@prisma/client';
import AiConversation from '../utils/AiAnalisys';
import { verifyJwToken } from '../utils/JWT';

const prisma = new PrismaClient();

class CommentController{
    constructor(){}
    async listComments(req: Request, res: Response){
        try{
            const validcomments = await prisma.comment.findMany({
                where: {
                    evaluation: 'não ofensiva'
                },
            });
            res.json(validcomments)
        }catch(error){
            console.log(error);
            return res.status(500).json({
                error: error
            })
        }
    }
    async listAllComments(req: Request, res: Response){
        try{
            const comments = await prisma.comment.findMany();
            res.json(comments)
        }catch(error){
            console.log(error);
            return res.status(500).json({
                error: error
            })
        }
    }
    async createComment(req: Request, res: Response){  
        console.log("Autorização:")      
        console.log(req.headers['authorization']);
        const commentData = req.body;  
        console.log("Conteudo:")      
        console.log(commentData)      
      
        try{              
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
            const user = await verifyJwToken(token);  
            const userId = await prisma.user.findUnique({
                where: {
                  email: user.email,
                },
                });
            const response = await AiConversation(commentData.content).then();
            const evaluation = (JSON.parse(response))
            const newToken = (req as any).newToken;
            console.log(newToken);
            const newComment = await prisma.comment.create({
                data: {
                    ...commentData,
                    evaluation: evaluation.classificação,
                    authorId: userId?.id,
                    title: " "
                }
            })
            console.log("Comentário criado com sucesso");
            res.json({
                status: 200,
                newComment: newComment,
                token: newToken
                })
        }catch(error){
            console.log("Erro ao criar comentário");
            res.json({
                status: 500,
                message: error
            })
        }    
    }
    async updateComment(req: Request, res: Response){
        const commentData = req.body;
        const commentId = req.params.id;
        try{
            const newComment = await prisma.comment.update({
                where: {
                    id: parseInt(commentId),
                },
                data: commentData,
            });
            console.log("comentário atualizado com sucesso");
            res.json({
                status: 200,
                newComment: newComment
            })
        }catch(error){
            console.log("Erro ao atualizar comentário");
            res.json({
                status: 500,
                message: error,
            })
            console.log(error);
        }
    }
    async deleteComment(req: Request, res: Response){
        const commentID = req.params.id;
        try{
            const commentDeleted = await prisma.comment.delete({
                where: {
                    id: parseInt(commentID)
                },
            })
            res.json({
                status: 200,
                commentDeleted: commentDeleted
            })
        }catch(error){
            res.json({
                status: 500,
                message: error
            })
        }
    }
}

export default new CommentController;