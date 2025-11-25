import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { analyticsService, utils } from "@/services/api";
import {
  FileText,
  CheckCircle,
  Calendar,
  Lightbulb,
  Wand2,
  Search,
  Users,
  BarChart3,
  MessageSquare,
  CheckSquare,
  Layers,
  GitBranch,
  Target,
  Palette,
  Rocket,
} from "lucide-react";

const STEP_CONFIG = {
  "contexto-problema": {
    title: "Contexto e Problema",
    description: "Diagnostico inicial e oportunidade.",
    icon: Search,
    iconColor: "bg-purple-100 text-purple-600",
  },
  discovery: {
    title: "Discovery",
    description: "Exploracao, benchmarks e hipoteses iniciais.",
    icon: Lightbulb,
    iconColor: "bg-blue-100 text-blue-600",
  },
  "swot-csd": {
    title: "SWOT & CSD",
    description: "Analise estrategica e matriz CSD.",
    icon: BarChart3,
    iconColor: "bg-green-100 text-green-600",
  },
  personas: {
    title: "Personas",
    description: "Perfis e dores do publico alvo.",
    icon: Users,
    iconColor: "bg-orange-100 text-orange-600",
  },
  "pesquisa-usuarios": {
    title: "Pesquisa com Usuarios",
    description: "Coleta e sintese de entrevistas.",
    icon: MessageSquare,
    iconColor: "bg-pink-100 text-pink-600",
  },
  "validacao-hipoteses": {
    title: "Validacao de Hipoteses",
    description: "Testes e aprendizados priorizados.",
    icon: CheckSquare,
    iconColor: "bg-indigo-100 text-indigo-600",
  },
  "features-priorizacao": {
    title: "Features & Priorizacao",
    description: "Organizacao das funcionalidades do produto.",
    icon: Layers,
    iconColor: "bg-yellow-100 text-yellow-600",
  },
  "user-stories-fluxos": {
    title: "User Stories & Fluxos",
    description: "Mapeamento dos fluxos e historias.",
    icon: GitBranch,
    iconColor: "bg-teal-100 text-teal-600",
  },
  "criterios-metricas": {
    title: "Criterios e Metricas",
    description: "KPIs e indicadores para a entrega.",
    icon: Target,
    iconColor: "bg-cyan-100 text-cyan-600",
  },
  "roadmap-backlog": {
    title: "Roadmap & Backlog",
    description: "Planejamento das entregas e iteracoes.",
    icon: Calendar,
    iconColor: "bg-red-100 text-red-600",
  },
  prototipo: {
    title: "Prototipo",
    description: "Conceitos validados com usuarios.",
    icon: Palette,
    iconColor: "bg-lime-100 text-lime-600",
  },
  "prd-final": {
    title: "PRD Final",
    description: "Documento final de requisitos.",
    icon: FileText,
    iconColor: "bg-gray-100 text-gray-600",
  },
  lancamento: {
    title: "Lancamento",
    description: "Go-to-market e acompanhamento.",
    icon: Rocket,
    iconColor: "bg-fuchsia-100 text-fuchsia-600",
  },
};

const KPI_CONFIG = [
  { key: "total_documents", title: "Documentos", icon: FileText, color: "text-blue-600" },
  { key: "approved_documents", title: "Docs aprovados", icon: CheckCircle, color: "text-green-600" },
  { key: "total_projects", title: "Projetos", icon: Layers, color: "text-orange-600" },
  { key: "total_collaborations", title: "Colaboracoes", icon: Users, color: "text-purple-600" },
];

