import { useState, useEffect } from "react";
import "./App.css";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Header from "./components/Header";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import Dashboard from "./components/Dashboard";
import Wizard from "./components/Wizard.jsx";
import StepPage from "./components/StepPage";
import DocumentsPage from "./components/DocumentsPage";
import DocumentDetailPage1 from "./components/DocumentDetailPage1";
import DocumentDetailPage2 from "./components/DocumentDetailPage2";
import DocumentDetailPage3 from "./components/DocumentDetailPage3";
import CollaboratorsPage from "./components/CollaboratorsPage";
import AnalyticsPage from "./components/AnalyticsPage";
import UserProfilePage from "./components/UserProfilePage";
import NotificationOverlay from "./components/NotificationOverlay";
import SettingsPage from "./components/SettingsPage";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import ForgotPasswordPage from "./components/ForgotPasswordPage";
import SWOTCSDPage from "./components/SWOTCSDPage";
import PersonasPage from "./components/PersonasPage";
import UserResearchPage from "./components/UserResearchPage";
import HypothesisTestingPage from "./components/HypothesisTestingPage";
import FeaturesPage from "./components/FeaturesPage";
import UserStoriesFlowsPage from "./components/UserStoriesFlowsPage";
import CriteriaMetricsPage from "./components/CriteriaMetricsPage";
import RoadmapBacklogPage from "./components/RoadmapBacklogPage";
import PrototypePage from "./components/PrototypePage";
import PRDFinalPage from "./components/PRDFinalPage";
import LaunchPage from "./components/LaunchPage";

