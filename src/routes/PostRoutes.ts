import { Router } from "express";
import postController from "../controllers/PostController";
import UserMiddleware from "../middlewares/UserMiddleWare";


const postRouter = Router();

//Listar posts
postRouter.get("/posts", postController.listPosts);

//Inserir posts
postRouter.post("/post", UserMiddleware.analyzeToken, postController.createPost);

//Atualizar posts
postRouter.put("/post/:id", postController.updatePost);

//Deletar posts
postRouter.delete("/post/:id", postController.deletePost);

export default postRouter;