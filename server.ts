import express from "express";
import path from "path";
import fs from "fs";
import { GoogleGenAI, Type } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;
const DB_FILE = path.join(process.cwd(), "src", "plans_db.json");

// Ensure db file exists
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), "utf-8");
}

app.use(express.json({ limit: "50mb" }));

// Initialize Gemini SDK securely on server-side
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
} else {
  console.warn("WARNING: GEMINI_API_KEY is not defined in environment variables. AI features will fail.");
}

// REST APIs

// 1. Get courses metadata
import { coursesData } from "./src/data/curriculumData";
app.get("/api/courses", (req, res) => {
  res.json(coursesData);
});

// 2. Saved plans management
app.get("/api/plans", (req, res) => {
  try {
    const data = fs.readFileSync(DB_FILE, "utf-8");
    res.json(JSON.parse(data));
  } catch (error) {
    res.status(500).json({ error: "Erro ao ler banco de dados de planos." });
  }
});

app.post("/api/plans", (req, res) => {
  try {
    const plans = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
    const newPlan = {
      ...req.body,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    plans.push(newPlan);
    fs.writeFileSync(DB_FILE, JSON.stringify(plans, null, 2), "utf-8");
    res.status(201).json(newPlan);
  } catch (error) {
    res.status(500).json({ error: "Erro ao salvar plano pedagógico." });
  }
});

app.put("/api/plans/:id", (req, res) => {
  try {
    const plans = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
    const index = plans.findIndex((p: any) => p.id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: "Plano não encontrado." });
    }
    const updatedPlan = {
      ...plans[index],
      ...req.body,
      updatedAt: new Date().toISOString(),
    };
    plans[index] = updatedPlan;
    fs.writeFileSync(DB_FILE, JSON.stringify(plans, null, 2), "utf-8");
    res.json(updatedPlan);
  } catch (error) {
    res.status(500).json({ error: "Erro ao atualizar plano pedagógico." });
  }
});

app.delete("/api/plans/:id", (req, res) => {
  try {
    let plans = JSON.parse(fs.readFileSync(DB_FILE, "utf-8"));
    plans = plans.filter((p: any) => p.id !== req.params.id);
    fs.writeFileSync(DB_FILE, JSON.stringify(plans, null, 2), "utf-8");
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Erro ao excluir plano pedagógico." });
  }
});

// 3. Post-sales metrics & reports database simulation
app.get("/api/post-sales-data", (req, res) => {
  const mockMetrics = [
    { id: "1", date: "2026-06-25", salesperson: "Carlos Silva", customerName: "Roberto Alencar", status: "Resolvido", satisfactionScore: 5, comments: "Excelente atendimento no pós-venda, revisão rápida.", retentionAction: "E-mail de Agradecimento" },
    { id: "2", date: "2026-06-26", salesperson: "Ana Souza", customerName: "Mariana Costa", status: "Em Aberto", satisfactionScore: 2, comments: "Reclamação de barulho na suspensão após troca de amortecedores.", retentionAction: "Agendamento Prioritário" },
    { id: "3", date: "2026-06-27", salesperson: "Carlos Silva", customerName: "Juliana Santos", status: "Retorno Agendado", satisfactionScore: 4, comments: "Satisfeita com o reparo, aguardando peça de acabamento.", retentionAction: "Cortesia de Lavagem" },
    { id: "4", date: "2026-06-28", salesperson: "Marcos Lima", customerName: "Fernando Azevedo", status: "Resolvido", satisfactionScore: 5, comments: "Troca de óleo rápida e café de cortesia excelente.", retentionAction: "Cupom de Desconto de 10%" },
    { id: "5", date: "2026-06-29", salesperson: "Ana Souza", customerName: "Beatriz Oliveira", status: "Reclamação", satisfactionScore: 1, comments: "Demoraram 3 horas além do combinado para entregar o veículo.", retentionAction: "Ligação do Gerente + Brinde" },
    { id: "6", date: "2026-06-30", salesperson: "Marcos Lima", customerName: "Ricardo Mello", status: "Resolvido", satisfactionScore: 4, comments: "Atendimento profissional, preço justo na revisão de 20k.", retentionAction: "Nenhuma" },
    { id: "7", date: "2026-07-01", salesperson: "Ana Souza", customerName: "Patrícia Lima", status: "Retorno Agendado", satisfactionScore: 3, comments: "Dúvidas sobre o sistema multimídia, agendou explicação com técnico.", retentionAction: "Manual em Vídeo Enviado" },
    { id: "8", date: "2026-07-02", salesperson: "Carlos Silva", customerName: "Eduardo Souza", status: "Resolvido", satisfactionScore: 5, comments: "Sensacional! Resolveram o problema intermitente da injeção eletrônica.", retentionAction: "Kit de Chaves de Brinde" }
  ];

  const salespersonScores = [
    { name: "Carlos Silva", NPS: 95, atendimentos: 145, resolvidos: 138 },
    { name: "Ana Souza", NPS: 78, atendimentos: 120, resolvidos: 110 },
    { name: "Marcos Lima", NPS: 88, atendimentos: 135, resolvidos: 128 }
  ];

  const satisfactionTrend = [
    { mes: "Jan", satisfacao: 4.1 },
    { mes: "Fev", satisfacao: 4.3 },
    { mes: "Mar", satisfacao: 4.2 },
    { mes: "Abr", satisfacao: 4.5 },
    { mes: "Mai", satisfacao: 4.6 },
    { mes: "Jun", satisfacao: 4.4 },
    { mes: "Jul", satisfacao: 4.7 }
  ];

  const statusDistribution = [
    { name: "Resolvido", value: 68 },
    { name: "Retorno Agendado", value: 18 },
    { name: "Em Aberto", value: 10 },
    { name: "Reclamação", value: 4 }
  ];

  res.json({
    metricsList: mockMetrics,
    salespersonScores,
    satisfactionTrend,
    statusDistribution
  });
});

