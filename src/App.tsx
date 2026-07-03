import React, { useState, useEffect } from "react";
import { BookOpen, FileText, Settings, Sparkles, LogOut, LayoutDashboard, PlusCircle, HelpCircle, Clipboard, History as HistoryIcon, BadgePercent } from "lucide-react";
import Dashboard from "./components/Dashboard";
import Planner from "./components/Planner";
import AIAssistant from "./components/AIAssistant";
import PostSales from "./components/PostSales";
import History from "./components/History";
import TemplateLibrary from "./components/TemplateLibrary";
import { PedagogicalDocument } from "./types";

export default function App() {
  const [currentTab, setCurrentTab] = useState("dashboard");
  const [plans, setPlans] = useState<PedagogicalDocument[]>([]);
  const [selectedPlanForHistory, setSelectedPlanForHistory] = useState<PedagogicalDocument | null>(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch("/api/plans");
      const data = await response.json();
      setPlans(data);
    } catch (error) {
      console.error("Failed to load saved plans", error);
    }
  };

  const handleSavePlan = async (plan: Partial<PedagogicalDocument>): Promise<PedagogicalDocument> => {
    const response = await fetch("/api/plans", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(plan),
    });
    const saved = await response.json();
    setPlans((prev) => [...prev, saved]);
    return saved;
  };

  const handleDeletePlan = async (id: string) => {
    try {
      await fetch(`/api/plans/${id}`, { method: "DELETE" });
      setPlans((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Failed to delete plan", error);
    }
  };

  const handleDuplicatePlan = async (plan: PedagogicalDocument) => {
    const duplicated: Partial<PedagogicalDocument> = {
      title: `${plan.title} (Cópia)`,
      type: plan.type,
      courseId: plan.courseId,
      courseName: plan.courseName,
      curricularUnitId: plan.curricularUnitId,
      curricularUnitName: plan.curricularUnitName,
      content: plan.content,
      metadata: plan.metadata,
    };
    await handleSavePlan(duplicated);
  };

  const handleNavigateToPlan = (plan: PedagogicalDocument) => {
    setSelectedPlanForHistory(plan);
    setCurrentTab("historico");
  };

  return (
    <div className="flex h-screen bg-zinc-950 font-sans antialiased text-zinc-100 overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-zinc-900/50 border-r border-zinc-800 text-zinc-100 flex flex-col justify-between shrink-0">
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold font-display shadow-lg shadow-indigo-600/20">
              S
            </div>
            <div>
              <h2 className="font-display font-bold text-sm tracking-tight text-zinc-100 leading-tight">Senac Planejamento</h2>
              <p className="text-[10px] text-zinc-500 font-medium">Plataforma Pedagógica Bento IA</p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="text-[10px] font-bold text-zinc-500 uppercase px-2 tracking-wider">Módulos do Sistema</div>
            <nav className="space-y-1">
              {[
                { id: "dashboard", label: "Painel do Professor", icon: LayoutDashboard },
                { id: "gerador", label: "Gerador de Planos", icon: PlusCircle },
                { id: "chat", label: "Assistente IA Bot", icon: Sparkles },
                { id: "posvenda", label: "Relatórios Pós-Venda", icon: BadgePercent },
                { id: "historico", label: "Histórico de Planos", icon: HistoryIcon },
                { id: "biblioteca", label: "Biblioteca de Modelos", icon: HelpCircle },
              ].map((tab) => {
                const Icon = tab.icon;
                const isActive = currentTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setCurrentTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition duration-150 border ${
                      isActive
                        ? "bg-zinc-800 text-indigo-400 border-indigo-500/20 shadow-md"
                        : "text-zinc-400 border-transparent hover:bg-zinc-800/60 hover:text-zinc-100"
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-indigo-400" : "text-zinc-500"}`} />
                    {tab.label}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>

        {/* Sidebar Footer info */}
        <div className="p-5 m-4 bg-indigo-950/20 border border-indigo-500/20 rounded-xl">
          <div className="text-xs text-indigo-300 font-medium mb-1">Uso Mensal IA</div>
          <div className="w-full bg-zinc-800 rounded-full h-1.5 mb-2">
            <div className="bg-indigo-500 h-1.5 rounded-full" style={{ width: "65%" }}></div>
          </div>
          <p className="text-[10px] text-zinc-500">650 / 1.000 requisições</p>
        </div>
      </aside>

      {/* Main Panel Content Area */}
      <main className="flex-grow flex flex-col overflow-hidden bg-zinc-950">
        {/* Header bar */}
        <header className="h-16 bg-zinc-950/80 border-b border-zinc-800 px-8 flex justify-between items-center shrink-0">
          <h3 className="font-display font-medium text-zinc-100 text-base capitalize tracking-tight flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            {currentTab === "posvenda" ? "Análise e Relatórios Pós-Venda" : currentTab}
          </h3>
          <div className="flex items-center gap-4">
            <span className="inline-block px-3 py-1 text-[10px] font-bold text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
              BNCC & Senac Ativo
            </span>
            <div className="flex items-center gap-3 pl-3 border-l border-zinc-800">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-semibold text-zinc-200">Docente Conectado</div>
                <div className="text-[9px] text-zinc-500">Colegiado de Gestão</div>
              </div>
              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-indigo-400">
                DC
              </div>
            </div>
          </div>
        </header>

        {/* Tab Render Switcher */}
        <div className="flex-grow p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {currentTab === "dashboard" && (
            <Dashboard plans={plans} onNavigate={setCurrentTab} onSelectPlan={handleNavigateToPlan} />
          )}
          {currentTab === "gerador" && (
            <Planner onSave={handleSavePlan} />
          )}
          {currentTab === "chat" && (
            <AIAssistant />
          )}
          {currentTab === "posvenda" && (
            <PostSales />
          )}
          {currentTab === "historico" && (
            <History
              plans={plans}
              onDelete={handleDeletePlan}
              onDuplicate={handleDuplicatePlan}
              onSelectPlan={setSelectedPlanForHistory}
            />
          )}
          {currentTab === "biblioteca" && (
            <TemplateLibrary />
          )}
        </div>
      </main>
    </div>
  );
}
