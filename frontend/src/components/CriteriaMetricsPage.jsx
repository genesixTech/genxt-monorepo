import AIChatWizard from "./AIChatWizard";

const tasks = [
  { id: 1, text: "Definir métricas norteadoras (North Star / KPIs)" },
  { id: 2, text: "Criar critérios de sucesso para o lançamento" },
  { id: 3, text: "Planejar monitoramento contínuo" },
  { id: 4, text: "Conectar métricas às etapas do roadmap" },
];

const insights = [
  {
    icon: "trend",
    title: "Métricas acionáveis",
    description:
      "Dê preferência a métricas que podem ser influenciadas diretamente pelo time de produto.",
  },
  {
    icon: "target",
    title: "Critérios alinhados ao negócio",
    description:
      "Garanta que os critérios de sucesso reflitam objetivos estratégicos e expectativas das partes interessadas.",
  },
];

const documents = [
  { name: "Painel de KPIs - V1.xlsx" },
  { name: "Critérios de Sucesso - V1.md" },
];

const CriteriaMetricsPage = ({ onAdvanceStep }) => (
  <AIChatWizard
    title="Critérios & Métricas"
    description="Defina KPIs, critérios de sucesso e alinhamento das metas."
    placeholder="Liste as métricas principais, os critérios de sucesso e como serão monitorados..."
    iaMessage="Quais indicadores mostram que esta etapa teve sucesso? Compartilhe métricas, thresholds e como pretende acompanhar resultados."
    tasks={tasks}
    insights={insights}
    documents={documents}
    onAdvanceStep={onAdvanceStep}
  />
);

export default CriteriaMetricsPage;
