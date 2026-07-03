import React, { useState } from "react";
import { BookOpen, HelpCircle, Check, ArrowRight, Bookmark } from "lucide-react";

export default function TemplateLibrary() {
  const [selectedTemplate, setSelectedTemplate] = useState("aula");

  const templatesInfo = {
    aula: {
      title: "Modelo de Plano de Aula (Formato Oficial Senac)",
      description: "Estrutura indicada para aulas teóricas, laboratórios de informática ou vivências profissionais práticas de curta duração.",
      structure: [
        "Cabeçalho Oficial (Curso, UC, Professor, Carga Horária, Modalidade)",
        "Objetivos de Aprendizagem (Alinhados com a BNCC e UCs)",
        "Competências & Habilidades Trabalhadas",
        "Estratégia Metodológica Ativa (Sala Invertida, Estudo de Caso, etc.)",
        "Recursos Didáticos Necessários (Físicos e Digitais)",
        "Cronograma Detalhado Minuto-a-Minuto (Abertura, Desenvolvimento, Fechamento)",
        "Critérios e Instrumentos de Avaliação (Diagnóstica, Formativa, Somativa)",
        "Observações Pedagógicas Adicionais"
      ]
    },
    curso: {
      title: "Modelo de Plano de Curso (Matriz de Qualificação)",
      description: "Estrutura indicada para organizar uma qualificação profissional inteira ou eixos de competência integrada.",
      structure: [
        "Justificativa Técnica de Mercado",
        "Objetivos Gerais e Específicos do Curso",
        "Perfil Profissional de Conclusão",
        "Organização Curricular (Módulos, UCs e Cargas Horárias)",
        "Metodologias de Ensino Propostas (STEAM, Maker, Design Thinking)",
        "Matriz de Avaliação (Formativa, Somativa e Critérios de Aprovação)",
        "Infraestrutura, Instalações e Equipamentos Requeridos",
        "Bibliografia Sugerida (Básica e Complementar)"
      ]
    },
    trabalho: {
      title: "Modelo de Plano de Trabalho Docente (PTD)",
      description: "Estrutura padrão de planejamento de trabalho por Unidade Curricular, baseada em Situações de Aprendizagem práticas.",
      structure: [
        "Identificação da UC e Carga Horária",
        "Situação de Aprendizagem Detalhada (Desafio Prático Real)",
        "Contextualização de Mercado (Cenários Reais)",
        "Roteiro de Atividades e Tarefas Práticas",
        "Estratégias Avaliativas Integradas",
        "Critérios de Desempenho e Indicadores de Competência",
        "Recursos Didáticos e Infraestrutura",
        "Evidências de Aprendizagem Esperadas"
      ]
    },
    acao: {
      title: "Modelo de Plano de Ação (Intervenção Pedagógica)",
      description: "Estrutura padrão para recuperação paralela, acompanhamento individualizado e engajamento escolar.",
      structure: [
        "Problema ou Dificuldade Identificada (Ex: Baixo engajamento)",
        "Diagnóstico Pedagógico do Aluno ou Turma",
        "Objetivos da Intervenção Pedagógica",
        "Estratégias de Recuperação Paralela (Estudos dirigidos, monitoria)",
        "Ações Detalhadas e Prazos de Execução",
        "Responsáveis (Professor, Aluno, Coordenação)",
        "Indicadores de Sucesso e Critérios de Reavaliação",
        "Evidências de Melhora de Competência"
      ]
    }
  };

  const current = templatesInfo[selectedTemplate as keyof typeof templatesInfo];

  return (
    <div className="space-y-6 text-zinc-100">
      <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 shadow-sm flex flex-col md:flex-row gap-6">
        {/* Navigation Buttons */}
        <div className="md:w-1/3 space-y-2 border-r border-zinc-800/80 pr-0 md:pr-6">
          <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-wider mb-3">Modelos Disponíveis</h3>
          {[
            { id: "aula", label: "Plano de Aula" },
            { id: "curso", label: "Plano de Curso" },
            { id: "trabalho", label: "Plano de Trabalho" },
            { id: "acao", label: "Plano de Ação" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedTemplate(item.id)}
              className={`w-full text-left px-4 py-3 rounded-xl text-xs font-semibold border transition flex items-center justify-between ${
                selectedTemplate === item.id
                  ? "bg-indigo-600 text-white border-indigo-500/20 shadow-md"
                  : "bg-zinc-950 text-zinc-400 border-zinc-800 hover:bg-zinc-800/80 hover:text-zinc-200"
              }`}
            >
              <span>{item.label}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ))}
        </div>

        {/* Display Structure Information */}
        <div className="md:w-2/3 space-y-4">
          <div className="flex items-center gap-2 text-indigo-400">
            <Bookmark className="w-5 h-5" />
            <h3 className="font-display font-semibold text-lg text-zinc-100">{current.title}</h3>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed">{current.description}</p>

          <div className="bg-zinc-950 p-5 rounded-2xl border border-zinc-800/80 space-y-3">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Estrutura de Conteúdo Requerida:</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {current.structure.map((step, index) => (
                <div key={index} className="flex items-start gap-2 text-xs text-zinc-300 leading-normal">
                  <div className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-[10px] font-bold text-indigo-400 shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
