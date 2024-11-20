"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const PostController_1 = __importDefault(require("../controllers/PostController"));
const postRouter = (0, express_1.Router)();
//Listar posts
postRouter.get("/posts", PostController_1.default.listPosts);
//Inserir posts
postRouter.post("/post", PostController_1.default.createPost);
//Atualizar posts
postRouter.put("/post/:id", PostController_1.default.updatePost);
//Deletar posts
postRouter.delete("/post/:id", PostController_1.default.deletePost);
exports.default = postRouter;
