# Trabalho de Programação Avançada para WEB


## Lista de comandos usados no projeto

- npm init -y: Cria um arquivo package.json com as configurações padrão.
- npm i typescript: Instala o TypeScript como dependência do projeto.
- npx tsc --init: Gera um arquivo tsconfig.json com a configuração do TypeScript.
- npm i ts-node: Instala o ts-node para rodar arquivos TypeScript diretamente.
- npx tsc: Compila os arquivos TypeScript para JavaScript usando o tsconfig.json.

# Código do tsconfig.json

```
{
  "compilerOptions": {
    "target": "es2016",
    "module": "commonjs",
    "rootDir": "./src",
    "outDir": "./build",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

## Scripts que estão sendo utilizados no package.json

- "build": "npx tsc"
- "dev": "npx ts-node ./src/server.ts"

## Configurando um servidor web

- npm install express
- npm i --save-dev @types/express

## Projeto para usar múltiplas versões do NodeJS na mesma máquina

- https://github.com/nvm-sh/nvm?tab=readme-ov-file#install--update-script

## Algumas extensões do VSCode recomendadas

```
{
    "recommendations": [
        "vscode-icons-team.vscode-icons",
        "esbenp.prettier-vscode",
        "prisma.prisma",
        "Prisma.prisma-insider"
    ]
}
```

## Instalando o ts-node-dev

O ts-node-dev nos ajuda a ter mais produtividade uma vez que ele reinicializar o servidor automaticamente a medida que salvamos o projeto.

- npm i ts-node-dev --save-dev

Depois de instalado, basta atualizar o script (dentro de package.json) de execução do projeto para:

```
  "dev": "npx ts-node-dev ./src/server.ts"
```

## Configurando o Prisma ORM

- https://www.prisma.io/docs/getting-started/quickstart

Vamos configurar o Prisma ORM com o seguinte schema de dados

```
model User {
  id       Int       @id @default(autoincrement())
  email    String    @unique
  name     String?
  posts    Post[]
  password String    @default("123456")
  comments Comment[]
}

model Post {
  id        Int       @id @default(autoincrement())
  title     String
  content   String?
  published Boolean   @default(false)
  author    User      @relation(fields: [authorId], references: [id])
  authorId  Int
  comments  Comment[]
}

model Comment {
  id        Int     @id @default(autoincrement())
  title     String
  content   String
  evaluation String?
  published Boolean @default(false)
  author    User    @relation(fields: [authorId], references: [id])
  authorId  Int
  post      Post    @relation(fields: [postId], references: [id])
  postId    Int
}
```


## Como usamos o Cors?

```
const allowedOrigins = ['http://localhost:8081']; // Serve para definir qual servidor pode acessar nossa API

app.use(cors({
  origin: (origin, callback) => {
    // Verifica se a origem da requisição está na lista de origens permitidas
    if (!origin || allowedOrigins.includes(origin)) { // Checa se é um servidor permitido
      callback(null, true);
    } else {
      callback(new Error('Não permitido por CORS'));
    }
  },
  credentials: true // Se precisar enviar cookies ou cabeçalhos de autenticação
}));

```


## Rotas

Nós possuimos as rotas:
### AuthRoutes:
```ts
// Tentar login
AuthRouter.post("/auth/signin", AuthController.signin);

// Tentar cadastro
AuthRouter.post("/auth/signup", AuthController.signup);

// Sair da conta
AuthRouter.post(
```
### CommentRoutes:

```ts
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
```
### PostRoutes:
```ts
//Listar posts
postRouter.get("/posts", postController.listPosts);

//Inserir posts
postRouter.post("/post", UserMiddleware.analyzeToken, postController.createPost);

//Atualizar posts
postRouter.put("/post/:id", postController.updatePost);

//Deletar posts
postRouter.delete("/post/:id", postController.deletePost);
```

### UserRoutes:
```ts
//Listar usuários
UserRouter.get("/users",/*UserMiddleWare.analisyToken*/UserController.listUser);

//Inserir usuários
UserRouter.post("/user", UserController.createUser);

//Atualizar usuários
UserRouter.put("/user/:id", UserController.updateUser);

//Deletar usuários
UserRouter.delete("/user/:id", UserController.deleteUser);
```

### Quais nossa Front realmente usa?

```
// Tentar login: Ela usa para que o usuário realize o logine  receba o token de autenticação.
AuthRouter.post("/auth/signin", AuthController.signin);

// Tentar cadastro: Ela permite que qualquer um com um email válido crie uma conta no nosso servidor.
AuthRouter.post("/auth/signup", AuthController.signup);

//Listar comentarios válidos: Ela lista para nosso usuário os comentários que nossa API permitiu.
CommentRouter.get("/comments", CommentController.listComments);

//Inserir comentarios: Permite que o nosso usuário comente em algum post.
 CommentRouter.post("/comment", UserMiddleware.analyzeToken, CommentController.createComment);

//Listar posts: Ela lista para nosso usuário os posts já publicados.
postRouter.get("/posts", postController.listPosts);

//Inserir posts: ELa permite que nosso usuário publique um post.
postRouter.post("/post", UserMiddleware.analyzeToken, postController.createPost);

```
