# Hort+ - Sistema de Gerenciamento de Produtos e Pedidos

<p align="center">
  <img src="https://nestjs.com/img/logo-small.svg" width="80" alt="Nest Logo" />
  &nbsp; + &nbsp;
  <img src="https://raw.githubusercontent.com/reactjs/react.dev/main/public/images/logo.svg" width="80" alt="React Logo" />
</p>

<p align="center">
  Um sistema full-stack para gerenciamento de hortifruti, construído com **NestJS** no back-end e **Next.js (React)** no front-end.
</p>

## Informações do Grupo

* **Nome:** NATÁLIA JESUS BARBOSA CRUZEIRO - **Matrícula:** UC23102920
* **Nome:** PEDRO PAULO SOUSA DO LAGO - **Matrícula:** UC23102920
* **Nome:** RAQUEL PEREIRA DE SOUZA - **Matrícula:** UC23102920
* **Nome:** SARA CRISTINA BARROS DE OLIVEIRA - **Matrícula:** UC23102920

---

## Descrição do Projeto

O Hort+ é uma aplicação desenvolvida para **facilitar o gerenciamento de produtos, pedidos, carrinhos e usuários de um estabelecimento de hortifruti, oferecendo uma interface administrativa intuitiva e uma API robusta**. O sistema visa otimizar as operações diárias, desde o cadastro de itens até o acompanhamento do status de entrega dos pedidos.

### Tecnologias Utilizadas

* **Back-end:** NestJS (TypeScript), TypeORM, SQLite3, Jest para testes.
* **Front-end:** Next.js (React, TypeScript), pnpm, Axios para requisições API, Shadcn UI para componentes.

---

## Instruções para Execução da Aplicação

Para rodar a aplicação Hort+ localmente, siga os passos abaixo para o Back-end e o Front-end.

### 1. Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas em sua máquina:

* [Node.js](https://nodejs.org/) (versão 18.x ou superior recomendada)
* [pnpm](https://pnpm.io/installation) (gerenciador de pacotes do front-end)
    ```bash
    npm install -g pnpm
    ```
* [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) (gerenciador de pacotes do back-end)

### 2. Configuração e Execução do Back-end (NestJS)

1.  **Navegue até o diretório do Back-end:**
    Abra seu terminal e navegue até a pasta raiz do projeto NestJS. Por exemplo:
    ```bash
    cd ./Back-End/nest-app/nest-app-f35be99ae39dc056a7441449a93bd1cfa64e74f7
    ```

2.  **Instale as dependências:**
    ```bash
    npm install
    ```

3.  **Configuração do Banco de Dados (SQLite):**
    A aplicação utiliza SQLite, e o TypeORM configurado com `synchronize: true` irá criar o arquivo `hortplus.sqlite` automaticamente na raiz do projeto na primeira execução bem-sucedida.
    * **Importante:** Se você encontrar erros de `SQLITE_CONSTRAINT` ao iniciar o back-end (ex: `NOT NULL constraint failed`), pode ser necessário deletar manualmente o arquivo `hortplus.sqlite` antes de reiniciar o servidor para que o TypeORM possa recriar o esquema. Este arquivo estará na raiz da pasta `nest-app`.

4.  **Execute o Back-end em modo de desenvolvimento:**
    ```bash
    npm run start:dev
    ```
    O servidor da API estará disponível em `http://localhost:3001`.

### 3. Configuração e Execução do Front-end (Next.js)

1.  **Navegue até o diretório do Front-end:**
    Abra outro terminal e navegue até a pasta raiz do projeto Next.js. Por exemplo:
    ```bash
    cd ./Front-end/HORTI--ei-main
    ```
    **Importante:** Se você encontrar erros persistentes de `EINVAL` ou problemas de leitura de arquivo (especialmente em ambientes Windows com OneDrive), **certifique-se de que esta pasta NÃO ESTÁ LOCALIZADA EM UM DIRETÓRIO SINCRONIZADO COM A NUVEM (ex: OneDrive)**. Mova-a para um local em um drive local (ex: `C:\Projetos\HORTI--ei-main`) e refaça os passos de instalação lá.

2.  **Instale as dependências:**
    ```bash
    pnpm install
    ```
    * **Resolução de Erros Comuns de Instalação:** Se você encontrar erros como `EINVAL`, `Module not found` ou outros problemas de build/dependência, siga estes passos para uma limpeza completa antes de tentar `pnpm install` novamente:
        ```bash
        # No terminal do front-end, na pasta raiz do projeto:
        # Para Windows PowerShell:
        rd /s /q .next
        rd /s /q node_modules
        del pnpm-lock.yaml
        del pnpm-workspace.yaml
        # Para Linux/macOS:
        # rm -rf .next node_modules pnpm-lock.yaml pnpm-workspace.yaml
        pnpm install # Reinstala as dependências após a limpeza
        ```

3.  **Execute o Front-end em modo de desenvolvimento:**
    ```bash
    pnpm dev
    ```
    O aplicativo estará disponível em `http://localhost:3000`.

### 4. Acessando a Aplicação

Com ambos os servidores (back-end na porta `3001` e front-end na porta `3000`) rodando, acesse a aplicação pelo navegador:

* **Front-end:** `http://localhost:3000`
* **Back-end API (Exemplos de Endpoints):**
    * Produtos: `http://localhost:3001/produtos`
    * Pedidos: `http://localhost:3001/pedido`
    * Usuários: `http://localhost:3001/usuario`
    * Carrinhos: `http://localhost:3001/carrinho`

---

## Testes Automatizados (Back-end)

Para rodar os testes unitários e e2e do back-end, navegue até o diretório do back-end e utilize os seguintes comandos:

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