const Dashboard = ({ onNavigate, onOpenWizard }) => {
  const [metrics, setMetrics] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await analyticsService.getDashboard();
        setMetrics(response.data);
      } catch (err) {
        setError(utils?.formatApiError ? utils.formatApiError(err) : err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  const overview = metrics?.overview || {};
  const documentsByStep = useMemo(
    () => (metrics?.charts?.documents_by_step || []).map((doc) => ({
      etapa: doc.etapa,
      count: Number(doc.count || doc.Count || 0),
    })),
    [metrics],
  );

  const totalDocuments = overview.total_documents || 0;

  const stepCards = documentsByStep.map((item) => {
    const meta = STEP_CONFIG[item.etapa] || {
      title: item.etapa,
      description: "Etapa cadastrada",
      icon: FileText,
      iconColor: "bg-gray-100 text-gray-600",
    };

    return {
      id: item.etapa,
      title: meta.title,
      description: meta.description,
      icon: meta.icon,
      iconColor: meta.iconColor,
      progress: totalDocuments > 0 ? Math.round((item.count / totalDocuments) * 100) : 0,
      tasks: `${item.count} documento(s)`,
      lastActivity: `Ultima contagem: ${item.count}`,
    };
  });

  const kpis = KPI_CONFIG.map((kpi) => {
    const value = overview[kpi.key] ?? 0;
    return { ...kpi, value };
  });

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getProgressColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in-progress":
        return "bg-blue-500";
      default:
        return "bg-gray-300";
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center py-12">
          <div className="text-center text-gray-600">Carregando metricas em tempo real...</div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          {error}
        </div>
      );
    }

    return (
      <>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
          {kpis.map((kpi) => {
            const Icon = kpi.icon;
            return (
              <Card
                key={kpi.key}
                className="border-none bg-white p-4 flex flex-col items-center justify-center text-center"
              >
                <Icon className={`h-8 w-8 mb-2 ${kpi.color}`} />
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {kpi.value}
                </div>
                <CardTitle className="text-sm font-medium text-gray-700">
                  {kpi.title}
                </CardTitle>
              </Card>
            );
          })}
        </div>

        <div className="mb-6 cursor-context-menu">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Progresso por etapa</h2>
              <p className="text-sm text-gray-500">
                Distribuicao dos documentos registrados no backend
              </p>
            </div>
            <Badge className="bg-gray-100 text-gray-700">
              {totalDocuments} documento(s) mapeado(s)
            </Badge>
          </div>

          {stepCards.length === 0 ? (
            <Card className="p-6 text-center text-gray-600 bg-white shadow-sm">
              Nenhum documento encontrado. Gere ou importe seus documentos para visualizar o progresso.
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {stepCards.map((step) => {
                const Icon = step.icon;
                const status =
                  step.progress === 0
                    ? "pending"
                    : step.progress >= 100
                      ? "completed"
                      : "in-progress";

                return (
                  <Card
                    key={step.id}
                    className="shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${step.iconColor}`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-0.5">
                            <h3 className="mb-2 text-base font-semibold text-gray-900">
                              {step.title}
                            </h3>
                            <Badge className={getStatusBadgeColor(status)}>
                              {status === "completed"
                                ? "Concluido"
                                : status === "in-progress"
                                  ? "Em andamento"
                                  : "Pendente"}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-4">
                            {step.description}
                          </p>
                          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                            <span>{step.tasks}</span>
                            <span>{overview.average_progress ? `${overview.average_progress}% medio` : "Sem media"}</span>
                          </div>
                          <Progress
                            value={step.progress}
                            className="h-1.5"
                            indicatorColor={getProgressColor(status)}
                          />
                          <p className="text-xs text-gray-500 mt-0.5">
                            {step.lastActivity}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="flex-1 p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-[#1d5cfb] via-[#807ffb] to-[#5b54fb] bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-sm text-gray-600">
            Acompanhe o progresso do seu projeto
          </p>
        </div>
        <div className="flex space-x-2">
          <Button
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg hover:from-purple-600 hover:to-pink-600 h-9 px-4 text-sm"
            onClick={onOpenWizard}
          >
            <Wand2 className="w-4 h-4 mr-2" />
            Nova tarefa
          </Button>
          <Button
            className="bg-blue-600 text-white shadow-lg hover:bg-blue-700 h-9 px-4 text-sm"
            onClick={() => onNavigate?.("discovery")}
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Continuar fluxo: Discovery
          </Button>
        </div>
      </div>

      {renderContent()}
    </div>
  );
};

export default Dashboard;
