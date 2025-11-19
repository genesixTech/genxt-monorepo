import React, { useState } from "react";
import { ChevronDown, CheckCircle2, AlertCircle, Lightbulb, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import AIChatWizard from "./AIChatWizard";
import VersionHistoryCard from "./VersionHistoryCard";

const ContextoProblemaPage = () => {
  const [completedTasks, setCompletedTasks] = useState([]);
  const [expandedTask, setExpandedTask] = useState(null);

  const tasks = [
    { id: 1, text: "Definir o Contexto (Mercado, Tendências, Cenário Atual)" },
    { id: 2, text: "Identificar o Problema Central (Dor do Cliente)" },
    { id: 3, text: "Quantificar o Problema (Impacto, Frequência, Custo)" },
    { id: 4, text: "Definir a Proposta de Valor Inicial (Solução de Alto Nível)" },
    { id: 5, text: "Documentar a Declaração do Problema (Problem Statement)" },
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
  const colorClass = "from-red-600 to-pink-700"; // Novo tema de cor

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-pink-700 rounded-lg flex items-center justify-center">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Contexto e Problema</h1>
              <p className="text-gray-600 mt-1">A base de tudo: o que e por que estamos construindo</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Editor Section - Substituído por AIChatWizard */}
          <div className="lg:col-span-2 space-y-8">
            {/* IA Message - Mantido como Insight Card */}
            <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl p-6">
              <div className="mb-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg">
                <div className="flex gap-3">
                  <Lightbulb className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-sm leading-relaxed">
                    <span className="font-semibold text-red-900">IA GenesiX Insight:</span> Comece pelo "Porquê". Um problema bem definido é metade da solução. Concentre-se na dor real do seu cliente.
                  </p>
                </div>
              </div>
            </Card>

            {/* AIChatWizard */}
            <AIChatWizard title="Contexto e Problema" colorClass={colorClass} />

            {/* Version History Card */}
            <VersionHistoryCard title="Declaração do Problema" />
          </div>

          {/* Sidebar - Tasks */}
          <div className="lg:col-span-1">
            <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl p-6 sticky top-24">
              {/* Progress */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">Progresso</h3>
                  <span className="text-sm font-bold text-red-600">{completionPercentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-red-600 to-pink-700 h-2 rounded-full transition-all duration-300"
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
                        className="w-5 h-5 rounded border-gray-300 text-red-600 cursor-pointer"
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
                          {task.id === 1 && "Analise o mercado, a concorrência e as tendências que justificam a criação do seu produto."}
                          {task.id === 2 && "Qual é a principal dificuldade ou necessidade não atendida que seu produto irá resolver?"}
                          {task.id === 3 && "Use dados para mostrar o quão grande e urgente é o problema."}
                          {task.id === 4 && "Em uma frase, como seu produto resolve o problema? (Ex: 'Ajudamos X a fazer Y através de Z')."}
                          {task.id === 5 && "Crie uma declaração concisa e clara do problema (Ex: 'Usuários X têm o problema Y, o que causa Z')."}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Completion Status */}
              <div className="mt-6 p-3 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-lg">
                <div className="flex items-center gap-2">
                  {completionPercentage === 100 ? (
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-red-600" />
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
              <span className="text-2xl">❓</span> Problem Statement
            </h3>
            <p className="text-sm text-gray-700">
              Uma declaração concisa que descreve o problema que você está tentando resolver, o público afetado e o impacto. É o ponto de partida para o alinhamento de toda a equipe.
            </p>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm border border-white/20 p-6">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <span className="text-2xl">💡</span> Proposta de Valor
            </h3>
            <p className="text-sm text-gray-700">
              O benefício que seu produto oferece aos clientes. Deve ser clara, concisa e única, explicando por que o cliente deve escolher sua solução em vez da concorrência.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ContextoProblemaPage;
