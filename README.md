# Projeto

Este projeto foi desenvolvido utilizando **Docker** e está configurado para ser executado com **Docker Compose**.

## Para executar o projeto

1. Execute o comando:
   ```bash
   docker-compose up --build
   ```
2. O serviço será inicializado na porta **3000**.
3. Usuário padrão criado para autenticação:
   - **Email**: `root@admin.com`
   - **Senha**: `123456`

## Endpoints

### **Autenticação**
#### Login
- **POST**: `http://localhost:3000/auth/login`

### **Usuários**
#### Criar Usuário
- **POST**: `http://localhost:3000/users`
- **Body** (JSON):
  ```json
  {
      "name": "teste",
      "email": "primeiro@teste.com",
      "password": "123456",
      "permissions": [1]
  }
  ```

#### Listar Usuários
- **GET**: `http://localhost:3000/users`

#### Excluir Usuário
- **DELETE**: `http://localhost:3000/users/{id}`
  - Exemplo: `http://localhost:3000/users/3`

#### Atualizar Usuário
- **PATCH**: `http://localhost:3000/users/{id}`
  - Exemplo: `http://localhost:3000/users/1`

### **Artigos**
#### Listar Artigos
- **GET**: `http://localhost:3000/articles`

#### Criar Artigo
- **POST**: `http://localhost:3000/articles`

#### Atualizar Artigo
- **PATCH**: `http://localhost:3000/articles/{id}`
  - Exemplo: `http://localhost:3000/articles/1`

#### Excluir Artigo
- **DELETE**: `http://localhost:3000/articles/{id}`
  - Exemplo: `http://localhost:3000/articles/3`

