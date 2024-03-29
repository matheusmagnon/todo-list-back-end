# todo list back end(Aplicação para gestão de tarefas )

## Funcionalidades da aplicação

- Cadastrar tarefas
- Atualizar tarefas
- Marcar tarefa como concluída
- Excluir tarefas

## Tecnologias utilizadas

- Typescript
- Express
- Cors
- Eslint
- Prettier
- Mongodb

### Instalação

1. Clone o repositório

```bash
git clone https://github.com/matheusmagnon/todo-list-back-end.git
```

2. Acesse a pasta do projeto

```bash
cd todo-list-back-end
```

3. Instale as dependências necessárias

```bash
npm install
```

5. Para o mongo db utilizamos o `https://www.mongodb.com/atlas`, crie um arquivo .env na raiz do projeto com as variaveis de ambiente, por exemplo:

```
PORT=8000
MONGODB_URL=mongodb+srv://linkDB
MONGODB_USERNAME=userDB
MONGODB_PASSWORD=passwordDB
MONGODB_NAME=nameDB
```

4. Execute o projeto Backend

```bash
npm run start:dev
```
