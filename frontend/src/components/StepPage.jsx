import AIChatWizard from "./AIChatWizard";

const THEME_PRESETS = {
  "contexto-problema": {
    gradientFrom: "#e0f2fe",
    gradientTo: "#bae6fd",
    headerIcon: "lightbulb",
    iconBg: "from-sky-500 to-blue-500",
  },
  discovery: {
    gradientFrom: "#ede9fe",
    gradientTo: "#ddd6fe",
    headerIcon: "trend",
    iconBg: "from-indigo-500 to-purple-500",
  },
};

const INFO_PRESETS = {
  "contexto-problema": [
    {
      icon: "lightbulb",
      title: "Checklist de Contexto",
      items: [
        { label: "Mercado", value: "Segmento, público e oportunidade" },
        { label: "Problema", value: "Dor observada e impacto" },
        { label: "Evidências", value: "Dados, pesquisas e entrevistas" },
      ],
    },
  ],
  discovery: [
    {
      icon: "trend",
      title: "Hipóteses iniciais",
      items: [
        { label: "Suposição", value: "O que acreditamos ser verdade" },
        { label: "Confirmação", value: "Dados que precisamos coletar" },
        { label: "Risco", value: "O que acontece se estiver errado" },
      ],
    },
  ],
};

const StepPage = ({ stepData, onAdvanceStep }) => {
  const theme = stepData.theme || THEME_PRESETS[stepData.id];
  const infoBlocks = stepData.infoBlocks || INFO_PRESETS[stepData.id];

  return (
    <AIChatWizard
      title={stepData.title}
      description={stepData.description}
      placeholder={stepData.placeholder}
      iaMessage={stepData.iaMessage}
      tasks={stepData.tasks}
      insights={stepData.insights}
      documents={stepData.documents}
      infoBlocks={infoBlocks}
      theme={theme}
      onAdvanceStep={onAdvanceStep}
    />
  );
};

export default StepPage;
