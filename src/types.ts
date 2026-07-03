export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  cbo: string;
  axis: string;
  segment: string;
  workloadTheoretical: number;
  workloadPractical: number;
  workloadTotal: number;
  description: string;
  ucs: CurricularUnit[];
}

export interface CurricularUnit {
  id: string;
  name: string;
  workload: number;
  indicators: string[];
  knowledges: string[];
  skills: string[];
  attitudes: string[];
  product?: string;
}

export type PlanType = 'aula' | 'curso' | 'trabalho' | 'acao';

export interface PedagogicalDocument {
  id: string;
  title: string;
  type: 'aula' | 'curso' | 'trabalho' | 'acao';
  courseId: string;
  courseName: string;
  curricularUnitId: string;
  curricularUnitName: string;
  createdAt: string;
  updatedAt: string;
  content: string; // Markdown or detailed text
  metadata: {
    workload?: string;
    professor?: string;
    studentProfile?: string;
    learningSituation?: string;
    lessonTopic?: string;
    projectProblem?: string;
    methodologies?: string[];
    objectives?: string;
    diagnostics?: string;
    actions?: string[];
    responsibles?: string;
    timeline?: string;
    evaluation?: string;
  };
}

export interface PostSaleMetric {
  id: string;
  date: string;
  salesperson: string;
  customerName: string;
  status: 'Resolvido' | 'Em Aberto' | 'Retorno Agendado' | 'Reclamação';
  satisfactionScore: number; // 1 to 5
  comments: string;
  retentionAction: string;
}
