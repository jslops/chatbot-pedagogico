import React, { useState } from "react";
import { Search, Eye, Trash2, Copy, FileText, Printer, Calendar } from "lucide-react";
import { PedagogicalDocument } from "../types";

interface HistoryProps {
  plans: PedagogicalDocument[];
  onDelete: (id: string) => void;
  onDuplicate: (plan: PedagogicalDocument) => void;
  onSelectPlan: (plan: PedagogicalDocument) => void;
}

export default function History({ plans, onDelete, onDuplicate, onSelectPlan }: HistoryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedPlan, setSelectedPlan] = useState<PedagogicalDocument | null>(null);

  const filteredPlans = plans.filter((plan) => {
    const matchesSearch =
      plan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.courseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      plan.curricularUnitName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === "all" || plan.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleCopyClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Conteúdo copiado para a área de transferência!");
  };

  const handlePrintPlan = (plan: PedagogicalDocument) => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>${plan.title}</title>
          <style>
            body { font-family: 'Segoe UI', system-ui, sans-serif; padding: 40px; color: #1e293b; max-width: 800px; margin: 0 auto; line-height: 1.6; }
            h1 { font-family: 'Space Grotesk', sans-serif; font-size: 24pt; border-bottom: 3px solid #ff6b00; padding-bottom: 8px; color: #0056a6; }
            h2 { font-size: 16pt; color: #0056a6; margin-top: 24px; border-bottom: 1px solid #e2e8f0; padding-bottom: 4px; }
            h3 { font-size: 13pt; color: #0f172a; margin-top: 18px; }
            p, li { font-size: 11pt; color: #334155; }
            pre { background: #f8fafc; padding: 16px; border-radius: 8px; border: 1px solid #e2e8f0; font-family: monospace; white-space: pre-wrap; word-wrap: break-word; }
            table { width: 100%; border-collapse: collapse; margin-top: 15px; }
            th, td { border: 1px solid #cbd5e1; padding: 10px; text-align: left; font-size: 10pt; }
            th { background: #e6f2ff; color: #0056a6; font-weight: bold; }
            .header-info { margin-bottom: 30px; display: grid; grid-template-columns: 1fr 1fr; gap: 15px; background: #f8fafc; padding: 15px; border-radius: 8px; border: 1px solid #e2e8f0; }
          </style>
        </head>
        <body>
          <h1>${plan.title}</h1>
          <div class="header-info">
            <div><strong>Curso:</strong> ${plan.courseName}</div>
            <div><strong>Unidade Curricular:</strong> ${plan.curricularUnitName}</div>
            <div><strong>Carga Horária:</strong> ${plan.metadata?.workload || "Não especificado"}</div>
            <div><strong>Docente:</strong> ${plan.metadata?.professor || "Não especificado"}</div>
            <div><strong>Perfil do Aluno:</strong> ${plan.metadata?.studentProfile || "Não especificado"}</div>
          </div>
          <div style="white-space: pre-wrap;">${plan.content}</div>
        </body>
      </html>
    `);
    
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 500);
  };

  return (
    <div className="space-y-6 text-zinc-100">
      {/* Search & Filter Header */}
      <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:max-w-md">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
          <input
            type="text"
            placeholder="Pesquisar por título, curso ou UC..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {[
            { id: "all", label: "Todos os Tipos" },
            { id: "aula", label: "Planos de Aula" },
            { id: "curso", label: "Planos de Curso" },
            { id: "trabalho", label: "Planos Trabalho" },
            { id: "acao", label: "Planos de Ação" },
          ].map((type) => (
            <button
              key={type.id}
              onClick={() => setTypeFilter(type.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold border transition ${
                typeFilter === type.id
                  ? "bg-indigo-600 text-white border-indigo-500/20"
                  : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:bg-zinc-800/80 hover:text-zinc-200"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* List of Plans Column */}
        <div className="lg:col-span-1 bg-zinc-900 rounded-2xl border border-zinc-800 shadow-sm overflow-hidden h-[calc(100vh-18rem)] overflow-y-auto">
          <div className="px-5 py-4 border-b border-zinc-800 bg-zinc-950/40">
            <h3 className="font-display font-semibold text-zinc-100 text-sm">Documentos Salvos ({filteredPlans.length})</h3>
          </div>
          {filteredPlans.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-10 text-center text-zinc-500">
              <FileText className="w-10 h-10 mb-2 text-zinc-700" />
              <p className="text-xs">Nenhum planejamento corresponde aos filtros.</p>
            </div>
          ) : (
            <div className="divide-y divide-zinc-800/50">
              {filteredPlans.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  className={`p-4 cursor-pointer transition hover:bg-zinc-800/50 ${
                    selectedPlan?.id === plan.id ? "bg-indigo-500/10 border-l-4 border-indigo-500" : ""
                  }`}
                >
                  <h4 className="font-semibold text-zinc-200 text-xs leading-normal">{plan.title}</h4>
                  <p className="text-[10px] text-zinc-500 mt-1 truncate">{plan.courseName}</p>
                  <div className="flex justify-between items-center mt-3">
                    <span className="inline-block px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 rounded">
                      {plan.type}
                    </span>
                    <span className="text-[9px] text-zinc-500 flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(plan.updatedAt).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Selected Plan Details Editor/Viewer Column */}
        <div className="lg:col-span-2 bg-zinc-900 rounded-2xl border border-zinc-800 shadow-sm p-6 flex flex-col h-[calc(100vh-18rem)]">
          {selectedPlan ? (
            <div className="flex flex-col h-full justify-between space-y-4">
              <div className="flex justify-between items-start pb-4 border-b border-zinc-800">
                <div>
                  <h2 className="text-xl font-display font-semibold text-zinc-100">{selectedPlan.title}</h2>
                  <p className="text-xs text-zinc-400 mt-1">
                    {selectedPlan.courseName} • {selectedPlan.curricularUnitName}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleCopyClipboard(selectedPlan.content)}
                    className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 rounded-lg transition"
                    title="Copiar Conteúdo"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handlePrintPlan(selectedPlan)}
                    className="p-2 text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50 rounded-lg transition"
                    title="Imprimir / PDF"
                  >
                    <Printer className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => onDuplicate(selectedPlan)}
                    className="p-2 text-emerald-450 hover:text-emerald-350 hover:bg-emerald-500/10 rounded-lg transition"
                    title="Duplicar Planejamento"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      if (confirm("Deseja realmente excluir este planejamento pedagógico do banco de dados?")) {
                        onDelete(selectedPlan.id);
                        setSelectedPlan(null);
                      }
                    }}
                    className="p-2 text-rose-450 hover:text-rose-350 hover:bg-rose-500/15 rounded-lg transition"
                    title="Excluir Planejamento"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Editable Markdown Content Block */}
              <div className="flex-grow overflow-y-auto">
                <textarea
                  value={selectedPlan.content}
                  onChange={(e) => {
                    const updated = { ...selectedPlan, content: e.target.value };
                    setSelectedPlan(updated);
                  }}
                  className="w-full h-full p-4 bg-zinc-950 border border-zinc-800 rounded-2xl font-mono text-xs text-zinc-300 leading-normal focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end pt-3 border-t border-zinc-800">
                <p className="text-[10px] text-zinc-500 self-center">
                  Última edição em {new Date(selectedPlan.updatedAt).toLocaleString("pt-BR")}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center text-zinc-500">
              <FileText className="w-16 h-16 text-zinc-800 mb-4 animate-pulse" />
              <h3 className="font-display font-semibold text-zinc-450 text-sm">Nenhum Documento Selecionado</h3>
              <p className="text-xs text-zinc-500 max-w-sm mt-1 leading-normal">
                Selecione um planejamento no menu lateral esquerdo para ler, editar, duplicar, deletar ou exportar em alta qualidade.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
