"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const UserRoutes_1 = __importDefault(require("./routes/UserRoutes"));
const PostRoutes_1 = __importDefault(require("./routes/PostRoutes"));
const CommentRoutes_1 = __importDefault(require("./routes/CommentRoutes"));
const AuthRoutes_1 = __importDefault(require("./routes/AuthRoutes"));
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
app.use(express_1.default.json(), (0, cors_1.default)());
app.use(UserRoutes_1.default);
app.use(PostRoutes_1.default);
app.use(CommentRoutes_1.default);
app.use(AuthRoutes_1.default);
app.listen(3000, function () {
    console.log("Servidor rodando na porta 3000");
});
