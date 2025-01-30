# TOUGHTS

Este projeto é uma aplicação web para criar, visualizar e gerenciar pensamentos. A aplicação permite que os usuários registrem seus pensamentos e vejam os pensamentos de outros usuários, com a data e hora de criação formatadas de maneira amigável.

## Funcionalidades

- Criar novos pensamentos
- Visualizar pensamentos
- Exibir data e hora de criação dos pensamentos no formato "Segunda, 27/01/2025 às 12:30"
- Editar e remover pensamentos
- Autenticação de usuários

## Tecnologias Utilizadas

- Node.js
- Express
- Sequelize (ORM)
- Handlebars (Template Engine)
- Express-Session (Gerenciamento de Sessão)
- Connect-Flash (Mensagens Flash)
- Bootstrap (Estilização)

## Estrutura do Projeto

TOUGHTS/
├── controllers/
│   ├── ToughtController.js
│   └── UserController.js
├── db/
│   └── conn.js
├── models/
│   ├── Tought.js
│   └── User.js
├── public/
│   └── css/
│       └── styles.css
├── routes/
│   ├── authRoutes.js
│   └── toughtsRoutes.js
├── views/
│   ├── layouts/
│   │   └── main.handlebars
│   ├── toughts/
│   │   ├── add.handlebars
│   │   ├── dashboard.handlebars
│   │   ├── edit.handlebars
│   │   └── home.handlebars
│   └── auth/
│       ├── login.handlebars
│       └── register.handlebars
├── .gitignore
├── index.js
└── package.json

## Configuração do Projeto

### 1. Clonar o Repositório

```sh
git clone https://github.com/erkzz1/TOUGHTS.git
cd 11_TOUGHTS
```
### 2. Instalar Dependências

```sh
npm install
```

### 3. Configurar Banco de Dados

Edite o arquivo `db/conn.js` com as configurações do seu banco de dados.

### 4. Executar a Aplicação

```sh
npm start
```

A aplicação estará disponível em `http://localhost:3000`.

## Como Contribuir

1. Faça um fork do projeto.
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`).
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`).
4. Faça o push para a branch (`git push origin feature/nova-feature`).
5. Abra um Pull Request.

## Licença

Este projeto está licenciado sob a Licença MIT - veja o arquivo LICENSE para mais detalhes.