const stepData = {
  "contexto-problema": {
    id: "contexto-problema",
    title: "Contexto e Problema",
    description:
      "Identificação inicial do problema e da oportunidade de mercado.",
    iaMessage:
      "E disse a IA: que haja contexto! ✨\n\nPara começarmos, me conte sobre o problema que seu produto busca resolver e o contexto atual do mercado. Qual a dor principal do seu usuário?",
    placeholder: "Descreva o problema e o contexto...",
    tasks: [
      { id: 1, text: "Definir o problema central" },
      { id: 2, text: "Analisar o cenário atual do mercado" },
      { id: 3, text: "Identificar a dor principal do usuário" },
      { id: 4, text: "Pesquisar soluções existentes" },
    ],
  },
  discovery: {
    id: "discovery",
    title: "Discovery",
    description: "Exploração do problema e levantamento de hipóteses iniciais",
    iaMessage:
      "Hora do Discovery! 🔍\n\nAgora que entendemos o problema, vamos explorar as oportunidades. Quais são as hipóteses iniciais que você tem para a solução? Quais funcionalidades você imagina?",
    placeholder: "Compartilhe suas hipóteses e ideias de funcionalidades...",
    tasks: [
      { id: 1, text: "Levantar hipóteses de solução" },
      { id: 2, text: "Brainstorm de funcionalidades" },
      { id: 3, text: "Mapear stakeholders" },
      { id: 4, text: "Definir escopo inicial" },
    ],
  },
  "swot-csd": {
    id: "swot-csd",
    title: "SWOT e CSD",
    component: SWOTCSDPage,
    description: "Análise de Forças, Fraquezas, Oportunidades, Ameaças e Matriz CSD (Certezas, Suposições, Dúvidas).",
    iaMessage: "Análise Estratégica! 📊\n\nVamos consolidar o entendimento do projeto com uma análise SWOT e a Matriz CSD. Quais são os pontos fortes e fracos do seu produto? O que é certeza, suposição e dúvida?",
    placeholder: "Preencha a análise SWOT e a Matriz CSD...",
  },
  personas: {
    id: "personas",
    title: "Personas",
    component: PersonasPage,
    description: "Criação de Personas para representar os usuários-alvo.",
    iaMessage: "Conheça seu Usuário! 🧑‍💻\n\nDescreva suas Personas. Quem são eles? Quais são seus objetivos, frustrações e como seu produto se encaixa na vida deles?",
    placeholder: "Crie suas Personas...",
  },
  "user-research": {
    id: "user-research",
    title: "Pesquisa de Usuário",
    component: UserResearchPage,
    description: "Planejamento e execução da pesquisa de usuário.",
    iaMessage: "Pesquisa em Ação! 📝\n\nQuais métodos de pesquisa você usará? Quais perguntas você precisa responder para validar suas hipóteses?",
    placeholder: "Planeje sua pesquisa...",
  },
  "hypothesis-testing": {
    id: "hypothesis-testing",
    title: "Teste de Hipóteses",
    component: HypothesisTestingPage,
    description: "Definição e teste das hipóteses de solução.",
    iaMessage: "Hora de Testar! ✅\n\nQuais hipóteses você vai testar? Como você vai medir o sucesso ou o fracasso de cada teste?",
    placeholder: "Defina seus testes de hipóteses...",
  },
  features: {
    id: "features",
    title: "Features",
    component: FeaturesPage,
    description: "Definição e priorização das funcionalidades do produto.",
    iaMessage: "O que o Produto Faz? ⚙️\n\nListe e priorize as funcionalidades. Use métodos como MoSCoW ou Kano. Quais são as essenciais (Must Have)?",
    placeholder: "Liste e priorize as funcionalidades...",
  },
  "user-stories-flows": {
    id: "user-stories-flows",
    title: "User Stories e Fluxos",
    component: UserStoriesFlowsPage,
    description: "Criação de User Stories e mapeamento dos fluxos de usuário.",
    iaMessage: "Como o Usuário Interage? 🗺️\n\nEscreva as User Stories no formato 'Como um [tipo de usuário], eu quero [objetivo], para que [benefício]'. Mapeie os fluxos principais.",
    placeholder: "Crie as User Stories e os fluxos...",
  },
  "criteria-metrics": {
    id: "criteria-metrics",
    title: "Critérios e Métricas",
    component: CriteriaMetricsPage,
    description: "Definição dos critérios de sucesso e métricas (KPIs).",
    iaMessage: "O que é Sucesso? 🌟\n\nDefina os critérios de sucesso para o lançamento e as métricas (KPIs) que você usará para medir o desempenho do produto.",
    placeholder: "Defina critérios e métricas...",
  },
  "roadmap-backlog": {
    id: "roadmap-backlog",
    title: "Roadmap e Backlog",
    component: RoadmapBacklogPage,
    description: "Criação do Roadmap e do Backlog do produto.",
    iaMessage: "Onde Vamos? 🛣️\n\nOrganize as funcionalidades no Roadmap (curto, médio e longo prazo) e detalhe o Backlog para as próximas iterações.",
    placeholder: "Crie o Roadmap e o Backlog...",
  },
  prototype: {
    id: "prototype",
    title: "Protótipo",
    component: PrototypePage,
    description: "Criação e teste do protótipo de alta fidelidade.",
    iaMessage: "Mãos à Obra! 🎨\n\nDescreva o protótipo. Quais são as telas principais? Quais ferramentas você usou? Quais foram os resultados dos testes de usabilidade?",
    placeholder: "Descreva o protótipo e os testes...",
  },
  "prd-final": {
    id: "prd-final",
    title: "PRD Final",
    component: PRDFinalPage,
    description: "Documento de Requisitos de Produto (PRD) finalizado.",
    iaMessage: "O Documento Mestre! 📜\n\nRevise e finalize o PRD. Ele deve conter todas as informações necessárias para o time de desenvolvimento.",
    placeholder: "Finalize o PRD...",
  },
  launch: {
    id: "launch",
    title: "Lançamento",
    component: LaunchPage,
    description: "Plano de lançamento e estratégia Go-to-Market.",
    iaMessage: "Pronto para o Mundo! 🚀\n\nQual é o seu plano de lançamento? Qual a estratégia de marketing e vendas? Como você vai medir o sucesso pós-lançamento?",
    placeholder: "Crie o plano de lançamento...",
  },
  // Adicionar dados para outras etapas aqui
};
    id: "discovery",
    title: "Discovery",
    description: "Exploração do problema e levantamento de hipóteses iniciais",
    iaMessage:
      "Hora do Discovery! 🔍\n\nAgora que entendemos o problema, vamos explorar as oportunidades. Quais são as hipóteses iniciais que você tem para a solução? Quais funcionalidades você imagina?",
    placeholder: "Compartilhe suas hipóteses e ideias de funcionalidades...",
    tasks: [
      { id: 1, text: "Levantar hipóteses de solução" },
      { id: 2, text: "Brainstorm de funcionalidades" },
      { id: 3, text: "Mapear stakeholders" },
      { id: 4, text: "Definir escopo inicial" },
    ],
  },
  // Adicionar dados para outras etapas aqui
};

