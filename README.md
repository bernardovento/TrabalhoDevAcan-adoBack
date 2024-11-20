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
