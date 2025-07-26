# 🤖 Bot de Promoções para Telegram

![Status do Projeto](https://img.shields.io/badge/status-em%20desenvolvimento-yellow?style=for-the-badge)
![Node.js](https://img.shields.io/badge/Node.js-v22.x-339933?style=for-the-badge&logo=node.js)
![Puppeteer](https://img.shields.io/badge/Puppeteer-green?style=for-the-badge&logo=puppeteer)
![Telegram](https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram)

<br>

Este projeto é um bot automatizado que monitora sites de e-commerce em busca de promoções e as compartilha em um canal do Telegram, utilizando links de afiliado para monetização.

<br>

> <img width="1484" height="359" alt="image" src="https://github.com/user-attachments/assets/47ce6ca7-2650-473d-8737-648dd07eb10a" />
<img width="992" height="773" alt="image" src="https://github.com/user-attachments/assets/54a8b8b6-3b08-477e-8665-1b45b7f1c09b" />
 <br>


<br>

## 📜 Sobre o Projeto

A ideia nasceu da vontade de automatizar o processo de encontrar e compartilhar ofertas de grandes varejistas como a Amazon. O bot utiliza técnicas de web scraping para extrair informações dos produtos em promoção e a API do Telegram para publicá-los em um canal, tornando o processo rápido, eficiente e autônomo.

---

## ✨ Funcionalidades

-   **Web Scraping:** Realiza a extração de dados (título, preço, imagem, link) da página de ofertas da Amazon.
-   **Postagem Automática:** Publica as ofertas encontradas em um canal do Telegram, com imagem e texto formatado.
-   **Download de Imagens:** Baixa a imagem do produto para enviá-la diretamente ao Telegram, evitando problemas com links protegidos (hotlinking).
-   **Links de Afiliado:** Prepara a estrutura para transformar links de produtos em links de afiliado.
-   **Agendamento de Tarefas:** Utiliza `node-cron` para verificar novas promoções em intervalos de tempo definidos (ex: a cada hora).
-   **Configuração Segura:** Utiliza variáveis de ambiente (`.env`) para proteger informações sensíveis como o token do bot.

---

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído com as seguintes tecnologias:

-   [Node.js](https://nodejs.org/en/): Ambiente de execução JavaScript no servidor.
-   [Puppeteer](https://pptr.dev/): Biblioteca para controlar um navegador (Chrome) e realizar o web scraping.
-   [Node-Telegram-Bot-API](https://github.com/yagop/node-telegram-bot-api): Biblioteca para interagir com a API de Bots do Telegram.
-   [Axios](https://axios-http.com/): Cliente HTTP para fazer o download das imagens dos produtos.
-   [Dotenv](https://github.com/motdotla/dotenv): Módulo para carregar variáveis de ambiente de um arquivo `.env`.
-   [Node-Cron](https://github.com/node-cron/node-cron): Agendador de tarefas para executar o bot periodicamente.

---

## 🚀 Começando

Siga as instruções abaixo para configurar e rodar o projeto em seu ambiente local.

### Pré-requisitos

Você vai precisar ter instalado em sua máquina:
* [Node.js (versão 18 ou superior)](https://nodejs.org/en/)
* [Git](https://git-scm.com/)
* Um Bot e um Canal no Telegram.
* Uma conta de Afiliados da Amazon (opcional, para monetização).

### Instalação

1.  Clone o repositório para sua máquina local:
    ```sh
    git clone [https://github.com/vicenteaugusto9/bot-de-promocoes.git](https://github.com/vicenteaugusto9/bot-de-promocoes.git)
    ```
2.  Navegue até a pasta do projeto:
    ```sh
    cd bot-de-promocoes
    ```
3.  Instale todas as dependências do projeto:
    ```sh
    npm install
    ```
4.  Crie uma cópia do arquivo de exemplo de ambiente:
    ```sh
    cp .env.example .env
    ```
5.  Abra o arquivo `.env` e preencha com suas informações.

---

## ⚙️ Configuração

O arquivo `.env` centraliza todas as configurações e chaves necessárias para o bot funcionar.

```
# .env - Arquivo de configuração de ambiente

# Token do seu bot, obtido com o @BotFather no Telegram
TELEGRAM_TOKEN="SEU_TOKEN_SUPER_SECRETO_AQUI"

# ID ou @username do seu canal do Telegram
TELEGRAM_CHANNEL_ID="@seu_canal_ou_id"

# Sua tag de afiliado da Amazon (ex: suatag-20)
AMAZON_AFFILIATE_TAG="sua-tag-de-afiliado-20"
```

---

## ▶️ Uso

Para iniciar o bot, execute o seguinte comando no seu terminal:

```sh
node src/index.js
```

O bot fará uma primeira execução imediata e depois seguirá o agendamento definido no `index.js` (por padrão, a cada hora).

---

## 🗺️ Roteiro de Melhorias (Roadmap)

Este projeto está em constante evolução. Os próximos passos planejados são:

-   [ ] Implementar scraping de uma página com preços mais consistentes.
-   [x] Corrigir bugs na captura de imagens.
-   [x] Adicionar scraping para o site do **Mercado Livre**.
-   [ ] Criar filtros para ignorar produtos de certas categorias ou abaixo de um certo valor.
-   [ ] Refatorar o código para permitir a busca em múltiplas lojas de forma modular.
-   [ ] Fazer o deploy da aplicação em um servidor na nuvem (VPS ou PaaS).

---

## 🤝 Contato

Vicente Augusto - [GitHub](https://github.com/vicenteaugusto9)