// 4. Generate Pedagogical Document using Gemini
app.post("/api/generate-plan", async (req, res) => {
  try {
    if (!ai) {
      return res.status(500).json({ error: "Gemini AI não inicializado devido à falta da chave de API." });
    }

    const { type, course, uc, customInstructions, professorName, studentProfile, duration } = req.body;

    const systemPrompt = `Você é um Arquiteto de Software Educacional Sênior, Especialista em Inteligência Artificial, BNCC, Planejamento Pedagógico e Educação Profissional do Senac.
Sua missão é gerar um documento pedagógico completo, profissional, altamente estruturado em formato Markdown de acordo com as diretrizes do Modelo Pedagógico Senac e as competências indicadas.
Seja extremamente detalhado, use metodologias ativas modernas (como Sala de Aula Invertida, Aprendizagem Baseada em Projetos, Estudos de Caso, Gamificação, Rotação por Estações ou Simulações).

Informações do Curso Selecionado:
- Curso: ${course.name} (CBO: ${course.cbo}, Código: ${course.code})
- Unidade Curricular: ${uc.name} (Carga Horária da UC: ${uc.workload} horas)
- Indicadores da UC: ${JSON.stringify(uc.indicators)}
- Conhecimentos da UC: ${JSON.stringify(uc.knowledges)}
- Habilidades da UC: ${JSON.stringify(uc.skills)}
- Atitudes e Valores da UC: ${JSON.stringify(uc.attitudes)}

Parâmetros do Documento:
- Tipo de Documento: ${type.toUpperCase()}
- Professor(a): ${professorName || "Docente Senac"}
- Perfil dos Alunos: ${studentProfile || "Jovens aprendizes em qualificação profissional"}
- Carga horária da aula/ação: ${duration || "4 horas"}
- Instruções adicionais do usuário: ${customInstructions || "Nenhuma"}

Regras de Formatação:
1. Retorne o plano de forma limpa, muito organizada e estruturada com títulos claros, tabelas se necessário, listas ordenadas e cronogramas.
2. Divida os tempos com precisão.
3. Se o tipo for "aula": gere um Plano de Aula com cabeçalho, objetivos de aprendizagem, metodologias ativas escolhidas, recursos didáticos, cronograma detalhado minuto a minuto, avaliação diagnóstica/formativa/somativa, evidências e observações.
4. Se o tipo for "curso": gere um Plano de Curso com justificativa técnica, objetivos gerais e específicos, competências, habilidades, metodologias sugeridas, avaliação, recursos didáticos e sugestão de bibliografia básica/complementar.
5. Se o tipo for "trabalho": gere um Plano de Trabalho Docente com Situação de Aprendizagem (Desafio Prático/Mão na Massa!), contextualização profissional baseada no mercado, atividades sugeridas, estratégias avaliativas, critérios de desempenho e evidências de aprendizagem.
6. Se o tipo for "acao": gere um Plano de Ação para recuperação contínua, paralela ou final, indicando os problemas identificados, diagnósticos pedagógicos, objetivos da intervenção, ações pedagógicas de melhoria, cronograma de aplicação, responsáveis e indicadores de sucesso.

Gere agora o documento pedagógico completo em português (PT-BR).`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: "Gere o planejamento solicitado seguindo o sistema de instruções fornecido.",
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    res.json({ content: response.text });
  } catch (error: any) {
    console.error("Gemini Generation Error: ", error);
    res.status(500).json({ error: `Erro ao gerar o plano de aula com a IA: ${error.message || error}` });
  }
});

// 5. Chat Bot Pedagógico Endpoint
app.post("/api/chat", async (req, res) => {
  try {
    if (!ai) {
      return res.status(500).json({ error: "Gemini AI não inicializado devido à falta da chave de API." });
    }

    const { message, history } = req.body;

    const chatSystemInstruction = `Você é o "BOT IA PEDAGÓGICO", um assistente de planejamento pedagógico inteligente integrado ao sistema de planejamento do Senac.
Seu objetivo é ajudar professores a criar situações de aprendizagem, planejar aulas, sugerir metodologias ativas e alinhar conteúdos à BNCC.
Você tem acesso completo aos dados curriculares das três qualificações profissionais do Senac:
1. Serviços Administrativos (Auxiliar administrativo, financeiro, compras, contas a pagar/receber, arquivo, etc.)
2. Serviços de Supermercados (Reposição, controle de validade PVPS, prevenção de perdas, atendimento, etc.)
3. Serviços de Vendas (Prospecção, funil de vendas, fechamento, negociação, pós-venda, fidelização, inteligência emocional, etc.)

Regras de Conduta:
- Sempre responda de maneira simpática, prestativa e profissional.
- Se o usuário pedir para gerar uma atividade ou plano de aula direto no chat, ofereça sugestões ricas de metodologias ativas.
- Cite as marcas formativas do Senac quando relevante (atitude empreendedora, domínio técnico-científico, visão crítica, sustentabilidade, colaboração, protagonismo juvenil, atitude saudável).
- Sugira dinâmicas gamificadas, simulações realistas e estudos de caso para engajar os estudantes.`;

    // Map history to contents for Gemini Chat
    const contents = history.map((h: any) => ({
      role: h.role === "user" ? "user" : "model",
      parts: [{ text: h.text }],
    }));

    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contents,
      config: {
        systemInstruction: chatSystemInstruction,
        temperature: 0.7,
      },
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error("Chat Generation Error: ", error);
    res.status(500).json({ error: `Erro ao processar conversa com o chat: ${error.message || error}` });
  }
});


// Vite Dev Server / Static Hosting setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
