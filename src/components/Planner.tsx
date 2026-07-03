import React, { useState, useEffect } from "react";
import { BookOpen, FileText, Settings, User, Sparkles, Download, Check, Save, RotateCcw, AlertTriangle } from "lucide-react";
import { Course, CurricularUnit, PedagogicalDocument, PlanType } from "../types";
import { coursesData as mockCourses } from "../data/curriculumData";

interface PlannerProps {
  onSave: (plan: Partial<PedagogicalDocument>) => Promise<PedagogicalDocument>;
}

export default function Planner({ onSave }: PlannerProps) {
  const [docType, setDocType] = useState<PlanType>("aula");
  const [selectedCourseId, setSelectedCourseId] = useState("");
  const [selectedUcId, setSelectedUnitId] = useState("");
  const [professorName, setProfessorName] = useState("");
  const [studentProfile, setStudentProfile] = useState("Jovens aprendizes, focados em inserção imediata no mercado de trabalho.");
  const [duration, setDuration] = useState("4 horas");
  const [customInstructions, setCustomInstructions] = useState("");
  
  // Pre-filled Curriculum States
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [selectedUc, setSelectedUc] = useState<CurricularUnit | null>(null);

  // Generation States
  const [isGenerating, setIsGenerating] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [generatedContent, setGeneratedContent] = useState("");
  const [isSaving, setIsGeneratingSave] = useState(false);
  const [docTitle, setDocTitle] = useState("");

  const loadingMessages = [
    "Consultando as diretrizes oficiais da BNCC...",
    "Estruturando os indicadores de avaliação da Unidade Curricular...",
    "Definindo metodologias ativas e gamificação...",
    "Calculando o cronograma detalhado minuto-a-minuto...",
    "Modelando instrumentos de avaliação diagnóstica e formativa...",
    "Polindo a justificativa e os recursos institucionais Senac...",
    "Finalizando o documento pedagógico de excelência..."
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isGenerating) {
      interval = setInterval(() => {
        setLoadingStep((prev) => {
          if (prev < loadingMessages.length - 1) {
            return prev + 1;
          }
          return prev;
        });
      }, 2500);
    } else {
      setLoadingStep(0);
    }
    return () => clearInterval(interval);
  }, [isGenerating]);

  // Handle Course Change
  const handleCourseChange = (courseId: string) => {
    setSelectedCourseId(courseId);
    const course = mockCourses.find((c) => c.id === courseId) || null;
    setSelectedCourse(course);
    setSelectedUnitId("");
    setSelectedUc(null);
  };

  // Handle UC Change
  const handleUcChange = (ucId: string) => {
    setSelectedUnitId(ucId);
    if (selectedCourse) {
      const uc = selectedCourse.ucs.find((u) => u.id === ucId) || null;
      setSelectedUc(uc);
      if (uc) {
        setDocTitle(`${docType.toUpperCase()}: ${uc.name}`);
      }
    }
  };

  // Trigger Pedagogical AI Generation
  const handleGenerate = async () => {
    if (!selectedCourse || !selectedUc) return;

    setIsGenerating(true);
    setGeneratedContent("");

    try {
      const response = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: docType,
          course: selectedCourse,
          uc: selectedUc,
          customInstructions,
          professorName,
          studentProfile,
          duration,
        }),
      });

      const data = await response.json();
      if (data.error) {
        setGeneratedContent(`### Erro na Geração\n\n${data.error}`);
      } else {
        setGeneratedContent(data.content);
      }
    } catch (error) {
      setGeneratedContent(`### Falha de Comunicação\n\nNão foi possível obter resposta do servidor de IA. Por favor, tente novamente.`);
    } finally {
      setIsGenerating(false);
    }
  };

  // Save Generated Plan to DB
  const handleSavePlan = async () => {
    if (!docTitle || !generatedContent || !selectedCourse || !selectedUc) return;

    setIsGeneratingSave(true);
    try {
      await onSave({
        title: docTitle,
        type: docType,
        courseId: selectedCourse.id,
        courseName: selectedCourse.name,
        curricularUnitId: selectedUc.id,
        curricularUnitName: selectedUc.name,
        content: generatedContent,
        metadata: {
          workload: duration,
          professor: professorName,
          studentProfile,
          customInstructions,
        } as any,
      });
      alert("Planejamento pedagógico salvo com sucesso!");
    } catch (error) {
      alert("Falha ao salvar planejamento.");
    } finally {
      setIsGeneratingSave(false);
    }
  };

  // Direct Browser Print Utility
  const handlePrint = () => {
    const printWindow = window.open("", "_blank");
    if (!printWindow) return;
    
    printWindow.document.write(`
      <html>
        <head>
          <title>${docTitle}</title>
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
          <h1>${docTitle}</h1>
          <div class="header-info">
            <div><strong>Curso:</strong> ${selectedCourse?.name}</div>
            <div><strong>CBO / Código:</strong> ${selectedCourse?.cbo}</div>
            <div><strong>Unidade Curricular:</strong> ${selectedUc?.name}</div>
            <div><strong>Carga Horária:</strong> ${duration}</div>
            <div><strong>Docente:</strong> ${professorName || "Não especificado"}</div>
            <div><strong>Perfil do Aluno:</strong> ${studentProfile}</div>
          </div>
          <div style="white-space: pre-wrap;">${generatedContent}</div>
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
      <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-sm">
        <h2 className="text-2xl font-display font-semibold text-zinc-100 flex items-center gap-2">
          <Settings className="w-6 h-6 text-indigo-400" />
          Gerador Inteligente de Planejamento
        </h2>
        <p className="text-zinc-400 text-sm mt-1">
          Selecione a Unidade Curricular e os parâmetros. O motor pedagógico carregará os conhecimentos e o preenchimento automático.
        </p>

        {/* Input Parameters Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Left Column: Selections */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-450 mb-2">
                Tipo de Planejamento
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: "aula", label: "Plano de Aula" },
                  { id: "curso", label: "Plano de Curso" },
                  { id: "trabalho", label: "Plano Trabalho" },
                  { id: "acao", label: "Plano de Ação" },
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setDocType(type.id as PlanType)}
                    className={`py-2 text-xs font-semibold rounded-xl border transition-all ${
                      docType === type.id
                        ? "bg-indigo-600 text-white border-indigo-500/20 shadow-md shadow-indigo-600/10"
                        : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:bg-zinc-800/80 hover:text-zinc-200"
                    }`}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-450 mb-1.5">
                Nome do Curso
              </label>
              <select
                value={selectedCourseId}
                onChange={(e) => handleCourseChange(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              >
                <option value="">Selecione um curso...</option>
                {mockCourses.map((c) => (
                  <option key={c.id} value={c.id} className="bg-zinc-900 text-zinc-200">
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedCourse && (
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-450 mb-1.5">
                  Unidade Curricular (UC)
                </label>
                <select
                  value={selectedUcId}
                  onChange={(e) => handleUcChange(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
                >
                  <option value="">Selecione uma UC...</option>
                  {selectedCourse.ucs.map((u) => (
                    <option key={u.id} value={u.id} className="bg-zinc-900 text-zinc-200">
                      {u.name} ({u.workload} horas)
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-450 mb-1.5">
                  Nome do Professor
                </label>
                <input
                  type="text"
                  placeholder="Ex: Prof. José Silva"
                  value={professorName}
                  onChange={(e) => setProfessorName(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-200 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-zinc-450 mb-1.5">
                  Carga Horária (Planejamento)
                </label>
                <input
                  type="text"
                  placeholder="Ex: 4 horas, 12 horas"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-200 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-450 mb-1.5">
                Perfil da Turma
              </label>
              <textarea
                rows={2}
                value={studentProfile}
                onChange={(e) => setStudentProfile(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-200 focus:outline-none"
              />
            </div>
          </div>

          {/* Right Column: Custom Inst / Prefills */}
          <div className="flex flex-col justify-between space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-450 mb-1.5">
                Instruções Personalizadas (IA)
              </label>
              <textarea
                rows={4}
                placeholder="Ex: 'Utilizar dinâmicas gamificadas de rotação por estações.' ou 'Focar na situação de aprendizagem fictícia sobre uma concessionária de carros.'"
                value={customInstructions}
                onChange={(e) => setCustomInstructions(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-3 text-sm text-zinc-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
              />
            </div>

            {selectedUc && (
              <div className="bg-zinc-950/50 p-4 rounded-2xl border border-zinc-850 flex-grow overflow-y-auto max-h-56 space-y-3">
                <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wide">
                  Motor Pedagógico - Preenchimento Automático:
                </h4>
                <div>
                  <h5 className="text-[10px] font-bold text-indigo-450 uppercase">Indicadores da Unidade:</h5>
                  <ul className="list-disc pl-4 text-xs text-zinc-400 mt-1 space-y-1">
                    {selectedUc.indicators.slice(0, 3).map((ind, i) => (
                      <li key={i}>{ind}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="text-[10px] font-bold text-emerald-400 uppercase">Sugestões de Habilidades:</h5>
                  <p className="text-xs text-zinc-400 mt-0.5">{selectedUc.skills.join(", ") || "Habilidades carregadas dinamicamente."}</p>
                </div>
              </div>
            )}

            <button
              onClick={handleGenerate}
              disabled={!selectedCourse || !selectedUc || isGenerating}
              className={`w-full py-3.5 flex items-center justify-center gap-2 rounded-xl text-sm font-bold transition shadow-lg ${
                selectedCourse && selectedUc && !isGenerating
                  ? "bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/20 border border-indigo-500/20"
                  : "bg-zinc-950 text-zinc-600 border border-zinc-800 cursor-not-allowed"
              }`}
            >
              <Sparkles className="w-5 h-5 shrink-0" />
              {isGenerating ? "Gerando Planejamento Inteligente..." : "Gerar com IA Pedagógica"}
            </button>
          </div>
        </div>
      </div>

      {/* Loading State Section */}
      {isGenerating && (
        <div className="bg-zinc-900 text-zinc-100 p-8 rounded-2xl border border-zinc-800 flex flex-col items-center text-center shadow-xl space-y-4">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-4 border-zinc-850 border-t-indigo-500 animate-spin" />
            <Sparkles className="w-6 h-6 text-indigo-400 animate-pulse" />
          </div>
          <div>
            <h4 className="text-lg font-display font-semibold text-zinc-100">Geração de Alta Fidelidade em Progresso</h4>
            <p className="text-zinc-400 text-sm mt-1 max-w-md">
              {loadingMessages[loadingStep]}
            </p>
          </div>
          <p className="text-[10px] text-zinc-500">Isso pode levar de 15 a 30 segundos enquanto nosso motor desenha as dinâmicas minuto-a-minuto.</p>
        </div>
      )}

      {/* Output Panel Section */}
      {generatedContent && (
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-zinc-800">
            <div className="flex-grow">
              <label className="text-xs font-bold text-zinc-500 uppercase tracking-wide">Título do Documento</label>
              <input
                type="text"
                value={docTitle}
                onChange={(e) => setDocTitle(e.target.value)}
                className="text-lg font-bold font-display text-zinc-100 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2 w-full mt-1"
              />
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
              <button
                onClick={handlePrint}
                className="flex items-center gap-1.5 px-4 py-2 border border-zinc-800 text-zinc-300 font-semibold rounded-xl text-xs hover:bg-zinc-800 transition"
              >
                <Download className="w-4 h-4" />
                Imprimir / PDF
              </button>
              <button
                onClick={handleSavePlan}
                disabled={isSaving}
                className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 text-white font-semibold rounded-xl text-xs hover:bg-emerald-500 transition"
              >
                <Save className="w-4 h-4" />
                {isSaving ? "Salvando..." : "Salvar no Banco"}
              </button>
            </div>
          </div>

          <div className="bg-zinc-950 p-6 rounded-2xl border border-zinc-800 font-sans text-sm text-zinc-300 leading-relaxed overflow-y-auto max-h-[600px] whitespace-pre-wrap">
            {generatedContent}
          </div>
        </div>
      )}
    </div>
  );
}
