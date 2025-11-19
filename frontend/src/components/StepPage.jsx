import AIChatWizard from "./AIChatWizard";

const StepPage = ({ stepData, onAdvanceStep }) => (
  <AIChatWizard
    title={stepData.title}
    description={stepData.description}
    placeholder={stepData.placeholder}
    iaMessage={stepData.iaMessage}
    tasks={stepData.tasks}
    insights={stepData.insights}
    documents={stepData.documents}
    onAdvanceStep={onAdvanceStep}
  />
);

export default StepPage;
