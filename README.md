# My Cart

My Cart é uma aplicação de e-commerce desenvolvida com React, TypeScript e Material UI. O objetivo deste projeto é fornecer uma experiência de compra online simples e eficiente, permitindo que os usuários visualizem produtos, adicionem itens ao carrinho, alterem quantidades e removam produtos.

## Tecnologias Utilizadas

- **Node.js**: v20.9.0
- **npm**: v10.1.0
- **React**
- **TypeScript**
- **Material UI**
- **Context API** para gerenciamento de estado
- **localStorage** para persistência de dados do carrinho

## Funcionalidades

- Listagem de produtos
- Visualização de detalhes dos produtos
- Adição de produtos ao carrinho
- Alteração de quantidades dos produtos no carrinho
- Remoção de produtos do carrinho
- Notificações para feedback de ações do usuário

## Instalação

Siga os passos abaixo para configurar e executar o projeto localmente.

### Pré-requisitos

- Node.js v20.9.0
- npm v10.1.0

### Passos para Instalação

1. **Clone o repositório:**

   ```bash
   git clone git@github.com:erikomis/my-cart.git
   cd my-cart
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Execute a aplicação:**

   ```bash
   npm dev
   ```

   ou

   ```bash
   npm start
   ```

4. **Abra o navegador e acesse:**

   ```
   http://localhost:5173/
   ```

## Estrutura do Projeto

```plaintext
my-cart/
├── public/
├── src/
│   ├── components/
│   ├── context/
│   ├── hooks
│   ├── pages/
│   ├── styles
│   ├── utils/
│   ├── index.css
│   ├── main.tsx
│   └── routes.tsx
├── package.json
├── tsconfig.json
└── ...
```
