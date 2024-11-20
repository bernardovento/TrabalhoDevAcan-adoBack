import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import UserRouter from "./routes/UserRoutes";
import PostRouter from "./routes/PostRoutes";
import CommentRouter from "./routes/CommentRoutes";
import AuthRoutes from "./routes/AuthRoutes";

const prisma = new PrismaClient();
const app = express();

const allowedOrigins = ['http://localhost:8081'];

app.use(cors({
  origin: (origin, callback) => {
    // Verifica se a origem da requisição está na lista de origens permitidas
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Não permitido por CORS'));
    }
  },
  credentials: true // Se precisar enviar cookies ou cabeçalhos de autenticação
}));

app.use(express.json());

app.use(UserRouter);
app.use(PostRouter);
app.use(CommentRouter);
app.use(AuthRoutes);

app.listen(process.env.PORT ? Number(process.env.PORT) : 3000, function () {
  console.log("Servidor rodando na porta " + (process.env.PORT ? Number(process.env.PORT) : 3000));
});
