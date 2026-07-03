import React, { useState, useEffect } from "react";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";
import { BarChart2, MessageSquare, Star, PlusCircle, UserCheck, AlertTriangle, ShieldCheck } from "lucide-react";
import { PostSaleMetric } from "../types";

export default function PostSales() {
  const [metrics, setMetrics] = useState<PostSaleMetric[]>([]);
  const [salespersonScores, setSalespersonScores] = useState<any[]>([]);
  const [satisfactionTrend, setSatisfactionTrend] = useState<any[]>([]);
  const [statusDistribution, setStatusDistribution] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // New Record Form States
  const [customerName, setCustomerName] = useState("");
  const [salesperson, setSalesperson] = useState("Carlos Silva");
  const [score, setScore] = useState(5);
  const [comments, setComments] = useState("");
  const [status, setStatus] = useState<"Resolvido" | "Em Aberto" | "Retorno Agendado" | "Reclamação">("Resolvido");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/post-sales-data");
      const data = await response.json();
      setMetrics(data.metricsList);
      setSalespersonScores(data.salespersonScores);
      setSatisfactionTrend(data.satisfactionTrend);
      setStatusDistribution(data.statusDistribution);
    } catch (error) {
      console.error("Error loading post-sales data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !comments) return;

    // Construct recovery/retention actions based on score
    let retentionAction = "Nenhuma";
    if (score <= 2) retentionAction = "Ligação Urgente do Gerente";
    else if (score === 3) retentionAction = "Manual ou Explicação Técnica";
    else if (score === 4) retentionAction = "E-mail com Cupom de 10% Desconto";
    else if (score === 5) retentionAction = "E-mail de Agradecimento Especial";

    const newRecord: PostSaleMetric = {
      id: Date.now().toString(),
      date: new Date().toISOString().split("T")[0],
      salesperson,
      customerName,
      status,
      satisfactionScore: score,
      comments,
      retentionAction
    };

    // Update charts dynamically in real-time
    const updatedMetrics = [newRecord, ...metrics];
    setMetrics(updatedMetrics);

    // Update status distribution graph
    const newDist = [...statusDistribution];
    const itemIndex = newDist.findIndex(item => item.name === status);
    if (itemIndex !== -1) {
      newDist[itemIndex].value += 1;
      setStatusDistribution(newDist);
    }

    // Reset Form Fields
    setCustomerName("");
    setComments("");
    alert("Avaliação de pós-venda cadastrada e gráficos atualizados!");
  };

  // Recharts color codes
  const COLORS = ["#059669", "#d97706", "#3b82f6", "#dc2626"];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-100 border-t-indigo-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6 text-zinc-100">
      {/* Overview Cards */}
      <div className="bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950 p-6 rounded-2xl border border-zinc-800 shadow-2xl">
        <h1 className="text-3xl font-display font-bold tracking-tight text-zinc-100">Análise de Pós-Venda</h1>
        <p className="text-zinc-400 mt-1 font-sans text-sm">
          Relatórios, gráficos de satisfação, NPS de consultores e controle de reversão de reclamações.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Real-time Trend Chart */}
        <div className="lg:col-span-2 bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <BarChart2 className="w-4 h-4 text-indigo-400" />
            Evolução Mensal da Satisfação (Média Geral)
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={satisfactionTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="mes" stroke="#71717a" fontSize={11} />
                <YAxis domain={[1, 5]} stroke="#71717a" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: "#18181b", borderColor: "#27272a", color: "#f4f4f5" }} />
                <Legend fontSize={11} />
                <Line type="monotone" dataKey="satisfacao" name="Satisfação (Estrelas)" stroke="#6366f1" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Distribution Pie Chart */}
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-sm space-y-4 flex flex-col justify-between">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            Distribuição dos Casos de Pós-Venda
          </h3>
          <div className="h-48 flex justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={70} fill="#8884d8" paddingAngle={5} dataKey="value">
                  {statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#18181b", borderColor: "#27272a", color: "#f4f4f5" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-zinc-400 pt-2 border-t border-zinc-800">
            {statusDistribution.map((entry, index) => (
              <div key={index} className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full inline-block" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span>{entry.name}: {entry.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Individual NPS Performance Chart */}
        <div className="lg:col-span-1 bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <UserCheck className="w-4 h-4 text-indigo-400" />
            Índice de Recomendação NPS por Vendedor
          </h3>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salespersonScores} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid stroke="#27272a" strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} stroke="#71717a" fontSize={11} />
                <YAxis dataKey="name" type="category" stroke="#71717a" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: "#18181b", borderColor: "#27272a", color: "#f4f4f5" }} />
                <Bar dataKey="NPS" name="Score NPS" fill="#f59e0b" radius={[0, 8, 8, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Log New Post Sales Form */}
        <div className="lg:col-span-2 bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
            <PlusCircle className="w-4 h-4 text-emerald-400" />
            Registrar Ocorrência de Pós-Venda
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-zinc-450 uppercase tracking-wide mb-1">Nome do Cliente</label>
              <input
                type="text"
                required
                placeholder="Ex: João da Silva"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-450 uppercase tracking-wide mb-1">Vendedor/Consultor</label>
              <select
                value={salesperson}
                onChange={(e) => setSalesperson(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-zinc-200 focus:outline-none"
              >
                <option value="Carlos Silva" className="bg-zinc-900">Carlos Silva</option>
                <option value="Ana Souza" className="bg-zinc-900">Ana Souza</option>
                <option value="Marcos Lima" className="bg-zinc-900">Marcos Lima</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-450 uppercase tracking-wide mb-1">Status da Ocorrência</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as any)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-zinc-200 focus:outline-none"
              >
                <option value="Resolvido" className="bg-zinc-900">Resolvido</option>
                <option value="Retorno Agendado" className="bg-zinc-900">Retorno Agendado</option>
                <option value="Em Aberto" className="bg-zinc-900">Em Aberto</option>
                <option value="Reclamação" className="bg-zinc-900">Reclamação</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-zinc-450 uppercase tracking-wide mb-1">Satisfação (Estrelas: 1 a 5)</label>
              <div className="flex gap-1 mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setScore(star)}
                    className="focus:outline-none"
                  >
                    <Star className={`w-6 h-6 ${star <= score ? "text-amber-550 fill-amber-550" : "text-zinc-700"}`} />
                  </button>
                ))}
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-zinc-450 uppercase tracking-wide mb-1">Comentários e Feedbacks</label>
              <textarea
                required
                rows={2}
                placeholder="Insira detalhes sobre o que o cliente falou ou qual peça/serviço precisa de atenção..."
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            <div className="sm:col-span-2 flex justify-end">
              <button
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition shadow-lg shadow-emerald-600/10"
              >
                Salvar Avaliação
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-zinc-900 rounded-2xl border border-zinc-800 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800">
          <h3 className="font-display font-semibold text-zinc-100 text-base flex items-center gap-1.5">
            <MessageSquare className="w-5 h-5 text-indigo-400" />
            Diário de Atendimentos do Pós-Venda
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-zinc-950/40 border-b border-zinc-800 text-zinc-400 font-bold text-xs uppercase tracking-wider">
                <th className="py-3.5 px-6">Data</th>
                <th className="py-3.5 px-6">Cliente</th>
                <th className="py-3.5 px-6">Consultor</th>
                <th className="py-3.5 px-6">Score</th>
                <th className="py-3.5 px-6">Feedback / Detalhes</th>
                <th className="py-3.5 px-6">Ação de Retenção Recomendada</th>
                <th className="py-3.5 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800/40 text-zinc-300 text-sm">
              {metrics.map((m) => (
                <tr key={m.id} className="hover:bg-zinc-800/30 transition">
                  <td className="py-4 px-6 text-xs text-zinc-500">{m.date}</td>
                  <td className="py-4 px-6 font-semibold text-zinc-200">{m.customerName}</td>
                  <td className="py-4 px-6">{m.salesperson}</td>
                  <td className="py-4 px-6">
                    <div className="flex gap-0.5">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={`w-4 h-4 ${star <= m.satisfactionScore ? "text-amber-500 fill-amber-500" : "text-zinc-800"}`} />
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-6 max-w-xs truncate text-xs text-zinc-400" title={m.comments}>
                    {m.comments}
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-zinc-950 border border-zinc-850 rounded-md text-zinc-300">
                      {m.retentionAction}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded-md ${
                      m.status === "Resolvido" ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" :
                      m.status === "Retorno Agendado" ? "bg-amber-500/10 border border-amber-500/20 text-amber-400" :
                      m.status === "Em Aberto" ? "bg-indigo-500/10 border border-indigo-500/20 text-indigo-400" :
                      "bg-rose-500/10 border border-rose-500/20 text-rose-400"
                    }`}>
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
