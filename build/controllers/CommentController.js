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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const AiAnalisys_1 = __importDefault(require("../utils/AiAnalisys"));
const prisma = new client_1.PrismaClient();
class CommentController {
    constructor() { }
    listComments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const comments = yield prisma.comment.findMany();
                res.json(comments);
            }
            catch (error) {
                console.log(error);
                return res.status(500).json({
                    error: error
                });
            }
        });
    }
    createComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentData = req.body;
            try {
                const response = yield (0, AiAnalisys_1.default)(commentData.content).then();
                console.log(response);
                const evaluation = (JSON.parse(response));
                console.log(evaluation);
                const newComment = yield prisma.comment.create({
                    data: Object.assign(Object.assign({}, commentData), { evaluation: evaluation.classificação })
                });
                console.log("Comentário criado com sucesso");
                res.json({
                    status: 200,
                    newComment: newComment,
                });
            }
            catch (error) {
                console.log("Erro ao criar comentário");
                res.json({
                    status: 500,
                    message: error
                });
            }
        });
    }
    updateComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentData = req.body;
            const commentId = req.params.id;
            try {
                const newComment = yield prisma.comment.update({
                    where: {
                        id: parseInt(commentId),
                    },
                    data: commentData,
                });
                console.log("comentário atualizado com sucesso");
                res.json({
                    status: 200,
                    newComment: newComment
                });
            }
            catch (error) {
                console.log("Erro ao atualizar comentário");
                res.json({
                    status: 500,
                    message: error,
                });
                console.log(error);
            }
        });
    }
    deleteComment(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const commentID = req.params.id;
            try {
                const commentDeleted = yield prisma.comment.delete({
                    where: {
                        id: parseInt(commentID)
                    },
                });
                res.json({
                    status: 200,
                    commentDeleted: commentDeleted
                });
            }
            catch (error) {
                res.json({
                    status: 500,
                    message: error
                });
            }
        });
    }
}
exports.default = new CommentController;
