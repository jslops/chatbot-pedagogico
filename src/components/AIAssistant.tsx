import React, { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Bot, User, HelpCircle, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "bot";
  text: string;
}

export default function AIAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "Olá! Eu sou o seu **Assistente IA Pedagógico**. Estou aqui para ajudar você a desenhar metodologias ativas, bolar desafios gamificados, criar rubricas de avaliação e simulações alinhadas com a BNCC e as UCs do Senac. Como posso ajudar você no seu planejamento hoje?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    {
      label: "Desafio Gamificado",
      text: "Crie um desafio gamificado focado no atendimento ao cliente para a qualificação de Serviços de Vendas.",
    },
    {
      label: "Estudo de Caso (Estoque)",
      text: "Elabore um estudo de caso prático para a UC de Compras e Estoque, simulando perdas por validade vencida.",
    },
    {
      label: "Intervenção de Recuperação",
      text: "Sugira um plano de ação para recuperação contínua de alunos com dificuldades de letramento matemático na UC5.",
    },
    {
      label: "Projeto Integrador (Vendas)",
      text: "Proponha ideias criativas de temas geradores para o Projeto Integrador do curso Serviços de Vendas.",
    },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMessage: Message = { role: "user", text: textToSend };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: textToSend,
          history: messages,
        }),
      });

      const data = await response.json();
      if (data.error) {
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: `Erro de comunicação: ${data.error}` },
        ]);
      } else {
        setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
      }
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Não foi possível obter resposta do servidor. Por favor, tente novamente." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-12rem)] min-h-[500px] text-zinc-100">
      {/* Suggestions Side Column */}
      <div className="lg:col-span-1 bg-zinc-900 p-5 rounded-2xl border border-zinc-800 shadow-sm flex flex-col justify-between space-y-4">
        <div>
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5 mb-3">
            <HelpCircle className="w-4 h-4 text-indigo-400" />
            Sugestões de Atividade
          </h3>
          <p className="text-xs text-zinc-400 leading-relaxed mb-4">
            Clique em qualquer sugestão de prompt para que o assistente pedagógico monte roteiros instantâneos adaptados.
          </p>
          <div className="space-y-2">
            {suggestedPrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSendMessage(prompt.text)}
                className="w-full text-left p-3 bg-zinc-950 hover:bg-zinc-800/60 rounded-xl text-xs font-semibold text-zinc-300 border border-zinc-800/80 hover:border-zinc-700 transition duration-150 leading-normal"
              >
                {prompt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-850/50 text-zinc-400 text-[11px] leading-relaxed">
          <p className="font-bold text-indigo-400 mb-1 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            Conhecimento Alinhado:
          </p>
          O assistente possui conhecimento embutido sobre as matrizes de Serviços Administrativos, Supermercados e Vendas do Senac.
        </div>
      </div>

      {/* Main Interactive Chat Column */}
      <div className="lg:col-span-3 bg-zinc-900 rounded-2xl border border-zinc-800 shadow-sm flex flex-col overflow-hidden h-full">
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-zinc-800 flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
            <Bot className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-zinc-150 text-sm">Bot IA Pedagógico</h3>
            <p className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block animate-ping" />
              ONLINE • MODELO GEMINI FLASH
            </p>
          </div>
        </div>

        {/* Conversation Message List */}
        <div className="flex-grow overflow-y-auto p-6 space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex items-start gap-3 max-w-[85%] ${
                msg.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center text-xs font-bold ${
                  msg.role === "user"
                    ? "bg-indigo-500/15 text-indigo-400 border border-indigo-500/30"
                    : "bg-zinc-950 border border-zinc-850 text-zinc-300"
                }`}
              >
                {msg.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div
                className={`p-4 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                  msg.role === "user"
                    ? "bg-indigo-600/90 text-white border border-indigo-500/20"
                    : "bg-zinc-950/60 text-zinc-200 border border-zinc-800/80"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-3 mr-auto max-w-[85%]">
              <div className="w-8 h-8 rounded-full bg-zinc-950 border border-zinc-850 text-zinc-300 flex items-center justify-center">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
              </div>
              <div className="bg-zinc-950 text-zinc-400 border border-zinc-800 px-4 py-3 rounded-2xl text-xs font-medium">
                O assistente está estruturando a resposta...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Text Form */}
        <div className="p-4 border-t border-zinc-800">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage(input);
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              placeholder="Pergunte qualquer coisa (Ex: 'Crie uma situação de aprendizagem para repositor de supermercado')"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
              className="flex-grow bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className={`p-3 rounded-xl transition-all shadow-md ${
                input.trim() && !isLoading
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white border border-indigo-500/20 shadow-indigo-600/10"
                  : "bg-zinc-950 text-zinc-600 border border-zinc-800 cursor-not-allowed"
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
