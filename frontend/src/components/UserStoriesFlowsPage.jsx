import AIChatWizard from "./AIChatWizard";

const tasks = [
  { id: 1, text: "Escrever user stories no formato correto" },
  { id: 2, text: "Mapear fluxos essenciais do produto" },
  { id: 3, text: "Identificar estados e exceções por fluxo" },
  { id: 4, text: "Alinhar histórias com critérios de aceite" },
];

const insights = [
  {
    icon: "message",
    title: "Histórias conectadas ao usuário",
    description:
      "Garanta que cada user story esteja vinculada a uma persona ou cenários reais para facilitar o alinhamento com design e engenharia.",
  },
  {
    icon: "target",
    title: "Critérios mensuráveis",
    description:
      "Adicione critérios de aceite objetivos para reduzir ambiguidades durante o desenvolvimento.",
  },
];

const documents = [
  { name: "Lista de User Stories - V1.md" },
  { name: "Fluxos de Usuário - V1.png" },
];

const UserStoriesFlowsPage = ({ onAdvanceStep }) => (
  <AIChatWizard
    title="User Stories & Fluxos"
    description="Transforme necessidades em histórias claras e fluxos navegáveis."
    placeholder="Descreva as histórias e fluxos principais que deseja mapear..."
    iaMessage="Vamos detalhar as user stories. Quem é o usuário, o que ele quer fazer e qual valor espera obter?"
    tasks={tasks}
    insights={insights}
    documents={documents}
    onAdvanceStep={onAdvanceStep}
  />
);

export default UserStoriesFlowsPage;
