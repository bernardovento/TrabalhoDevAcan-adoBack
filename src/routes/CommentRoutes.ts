import { Router } from "express";
import UserMiddleware from "../middlewares/UserMiddleWare";
import CommentController from "../controllers/CommentController";

const CommentRouter = Router();


//Listar comentarios válidos
CommentRouter.get("/comments", CommentController.listComments);

//Listar todos comentrrios
CommentRouter.get("/all/comments", CommentController.listAllComments);

//Inserir comentarios
 CommentRouter.post("/comment", UserMiddleware.analyzeToken, CommentController.createComment);

// Atualizar comentarios
 CommentRouter.put("/comment/:id", CommentController.updateComment);

// Deletar comentarios
 CommentRouter.delete("/comment/:id", CommentController.deleteComment);


export default CommentRouter;