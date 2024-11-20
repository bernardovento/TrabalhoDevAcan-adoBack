import {Request, Response} from 'express';
import { verifyJwToken } from '../utils/JWT';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();


class PostController{
    constructor(){}

    async listPosts(req: Request, res: Response){
        try{
            const posts = await prisma.post.findMany();
            res.json(posts)
        }catch(error){
            console.log(error);
            return res.status(500).json({
                error: error
            })
        }
    }

    // Criar um post para um usuário
    async createPost(req: Request, res: Response){
        const postData = req.body;
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
            const newToken = (req as any).newToken;
            const newPost = await prisma.post.create({
                data: {
                    ...postData,
                    authorId: userId?.id
                }
            })
            console.log("PostData:", postData);
            console.log("Post criado com sucesso");
            console.log("newToken:", newToken);
            res.json({
                status: 200,
                newPost: newPost,
                token: newToken
            })
        }catch(error){
            console.log(postData);
            res.json({
                status: 500,
                message: error
            })
        }
    }

    async updatePost(req: Request, res: Response){
        const postData = req.body;
        const postId = req.params.id;
        try{
            const newPost = await prisma.post.update({
                where: {
                id: parseInt(postId),
                },
                data: postData,
            });
            console.log(postData);
            console.log("Post atualizado com sucesso");
            res.json({
                status: 200,
                newPost: newPost
            })
        }catch(error){
            console.log(postData);
            res.json({
                status: 500,
                message: error,
            })
            console.log(error);
        }
    }

    async deletePost(req: Request, res: Response){
        const idPost = req.params.id;
        try{
        const postDeleted = await prisma.post.delete({
            where: {
                id: parseInt(idPost)
            }
        })
        res.json({
            status: 200,
            message: 'Deletado com sucesso'
        })
        }catch(error){
            res.json({                
                error: error,
            })
        }
    }
}

export default new PostController();