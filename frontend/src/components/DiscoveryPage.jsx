import React, { useState } from "react";
import { ChevronDown, CheckCircle2, AlertCircle, Lightbulb, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AIChatWizard from "./AIChatWizard";
import VersionHistoryCard from "./VersionHistoryCard";

const DiscoveryPage = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [expandedTask, setExpandedTask] = useState(null);

  const tasks = [
    { id: 1, text: "Definir o escopo do Discovery (O que queremos aprender?)" },
    { id: 2, text: "Mapear Stakeholders (Quem deve ser envolvido?)" },
    { id: 3, text: "Coletar dados (Entrevistas, Benchmarking, Dados Internos)" },
    { id: 4, text: "Sintetizar os achados (Identificar padrões e insights)" },
    { id: 5, text: "Validar a solução (Testes de conceito, protótipos de baixa fidelidade)" },
    { id: 6, text: "Documentar o Relatório de Discovery" },
  ];

  const toggleTask = (taskId) => {
    setCompletedTasks((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  const toggleTaskExpand = (taskId) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  const completionPercentage = Math.round((completedTasks.length / tasks.length) * 100);
  const colorClass = "from-blue-600 to-teal-700"; // Novo tema de cor

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-teal-700 rounded-lg flex items-center justify-center">
              <Search className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Discovery</h1>
              <p className="text-gray-600 mt-1">A fase de investigação e validação da oportunidade</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Editor Section - Substituído por AIChatWizard */}
          <div className="lg:col-span-2 space-y-8">
            {/* IA Message - Mantido como Insight Card */}
            <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl p-6">
              <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 rounded-lg">
                <div className="flex gap-3">
                  <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-sm leading-relaxed">
                    <span className="font-semibold text-blue-900">IA GenesiX Insight:</span> O Discovery é o seu seguro contra construir a coisa errada. Use este momento para desmistificar suposições e encontrar a melhor solução para o problema.
                  </p>
                </div>
              </div>
            </Card>

            {/* AIChatWizard */}
            <AIChatWizard title="Discovery" colorClass={colorClass} />

            {/* Version History Card */}
            <VersionHistoryCard title="Relatório de Discovery" />
          </div>

          {/* Sidebar - Tasks */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl p-6 sticky top-24">
              {/* Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">Progresso</h3>
                  <span className="text-sm font-bold text-blue-600">{completionPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-teal-700 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${completionPercentage}%` }}
                  />
                </div>
              </div>

              {/* Tasks */}
              <div className="space-y-2">
                <h3 className="font-semibold text-gray-900 mb-4">Tarefas da Etapa</h3>
                {tasks.map((task) => (
                  <div key={task.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => toggleTaskExpand(task.id)}
                      className="w-full flex items-center gap-3 p-3 hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={completedTasks.includes(task.id)}
                        onChange={() => toggleTask(task.id)}
                        onClick={(e) => e.stopPropagation()}
                        className="w-5 h-5 rounded border-gray-300 text-blue-600 cursor-pointer"
                      />
                      <span
                        className={`flex-1 text-left text-sm font-medium transition-all ${
                          completedTasks.includes(task.id)
                            ? "text-gray-400 line-through"
                            : "text-gray-700"
                        }`}
                      >
                        {task.text}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-gray-400 transition-transform ${
                          expandedTask === task.id ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {expandedTask === task.id && (
                      <div className="px-3 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-600">
                        <p>
                          {task.id === 1 && "Defina as perguntas-chave que precisam ser respondidas para avançar com o projeto."}
                          {task.id === 2 && "Identifique e entreviste as pessoas-chave que serão afetadas ou que têm conhecimento sobre o problema."}
                          {task.id === 3 && "Use métodos como entrevistas, análise de concorrência e dados de uso para coletar informações."}
                          {task.id === 4 && "Organize os dados coletados em temas e insights acionáveis (Ex: Matriz CSD, Affinity Mapping)."}
                          {task.id === 5 && "Crie protótipos de baixa fidelidade para testar a aceitação da solução com usuários reais."}
                          {task.id === 6 && "Compile todos os achados, decisões e próximos passos em um relatório claro."}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Completion Status */}
              <div className="mt-6 p-3 bg-gradient-to-r from-blue-50 to-teal-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2">
                  {completionPercentage === 100 ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-blue-600" />
                  )}
                  <span className="text-sm font-medium text-gray-700">
                    {completionPercentage === 100
                      ? "✨ Etapa concluída!"
                      : `${tasks.length - completedTasks.length} tarefa(s) restante(s)`}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <Card className="bg-white/80 backdrop-blur-sm border border-white/20 p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">🔍</span> Duplo Diamante
            </h3>
            <p className="text-sm text-gray-700">
              O Discovery se encaixa na primeira metade do Duplo Diamante: **Descobrir** (pesquisar e entender o problema) e **Definir** (focar no problema certo).
            </p>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border border-white/20 p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">🤝</span> Stakeholders
            </h3>
            <p className="text-sm text-gray-700">
              Pessoas ou grupos que têm interesse ou são afetados pelo produto. Envolvê-los no Discovery garante alinhamento e reduz riscos futuros.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DiscoveryPage;
