import AIChatWizard from "./AIChatWizard";

const tasks = [
  { id: 1, text: "Escolher fidelidade e ferramentas do protótipo" },
  { id: 2, text: "Construir fluxos principais do MVP" },
  { id: 3, text: "Rodar testes rápidos de usabilidade" },
  { id: 4, text: "Registrar aprendizados para ajustes" },
];

const insights = [
  {
    icon: "lightbulb",
    title: "Teste cedo",
    description:
      "Mesmo protótipos simples ajudam a expor problemas de navegação e copy antes de investir em desenvolvimento.",
  },
  {
    icon: "target",
    title: "Alinhe feedbacks",
    description:
      "Relacionar feedbacks às hipóteses do discovery ajuda a priorizar ajustes críticos.",
  },
];

const documents = [
  { name: "Link do Protótipo - V1" },
  { name: "Relatório de Testes - V1.pdf" },
];

const PrototypePage = ({ onAdvanceStep }) => (
  <AIChatWizard
    title="Protótipo"
    description="Crie protótipos navegáveis, valide fluxo e registre aprendizados."
    placeholder="Conte quais fluxos foram prototipados e quais resultados surgiram nos testes..."
    iaMessage="Descreva o escopo do protótipo, ferramentas usadas e aprendizados de usabilidade para ajustarmos o documento da etapa."
    tasks={tasks}
    insights={insights}
    documents={documents}
    onAdvanceStep={onAdvanceStep}
  />
);

export default PrototypePage;
