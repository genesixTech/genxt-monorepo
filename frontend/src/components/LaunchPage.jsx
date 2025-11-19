import AIChatWizard from "./AIChatWizard";

const tasks = [
  { id: 1, text: "Definir estratégia de go-to-market" },
  { id: 2, text: "Planejar comunicação e materiais de lançamento" },
  { id: 3, text: "Organizar suporte e monitoramento pós-lançamento" },
  { id: 4, text: "Estabelecer metas e indicadores de pós-lançamento" },
];

const insights = [
  {
    icon: "trend",
    title: "Momento da verdade",
    description:
      "Prepare canais de comunicação, treinamento interno e monitoramento em tempo real para reagir rápido aos primeiros usuários.",
  },
  {
    icon: "alert",
    title: "Planos de contingência",
    description:
      "Liste riscos e planos de ação caso algo dê errado durante o lançamento para evitar surpresas.",
  },
];

const documents = [
  { name: "Plano de Lançamento - V1.pptx" },
  { name: "Checklist Pós-Lançamento - V1.md" },
];

const LaunchPage = ({ onAdvanceStep }) => (
  <AIChatWizard
    title="Lançamento"
    description="Planeje a estratégia, comunicação e acompanhamento do go-to-market."
    placeholder="Descreva canais, cronograma e indicadores do lançamento..."
    iaMessage="Quais são os elementos essenciais do seu go-to-market? Compartilhe mensagens-chave, canais e expectativas de resultados."
    tasks={tasks}
    insights={insights}
    documents={documents}
    onAdvanceStep={onAdvanceStep}
  />
);

export default LaunchPage;
