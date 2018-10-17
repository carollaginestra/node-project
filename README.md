# Trabalho de node js

## Installation

Install/update packages
```sh
$ npm install
$ npm start
```

|Método|URL|Descrição|
|-|-|-|
POST|http://localhost:3001/api/usuarios|Cadastro de usuários|
POST|http://localhost:3001/api/usuarios/login|Login de usuários|
GET|http://localhost:3001/api/usuarios/1|Consulta de usuário por ID|
PUT|http://localhost:3001/api/usuarios/1|Edição de usuários|
POST|http://localhost:3001/api/tarefas|Cadastro de tarefas|
GET|http://localhost:3001/api/tarefas|Listagem de tarefas|
GET|http://localhost:3001/api/tarefas/1|Consulta de tarefa por ID|
PUT|http://localhost:3001/api/tarefas/1|Edição de tarefas|
DEL|http://localhost:3001/api/tarefas/1|Exclusão de tarefas|
PUT|http://localhost:3001/api/tarefas/1/concluida|Marcar tarefa como Concluída|
DEL|http://localhost:3001/api/tarefas/1/concluida|Desmarcar tarefa como Concluída|