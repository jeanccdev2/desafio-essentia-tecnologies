# Desafio Essentia

Este é um projeto fullstack desenvolvido como parte do desafio técnico da Essentia Technologies. O projeto consiste em uma aplicação web que permite gerenciar tarefas, com autenticação de usuários e um controle de status para as tarefas.

## Tecnologias utilizadas

- Backend: Node.js, Express, Sequelize, MySQL
- Frontend: Angular, TypeScript, HTML, CSS

## Como executar o projeto

Pode-se executar o projeto manualmente, iniciando o backend e o frontend separadamente, ou utilizando o Docker. Para ambos os casos, siga as instruções abaixo, é necessário preencher o .env conforme o exemplo fornecido no arquivo .env.example.

### Docker

```bash
docker-compose up -d --build
```

A partir desse comando, o projeto estará disponível em `http://localhost:8080`, backend em `http://localhost:${PORT}` e banco de dados em `http://localhost:3306`.

### Manual

Na pasta `server`, preencha o arquivo `.env` conforme o exemplo fornecido no arquivo `.env.example` e execute os seguintes comandos:

```bash
npm install
npm run dev
```

Na pasta `web` execute os seguintes comandos:

```bash
npm install
npm start
```

O projeto estará disponível em `http://localhost:4200`.

## Funcionalidades

- Login e cadastro de usuários
- Criação, edição e exclusão de tarefas
- Alteração de status das tarefas (pendente, em andamento, concluída)
- Filtro de tarefas por status pelos botões superior
- Filtro de tarefas por título e descrição
- Paginação das tarefas
- Visualização de detalhes da tarefa, clicando no card