// Componente principal da aplicação
function AppContent() {
  const { isAuthenticated, isLoading, user, login, register, logout } = useAuth();
  const [activePage, setActivePage] = useState("dashboard");
  const [isRightSidebarCollapsed, setIsRightSidebarCollapsed] = useState(false);
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1); // Remove o #
      if (hash) {
        setActivePage(hash);
      } else {
        // Se não há hash e usuário está autenticado, ir para dashboard
        if (isAuthenticated) {
          setActivePage("dashboard");
        } else {
          setActivePage("login");
        }
      }
    };

    // Verificar hash inicial
    handleHashChange();

    // Escutar mudanças no hash
    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [isAuthenticated]);

  // Redirecionar para login se não autenticado
  useEffect(() => {
    if (!isLoading && !isAuthenticated && !['login', 'register', 'forgot-password'].includes(activePage)) {
      setActivePage("login");
      window.location.hash = "login";
    }
  }, [isAuthenticated, isLoading, activePage]);

  const handleNavigate = (page) => {
    setActivePage(page);
    window.location.hash = page;
  };

  const handleToggleRightSidebar = () => {
    setIsRightSidebarCollapsed(!isRightSidebarCollapsed);
  };

  const handleOpenWizard = () => {
    setIsWizardOpen(true);
  };

  const handleCloseWizard = () => {
    setIsWizardOpen(false);
  };

  const handleOpenNotification = () => {
    setIsNotificationOpen(true);
  };

  const handleCloseNotification = () => {
    setIsNotificationOpen(false);
  };

  const handleLogin = async (email, password) => {
    try {
      await login(email, password);
      handleNavigate('dashboard');
    } catch (error) {
      throw error;
    }
  };

  const handleRegister = async (userData) => {
    try {
      await register(userData);
      handleNavigate('dashboard');
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = async () => {
    await logout();
    handleNavigate('login');
  };

  // Loading screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
            <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">GenesiX</h2>
          <p className="text-gray-600">Carregando sua experiência...</p>
        </div>
      </div>
    );
  }

  // Páginas de autenticação (sem layout principal)
  if (['login', 'register', 'forgot-password'].includes(activePage)) {
    return (
      <div>
        {activePage === 'login' && (
          <LoginPage 
            onNavigate={handleNavigate} 
            onLogin={handleLogin}
          />
        )}
        {activePage === 'register' && (
          <RegisterPage 
            onNavigate={handleNavigate} 
            onRegister={handleRegister}
          />
        )}
        {activePage === 'forgot-password' && (
          <ForgotPasswordPage onNavigate={handleNavigate} />
        )}
      </div>
    );
  }

  // Layout principal da aplicação (apenas para usuários autenticados)
  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      <Header
        onNavigate={handleNavigate}
        onOpenNotification={handleOpenNotification}
        onLogout={handleLogout}
        user={user}
      />

      <LeftSidebar activeStep="discovery" onStepChange={handleNavigate} />

      {isNotificationOpen && (
        <NotificationOverlay
          isOpen={handleOpenNotification}
          onClose={handleCloseNotification}
        />
      )}

      <main
        className={`flex-1 overflow-auto pt-16 transition-all duration-300 ${isRightSidebarCollapsed ? "mr-16" : "mr-64"} ml-64`}
      >
        {activePage === "dashboard" && (
          <Dashboard
            onNavigate={handleNavigate}
            onOpenWizard={handleOpenWizard}
          />
        )}
        {activePage === "documents" && <DocumentsPage />}
        {activePage === "documents-step-1" && (
          <DocumentDetailPage1 onBack={() => handleNavigate("documents")} />
        )}
        {activePage === "documents-step-2" && (
          <DocumentDetailPage2 onBack={() => handleNavigate("documents")} />
        )}
        {activePage === "documents-step-3" && (
          <DocumentDetailPage3 onBack={() => handleNavigate("documents")} />
        )}
        {activePage === "collaboration" && <CollaboratorsPage />}
        {activePage === "analytics" && <AnalyticsPage />}
        {activePage === "profile" && <UserProfilePage />}
        {activePage === "settings" && <SettingsPage />}
        {activePage === "contexto-problema" && (
          <StepPage
            stepData={stepData["contexto-problema"]}
            onAdvanceStep={() => handleNavigate("discovery")}
          />
        )}
        {activePage === "discovery" && (
          <StepPage
            stepData={stepData["discovery"]}
            onAdvanceStep={() => handleNavigate("swot-csd")}
          />
        )}
        {activePage === "swot-csd" && <SWOTCSDPage onAdvanceStep={() => handleNavigate("personas")} />}
        {activePage === "personas" && <PersonasPage onAdvanceStep={() => handleNavigate("user-research")} />}
        {activePage === "user-research" && <UserResearchPage onAdvanceStep={() => handleNavigate("hypothesis-testing")} />}
        {activePage === "hypothesis-testing" && <HypothesisTestingPage onAdvanceStep={() => handleNavigate("features")} />}
        {activePage === "features" && <FeaturesPage onAdvanceStep={() => handleNavigate("user-stories-flows")} />}
        {activePage === "user-stories-flows" && <UserStoriesFlowsPage onAdvanceStep={() => handleNavigate("criteria-metrics")} />}
        {activePage === "criteria-metrics" && <CriteriaMetricsPage onAdvanceStep={() => handleNavigate("roadmap-backlog")} />}
        {activePage === "roadmap-backlog" && <RoadmapBacklogPage onAdvanceStep={() => handleNavigate("prototype")} />}
        {activePage === "prototype" && <PrototypePage onAdvanceStep={() => handleNavigate("prd-final")} />}
        {activePage === "prd-final" && <PRDFinalPage onAdvanceStep={() => handleNavigate("launch")} />}
        {activePage === "launch" && <LaunchPage onAdvanceStep={() => handleNavigate("dashboard")} />}
      </main>

      <RightSidebar
        collapsed={isRightSidebarCollapsed}
        onToggle={handleToggleRightSidebar}
      />
      {isWizardOpen && <Wizard onClose={handleCloseWizard} />}
    </div>
  );
}

// Componente App com Provider
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
