# Assistente de Tarefas V3

A V3 tem frontend PWA + backend Node/Express + OpenAI Responses API.

## Segurança
NUNCA coloque a chave OpenAI no JavaScript da pasta `public`. Ela fica no servidor, em `.env`.

## Rodar no PC
1. Instale Node.js.
2. Abra um terminal nesta pasta.
3. `npm install`
4. Copie `.env.example` para `.env`.
5. Coloque sua chave em `OPENAI_API_KEY`.
6. `npm start`
7. Abra `http://localhost:3000`.

## Para usar no Chrome Android
O celular precisa acessar uma versão hospedada em HTTPS. Publique o projeto em um servidor que rode Node.js e configure a variável `OPENAI_API_KEY` no painel desse servidor.
Depois abra a URL no Chrome Android. Use menu ⋮ > Adicionar à tela inicial/Instalar app. O Chrome suporta instalação de PWAs quando os critérios de instalação são atendidos.

Esta aplicação não acessa nem envia atividades para o Sala do Futuro.
