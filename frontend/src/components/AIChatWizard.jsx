import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import {
  AlertTriangle,
  CheckCircle,
  FileText,
  Lightbulb,
  MessageSquare,
  RefreshCcw,
  Send,
  Target,
  TrendingUp,
  Upload,
} from "lucide-react";

const ICON_MAP = {
  trend: TrendingUp,
  lightbulb: Lightbulb,
  target: Target,
  alert: AlertTriangle,
  message: MessageSquare,
};

const DEFAULT_TASKS = [
  { id: 1, text: "Coletar informações-chave da etapa" },
  { id: 2, text: "Compartilhar contexto com a IA" },
  { id: 3, text: "Validar insights gerados" },
  { id: 4, text: "Salvar documento da etapa" },
];

const DEFAULT_INSIGHTS = [
  {
    icon: "trend",
    title: "Foco em Validação",
    description:
      "A IA sugere validar os pontos levantados com usuários reais antes de avançar para a próxima etapa.",
  },
  {
    icon: "lightbulb",
    title: "Oportunidade de Inovação",
    description:
      "Integre dados qualitativos e quantitativos para gerar hipóteses mais robustas e alinhadas ao mercado.",
  },
];

const DEFAULT_DOCUMENTS = [
  { name: "Documento Base - V1.md" },
  { name: "Insights da Etapa - V1.pdf" },
];

const buildTaskList = (tasks) => {
  const baseTasks = tasks.length ? tasks : DEFAULT_TASKS;
  return baseTasks.map((task, index) => ({
    id: task.id ?? index + 1,
    text: task.text ?? task,
    completed: false,
  }));
};

