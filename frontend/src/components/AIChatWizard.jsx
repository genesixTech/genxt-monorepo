import React, { useState } from "react";
import { Send, Upload, MessageSquare, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

const AIChatWizard = ({ title, colorClass }) => {
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { id: 1, sender: "AI", text: "Olá! Sou a IA GenesiX. Estou aqui para te ajudar a documentar esta etapa. Qual é a sua primeira pergunta ou insight?" }
  ]);
  const [isSending, setIsSending] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleSendMessage = () => {
    if (message.trim() === "" && uploadedFiles.length === 0) return;

    setIsSending(true);
    const newMessage = { id: Date.now(), sender: "User", text: message, files: uploadedFiles.map(f => f.name) };
    setChatHistory(prev => [...prev, newMessage]);
    setMessage("");
    setUploadedFiles([]);

    // Simulação de resposta da IA
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        sender: "AI",
        text: `Recebi sua mensagem e ${uploadedFiles.length > 0 ? 'os arquivos (' + uploadedFiles.map(f => f.name).join(', ') + ')' : 'seu texto'}. Analisando o contexto de **${title}**...`,
      };
      setChatHistory(prev => [...prev, aiResponse]);
      setIsSending(false);
    }, 1500);
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  return (
    <Card className="bg-white/90 backdrop-blur-sm border border-white/20 shadow-xl p-6 flex flex-col h-full">
      <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-purple-600" />
        Wizard de Conversa com a IA GenesiX
      </h3>

      {/* Histórico de Chat */}
      <div className="flex-1 overflow-y-auto space-y-4 mb-4 pr-2 max-h-96">
        {chatHistory.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === "User" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-md ${
              msg.sender === "User"
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-800"
            }`}>
              <p className="font-semibold text-sm mb-1">{msg.sender === "AI" ? "IA GenesiX" : "Você"}</p>
              <p className="text-sm">{msg.text}</p>
              {msg.files && msg.files.length > 0 && (
                <div className="mt-2 text-xs italic opacity-80">
                  Arquivos anexados: {msg.files.join(", ")}
                </div>
              )}
            </div>
          </div>
        ))}
        {isSending && (
          <div className="flex justify-start">
            <div className="max-w-xs lg:max-w-md px-4 py-2 rounded-lg shadow-md bg-gray-100 text-gray-800">
              <Loader2 className="w-4 h-4 animate-spin inline mr-2" />
              <span className="text-sm">IA GenesiX pensando...</span>
            </div>
          </div>
        )}
      </div>

      {/* Área de Input */}
      <div className="border-t pt-4">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Digite sua pergunta ou insight..."
          className="resize-none border-2 border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 rounded-lg p-3 font-medium mb-2"
          rows={3}
        />
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <input
              type="file"
              id="file-upload"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
            <label htmlFor="file-upload">
              <Button asChild variant="outline" className="cursor-pointer">
                <span className="flex items-center gap-1">
                  <Upload className="w-4 h-4" />
                  Anexar Arquivo ({uploadedFiles.length})
                </span>
              </Button>
            </label>
            {uploadedFiles.length > 0 && (
              <span className="text-xs text-gray-500">
                {uploadedFiles.map(f => f.name).join(", ")}
              </span>
            )}
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={isSending || (message.trim() === "" && uploadedFiles.length === 0)}
            className={`bg-gradient-to-r ${colorClass} text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300`}
          >
            {isSending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            <span className="ml-2">Enviar</span>
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AIChatWizard;
