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
const prisma = new client_1.PrismaClient();
class PostController {
    constructor() { }
    listPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const posts = yield prisma.post.findMany();
                res.json(posts);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    error: error
                });
            }
        });
    }
    // Criar um post para um usuário
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const postData = req.body;
            try {
                const newPost = yield prisma.post.create({
                    data: postData
                });
                console.log(postData);
                console.log("Post criado com sucesso");
                res.json({
                    status: 200,
                    newPost: newPost
                });
            }
            catch (error) {
                console.log(postData);
                res.json({
                    status: 500,
                    message: error
                });
            }
        });
    }
    updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const postData = req.body;
            const postId = req.params.id;
            try {
                const newPost = yield prisma.post.update({
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
                });
            }
            catch (error) {
                console.log(postData);
                res.json({
                    status: 500,
                    message: error,
                });
                console.log(error);
            }
        });
    }
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const idPost = req.params.id;
            try {
                const postDeleted = yield prisma.post.delete({
                    where: {
                        id: parseInt(idPost)
                    }
                });
                res.json({
                    status: 200,
                    message: 'Deletado com sucesso'
                });
            }
            catch (error) {
                res.json({
                    error: error,
                });
            }
        });
    }
}
exports.default = new PostController();
