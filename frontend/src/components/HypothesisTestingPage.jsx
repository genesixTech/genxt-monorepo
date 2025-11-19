import AIChatWizard from "./AIChatWizard";

const tasks = [
  { id: 1, text: "Listar hipóteses priorizadas" },
  { id: 2, text: "Definir métricas de sucesso para cada hipótese" },
  { id: 3, text: "Selecionar experimentos e ferramentas" },
  { id: 4, text: "Executar testes e registrar aprendizados" },
];

const insights = [
  {
    icon: "target",
    title: "Clareza nos resultados",
    description:
      "Associe cada hipótese a uma métrica quantitativa para facilitar a tomada de decisão.",
  },
  {
    icon: "alert",
    title: "Falhas são dados",
    description:
      "Hipóteses invalidadas também geram valor. Documente o porquê para evitar retrabalho futuro.",
  },
];

const documents = [
  { name: "Planilha de Testes - V2.xlsx" },
  { name: "Relatório de Experimentos - V1.pdf" },
];

const HypothesisTestingPage = ({ onAdvanceStep }) => (
  <AIChatWizard
    title="Teste de Hipóteses"
    description="Organize os experimentos, registre resultados e evolua o produto baseado em dados."
    placeholder="Descreva a hipótese, o experimento e qual métrica comprova o resultado..."
    iaMessage="Quais hipóteses você quer validar nesta etapa? Conte a suposição, a métrica que comprova e o experimento desejado."
    tasks={tasks}
    insights={insights}
    documents={documents}
    onAdvanceStep={onAdvanceStep}
  />
);

export default HypothesisTestingPage;
