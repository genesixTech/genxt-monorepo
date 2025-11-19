import AIChatWizard from "./AIChatWizard";

const tasks = [
  { id: 1, text: "Consolidar visão, objetivos e métricas" },
  { id: 2, text: "Descrever requisitos funcionais e não funcionais" },
  { id: 3, text: "Listar dependências e riscos conhecidos" },
  { id: 4, text: "Revisar com stakeholders chave" },
];

const insights = [
  {
    icon: "lightbulb",
    title: "Documento vivo",
    description:
      "Trate o PRD como uma fonte única de verdade. Atualize sempre que surgirem mudanças relevantes.",
  },
  {
    icon: "trend",
    title: "Contexto gera alinhamento",
    description:
      "Inclua links para pesquisas, protótipos e métricas para reduzir dúvidas durante o desenvolvimento.",
  },
];

const documents = [
  { name: "PRD - V1.docx" },
  { name: "Resumo Executivo - V1.pdf" },
];

const PRDFinalPage = ({ onAdvanceStep }) => (
  <AIChatWizard
    title="PRD Final"
    description="Finalize o documento de requisitos com todas as decisões e artefatos relevantes."
    placeholder="Liste requisitos, critérios de aceite e contexto do PRD..."
    iaMessage="Vamos consolidar o PRD. Quais requisitos, premissas e decisões precisam ficar registrados nesta versão final?"
    tasks={tasks}
    insights={insights}
    documents={documents}
    onAdvanceStep={onAdvanceStep}
  />
);

export default PRDFinalPage;
