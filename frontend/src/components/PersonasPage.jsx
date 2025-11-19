import AIChatWizard from "./AIChatWizard";

const tasks = [
  { id: 1, text: "Definir persona primária com dados demográficos" },
  { id: 2, text: "Registrar objetivos e dores principais" },
  { id: 3, text: "Mapear jornada e principais touchpoints" },
  { id: 4, text: "Validar personas com dados reais" },
];

const insights = [
  {
    icon: "lightbulb",
    title: "Humanize as personas",
    description:
      "Adicionar histórias reais ajuda o time a lembrar das dores e objetivos a cada iteração.",
  },
  {
    icon: "target",
    title: "Conexão com métricas",
    description:
      "Relacione cada persona com métricas de sucesso do produto para acompanhar impacto.",
  },
];

const documents = [
  { name: "Persona Primária - V1.pdf" },
  { name: "Mapa de Jornada - V1.png" },
];

const PersonasPage = ({ onAdvanceStep }) => (
  <AIChatWizard
    title="Personas"
    description="Crie representações claras dos seus usuários-alvo e conecte a visão do time."
    placeholder="Descreva nome, contexto, objetivos e frustrações da sua persona..."
    iaMessage="Conte quem é o usuário ideal do seu produto. Qual contexto ele vive, quais objetivos busca e como podemos ajudá-lo?"
    tasks={tasks}
    insights={insights}
    documents={documents}
    onAdvanceStep={onAdvanceStep}
  />
);

export default PersonasPage;