const AIChatWizard = ({
  title,
  description,
  placeholder = "Descreva os pontos que a IA precisa considerar...",
  iaMessage = "Compartilhe detalhes sobre esta etapa para que eu possa gerar um documento completo.",
  tasks = [],
  insights,
  documents,
  onAdvanceStep,
}) => {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [generatedDocument, setGeneratedDocument] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [taskList, setTaskList] = useState(() => buildTaskList(tasks));

  useEffect(() => {
    setTaskList(buildTaskList(tasks));
  }, [tasks, title]);

  useEffect(() => {
    setMessages([
      {
        id: "ia-intro",
        sender: "IA",
        text: iaMessage,
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
    setGeneratedDocument(null);
    setInputMessage("");
  }, [iaMessage, title]);

  const resolvedInsights = useMemo(() => {
    if (insights?.length) return insights;
    return DEFAULT_INSIGHTS;
  }, [insights]);

  const resolvedDocuments = useMemo(() => {
    if (documents?.length) return documents;
    return DEFAULT_DOCUMENTS;
  }, [documents]);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      sender: "user",
      text: inputMessage.trim(),
      timestamp: new Date().toLocaleTimeString(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputMessage("");
    setIsGenerating(true);

    setTimeout(() => {
      const iaResponse = {
        id: Date.now() + 1,
        sender: "IA",
        text: `Perfeito! Analisei suas informações sobre ${title}. Vou gerar um documento detalhado...`,
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages((prev) => [...prev, iaResponse]);

      setTimeout(() => {
        setGeneratedDocument({
          title: `Documento de ${title}`,
          content: `## Documento de ${title}\n\nBaseado nas suas informações mais recentes:\n\n**Input do Usuário:** ${newMessage.text}\n\n**Análise da IA:**\n\n*   Documento gerado automaticamente para a etapa **${title}**.\n*   Consolida insights, próximos passos e recomendações estratégicas.\n*   Pronto para revisão, ajustes e versionamento.\n\n**Próximos Passos sugeridos:**\n\n1.  Revisar o conteúdo com stakeholders.\n2.  Registrar feedbacks relevantes.\n3.  Avançar para a próxima etapa do fluxo.`,
          status: "pending",
        });
        setIsGenerating(false);
      }, 2000);
    }, 1500);
  };

  const handleApproveDocument = () => {
    setGeneratedDocument((prev) => ({ ...prev, status: "approved" }));
    alert(`Documento de ${title} aprovado!`);
  };

  const handleEditDocument = () => {
    alert("Funcionalidade de edição em desenvolvimento!");
  };

  const handleRejectDocument = () => {
    setGeneratedDocument(null);
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now() + 2,
        sender: "IA",
        text: "Entendido! Compartilhe novos detalhes ou ajustes para que eu gere uma nova versão.",
        timestamp: new Date().toLocaleTimeString(),
      },
    ]);
  };

  const handleTaskToggle = (taskId) => {
    setTaskList((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-purple-500 font-semibold mb-1">
              Etapa do Fluxo
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {title}
            </h1>
            <p className="text-gray-600 mt-1 max-w-2xl">{description}</p>
          </div>
          {onAdvanceStep && (
            <Button
              onClick={onAdvanceStep}
              className="bg-blue-600 text-white shadow-lg hover:bg-blue-700 h-10 px-5 text-sm"
            >
              Avançar etapa
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Card className="shadow-lg border border-purple-100">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-semibold text-gray-900">
                  Conversa com a IA
                </CardTitle>
                <p className="text-sm text-gray-500">
                  Use o assistente para gerar artefatos completos desta etapa.
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="h-64 overflow-y-auto pr-2 space-y-3">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-md rounded-2xl px-4 py-2 text-sm shadow-sm ${
                          message.sender === "user"
                            ? "bg-blue-600 text-white rounded-br-none"
                            : "bg-white text-gray-800 border border-gray-100 rounded-bl-none"
                        }`}
                      >
                        <p className="font-medium mb-1">
                          {message.sender === "user" ? "Você" : "IA GenesiX"}
                        </p>
                        <p className="whitespace-pre-wrap">{message.text}</p>
                        <span className="text-xs opacity-70 block mt-1">
                          {message.timestamp}
                        </span>
                      </div>
                    </div>
                  ))}

                  {isGenerating && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3 text-sm text-gray-500 flex items-center space-x-2">
                        <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                        <span>Gerando novo documento...</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2 border-t border-gray-200 pt-2">
                  <Button variant="outline" size="icon" className="h-9 w-9">
                    <Upload className="w-4 h-4" />
                  </Button>
                  <Textarea
                    placeholder={placeholder}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    className="flex-1 resize-none text-sm h-10 min-h-[40px]"
                    rows={1}
                  />
                  <Button
                    onClick={handleSendMessage}
                    size="icon"
                    className="bg-purple-500 hover:bg-purple-600 h-9 w-9"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {generatedDocument && (
              <Card className="shadow-lg border-green-500">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-semibold text-green-700">
                    Documento Gerado pela IA
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
                    {generatedDocument.content}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={handleApproveDocument}
                      className="bg-green-500 hover:bg-green-600 text-white h-9 px-4 text-sm"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Aprovar
                    </Button>
                    <Button
                      onClick={handleEditDocument}
                      variant="outline"
                      className="h-9 px-4 text-sm"
                    >
                      <span className="flex items-center">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Editar
                      </span>
                    </Button>
                    <Button
                      onClick={handleRejectDocument}
                      variant="destructive"
                      className="h-9 px-4 text-sm"
                    >
                      <RefreshCcw className="w-4 h-4 mr-2" />
                      Rejeitar e refazer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <div className="flex flex-col space-y-4">
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">
                  Checklist da Etapa
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {taskList.map((task) => (
                  <div key={task.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`task-${task.id}`}
                      checked={task.completed}
                      onCheckedChange={() => handleTaskToggle(task.id)}
                    />
                    <label
                      htmlFor={`task-${task.id}`}
                      className={`text-sm leading-none ${
                        task.completed
                          ? "line-through text-gray-500"
                          : "text-gray-800"
                      }`}
                    >
                      {task.text}
                    </label>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">
                  Insights da IA
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {resolvedInsights.map((insight, index) => {
                  const Icon =
                    ICON_MAP[insight.icon] || ICON_MAP.lightbulb;
                  return (
                    <div
                      key={`${insight.title}-${index}`}
                      className="p-3 bg-gray-50 rounded-lg border border-gray-100"
                    >
                      <div className="flex items-start space-x-2">
                        <Icon className="w-4 h-4 mt-0.5 text-purple-600" />
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 mb-0.5">
                            {insight.title}
                          </h4>
                          <p className="text-xs text-gray-600">
                            {insight.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-semibold">
                  Versionamento de Documentos
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {resolvedDocuments.map((doc, index) => (
                  <div
                    key={`${doc.name}-${index}`}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-100"
                  >
                    <div className="flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-gray-600" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          {doc.name}
                        </p>
                        {doc.version && (
                          <p className="text-xs text-gray-500">
                            {doc.version}
                          </p>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-7 px-2 text-xs"
                    >
                      Ver
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChatWizard;
