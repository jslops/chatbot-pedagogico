import React from "react";
import { BookOpen, FileText, BarChart2, Star, PlusCircle, CheckCircle, Clock, Users } from "lucide-react";
import { PedagogicalDocument } from "../types";

interface DashboardProps {
  plans: PedagogicalDocument[];
  onNavigate: (tab: string) => void;
  onSelectPlan: (plan: PedagogicalDocument) => void;
}

export default function Dashboard({ plans, onNavigate, onSelectPlan }: DashboardProps) {
  const totalPlans = plans.length;
  const recentPlans = [...plans].sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()).slice(0, 3);
  
  // Calculate aggregate workload hours from plans
  const totalHoursPlanned = plans.reduce((acc, plan) => {
    const text = plan.metadata.workload || plan.metadata.timeline || "4 horas";
    const hours = parseInt(text.replace(/\D/g, ""), 10) || 4;
    return acc + hours;
  }, 0);

  return (
    <div className="space-y-6 text-zinc-100">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 p-6 rounded-2xl border border-zinc-800 shadow-2xl">
        <div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-zinc-100">Painel do Professor</h1>
          <p className="text-zinc-400 mt-1 font-sans text-sm">
            Bem-vindo de volta! Crie, edite e analise seus planos pedagógicos alinhados com o Senac e a BNCC.
          </p>
        </div>
        <button
          onClick={() => onNavigate("gerador")}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-5 py-2.5 rounded-xl transition duration-200 shadow-lg shadow-indigo-600/20 border border-indigo-500/30"
        >
          <PlusCircle className="w-5 h-5" />
          Novo Planejamento
        </button>
      </div>

      {/* KPI Stats Grid - Bento Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition duration-150 flex items-center gap-4">
          <div className="p-3 bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 rounded-xl">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Planos Criados</p>
            <h3 className="text-2xl font-bold font-display text-zinc-100 mt-1">{totalPlans}</h3>
          </div>
        </div>

        <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition duration-150 flex items-center gap-4">
          <div className="p-3 bg-amber-500/10 text-amber-400 border border-amber-500/20 rounded-xl">
            <Clock className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Horas Planejadas</p>
            <h3 className="text-2xl font-bold font-display text-zinc-100 mt-1">{totalHoursPlanned}h</h3>
          </div>
        </div>

        <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition duration-150 flex items-center gap-4">
          <div className="p-3 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-xl">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Cursos Atendidos</p>
            <h3 className="text-2xl font-bold font-display text-zinc-100 mt-1">3 Qualificações</h3>
          </div>
        </div>

        <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 hover:border-zinc-700 transition duration-150 flex items-center gap-4">
          <div className="p-3 bg-rose-500/10 text-rose-400 border border-rose-500/20 rounded-xl">
            <Star className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-bold text-zinc-500 uppercase tracking-wider">NPS do Pós-Venda</p>
            <h3 className="text-2xl font-bold font-display text-zinc-100 mt-1">87%</h3>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Plans Column - Bento Block */}
        <div className="lg:col-span-2 bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-display font-semibold text-zinc-100">Planejamentos Recentes</h2>
            <button
              onClick={() => onNavigate("historico")}
              className="text-indigo-400 hover:text-indigo-300 text-sm font-medium transition"
            >
              Ver todos
            </button>
          </div>

          {recentPlans.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center border border-zinc-800 rounded-2xl bg-zinc-950/30">
              <FileText className="w-12 h-12 text-zinc-700 mb-3" />
              <p className="text-zinc-500 text-sm font-medium">Nenhum planejamento gerado ainda.</p>
              <button
                onClick={() => onNavigate("gerador")}
                className="mt-3 text-indigo-400 hover:text-indigo-300 font-semibold text-sm"
              >
                Criar meu primeiro plano →
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {recentPlans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => {
                    onSelectPlan(plan);
                    onNavigate("historico");
                  }}
                  className="flex items-center justify-between p-4 bg-zinc-950/30 hover:bg-zinc-800/80 rounded-xl cursor-pointer border border-zinc-800 hover:border-zinc-700 transition duration-150"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-500/10 text-indigo-400 flex items-center justify-center rounded-lg font-bold text-sm uppercase border border-indigo-500/20">
                      {plan.type[0]}
                    </div>
                    <div>
                      <h4 className="font-semibold text-zinc-200 text-sm">{plan.title}</h4>
                      <p className="text-xs text-zinc-500 mt-0.5">
                        {plan.courseName} • {plan.curricularUnitName}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded">
                      {plan.type === 'aula' ? 'Plano de Aula' : plan.type === 'curso' ? 'Plano de Curso' : plan.type === 'trabalho' ? 'Plano de Trabalho' : 'Plano de Ação'}
                    </span>
                    <p className="text-[10px] text-zinc-500 mt-1">
                      {new Date(plan.updatedAt).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Insights & Tools Panel - Bento Block */}
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <h2 className="text-lg font-display font-semibold text-zinc-100">Agenda de Aula</h2>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-amber-500/5 border border-amber-500/20 rounded-xl">
                <Clock className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[10px] font-bold text-amber-400 uppercase tracking-wide">Hoje às 14:00</h4>
                  <p className="text-sm font-semibold text-zinc-200">Recursos Tecnológicos</p>
                  <p className="text-xs text-zinc-500">Turma Aprendizagem Serviços Administrativos</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-indigo-500/5 border border-indigo-500/20 rounded-xl">
                <Clock className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[10px] font-bold text-indigo-400 uppercase tracking-wide">Amanhã às 08:30</h4>
                  <p className="text-sm font-semibold text-zinc-200">Técnicas de Vendas</p>
                  <p className="text-xs text-zinc-500">Turma Serviços de Vendas Avançado</p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-800">
            <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2">Bot IA Pedagógico</h4>
            <p className="text-xs text-zinc-400 leading-relaxed mb-3">
              Precisa de ajuda instantânea com uma rubrica de avaliação ou situação problema? Pergunte ao assistente inteligente.
            </p>
            <button
              onClick={() => onNavigate("chat")}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-semibold text-xs transition border border-indigo-500/20 shadow-md"
            >
              Falar com o Assistente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
