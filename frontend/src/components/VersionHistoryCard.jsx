import React from "react";
import { Card } from "@/components/ui/card";
import { History, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const VersionHistoryCard = ({ title }) => {
  // Dados de simulação para o histórico de versões
  const versions = [
    { id: 3, name: `${title} - v3.0 (Final)`, date: "19/Nov/2025 14:30", status: "Finalizado" },
    { id: 2, name: `${title} - v2.1 (Revisão)`, date: "19/Nov/2025 11:45", status: "Em Revisão" },
    { id: 1, name: `${title} - v1.0 (Rascunho)`, date: "18/Nov/2025 18:00", status: "Rascunho" },
  ];

  return (
    <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl p-6">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <History className="w-5 h-5 text-gray-600" />
        Histórico de Documentos ({title})
      </h3>
      <div className="space-y-3">
        {versions.map((version) => (
          <div key={version.id} className="flex justify-between items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm text-gray-800">{version.name}</p>
                <p className="text-xs text-gray-500">{version.date} - {version.status}</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-1 text-xs">
              <Download className="w-3 h-3" />
              Baixar
            </Button>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-gray-500 italic">
        *Os documentos são gerados automaticamente pela IA GenesiX com base na sua conversa.
      </p>
    </Card>
  );
};

export default VersionHistoryCard;
