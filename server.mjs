import express from "express";
import OpenAI from "openai";
import "dotenv/config";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json({ limit: "50kb" }));

// Entrega os arquivos da pasta public
app.use(express.static(path.join(__dirname, "public")));

// Página inicial
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// API para responder questões
app.post("/api/answer", async (req, res) => {
  try {
    const { question, mode = "curta" } = req.body || {};

    if (!question || question.length > 10000) {
      return res.status(400).json({
        error: "Questão inválida."
      });
    }

    const style = {
      curta: "Responda de forma curta e direta, em poucas linhas.",
      explicar:
        "Explique de forma simples e didática para um aluno, mostrando o raciocínio.",
      completa:
        "Dê uma resposta completa, natural e adequada para uma atividade escolar."
    }[mode] || "Responda de forma clara.";

    const response = await client.responses.create({
      model: "gpt-5",
      instructions:
        "Você é um assistente de estudos. Responda em português do Brasil. Não invente fatos. " +
        style,
      input: "Questão escolar:\n" + question
    });

    res.json({
      answer: response.output_text
    });
  } catch (e) {
    console.error(e);

    res.status(500).json({
      error: "Erro ao consultar a IA."
    });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
