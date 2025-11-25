import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useAuth } from "../contexts/AuthContext";
import { userService, utils } from "@/services/api";

const AREAS = [
  "tecnologia",
  "marketing",
  "vendas",
  "produto",
  "design",
  "financeiro",
  "recursos_humanos",
  "operacoes",
  "consultoria",
  "educacao",
  "saude",
  "outros",
];

const TAMANHOS = [
  "freelancer",
  "startup_1_10",
  "pequena_11_50",
  "media_51_200",
  "grande_201_1000",
  "corporacao_1000_plus",
];

const NIVEIS = ["iniciante", "intermediario", "avancado", "especialista"];

const OBJETIVOS = [
  "criar_primeiro_produto",
  "melhorar_produto_existente",
  "validar_ideia",
  "estruturar_processo",
  "capacitar_equipe",
  "consultoria_clientes",
  "outros",
];

const ORIGENS = [
  "google",
  "linkedin",
  "instagram",
  "youtube",
  "indicacao",
  "evento",
  "blog",
  "podcast",
  "outros",
];

const EMPTY_FORM = {
  nome: "",
  email: "",
  area_atuacao: "",
  tamanho_empresa: "",
  nivel_conhecimento: "",
  objetivo_principal: "",
  whatsapp: "",
  origem_conhecimento: "",
  bio: "",
  linkedin_url: "",
  github_url: "",
  website_url: "",
};

const UserProfilePage = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    if (!user) return;
    const profile = user.profile || {};
    setFormData({
      nome: user.nome || "",
      email: user.email || "",
      area_atuacao: profile.area_atuacao || "",
      tamanho_empresa: profile.tamanho_empresa || "",
      nivel_conhecimento: profile.nivel_conhecimento || "",
      objetivo_principal: profile.objetivo_principal || "",
      whatsapp: profile.whatsapp || "",
      origem_conhecimento: profile.origem_conhecimento || "",
      bio: profile.bio || "",
      linkedin_url: profile.linkedin_url || "",
      github_url: profile.github_url || "",
      website_url: profile.website_url || "",
    });
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toNull = (value) => (value === "" ? null : value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    setIsSaving(true);
    setStatus(null);

    try {
      await userService.updateProfile(user.id, {
        nome: formData.nome,
        email: formData.email,
      });

      const detailed = {
        area_atuacao: toNull(formData.area_atuacao),
        tamanho_empresa: toNull(formData.tamanho_empresa),
        nivel_conhecimento: toNull(formData.nivel_conhecimento),
        objetivo_principal: toNull(formData.objetivo_principal),
        whatsapp: toNull(formData.whatsapp),
        origem_conhecimento: toNull(formData.origem_conhecimento),
        bio: toNull(formData.bio),
        linkedin_url: toNull(formData.linkedin_url),
        github_url: toNull(formData.github_url),
        website_url: toNull(formData.website_url),
      };

      await userService.updateDetailedProfile(user.id, detailed);
      const refreshed = await userService.getProfile(user.id);
      updateUser(refreshed.data.user);
      setStatus({ type: "success", message: "Perfil atualizado com sucesso." });
    } catch (error) {
      setStatus({ type: "error", message: utils?.formatApiError ? utils.formatApiError(error) : error.message });
    } finally {
      setIsSaving(false);
    }
  };

  const initials = formData.nome
    ? formData.nome.split(" ").map((n) => n[0]).join("")
    : "UX";

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <Card className="bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <CardContent className="p-6 flex flex-wrap items-center gap-6">
          <div className="relative">
            <Avatar className="w-24 h-24">
              <AvatarImage src={user?.avatar_url} />
              <AvatarFallback className="text-2xl bg-purple-600 text-white">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex-1 min-w-[250px]">
            <h2 className="text-2xl font-semibold text-gray-900">{formData.nome || "Seu nome"}</h2>
            <p className="text-sm text-gray-600">{formData.email}</p>
            {user?.profile?.perfil_completo ? (
              <Badge className="mt-2 bg-green-100 text-green-800" variant="secondary">
                Perfil completo
              </Badge>
            ) : (
              <Badge className="mt-2 bg-amber-100 text-amber-800" variant="secondary">
                Complete os dados para liberar recursos
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dados basicos</CardTitle>
          <CardDescription>Edite suas informacoes principais</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nome">Nome</Label>
                <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} required />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="whatsapp">WhatsApp</Label>
                <Input id="whatsapp" name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="+55..." />
              </div>
              <div>
                <Label htmlFor="area_atuacao">Area de atuacao</Label>
                <select
                  id="area_atuacao"
                  name="area_atuacao"
                  value={formData.area_atuacao}
                  onChange={handleChange}
                  className="w-full h-10 rounded-md border border-input bg-transparent px-3 text-sm"
                >
                  <option value="">Selecione</option>
                  {AREAS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="nivel_conhecimento">Nivel</Label>
                <select
                  id="nivel_conhecimento"
                  name="nivel_conhecimento"
                  value={formData.nivel_conhecimento}
                  onChange={handleChange}
                  className="w-full h-10 rounded-md border border-input bg-transparent px-3 text-sm"
                >
                  <option value="">Selecione</option>
                  {NIVEIS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="objetivo_principal">Objetivo principal</Label>
                <select
                  id="objetivo_principal"
                  name="objetivo_principal"
                  value={formData.objetivo_principal}
                  onChange={handleChange}
                  className="w-full h-10 rounded-md border border-input bg-transparent px-3 text-sm"
                >
                  <option value="">Selecione</option>
                  {OBJETIVOS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="tamanho_empresa">Tamanho da empresa</Label>
                <select
                  id="tamanho_empresa"
                  name="tamanho_empresa"
                  value={formData.tamanho_empresa}
                  onChange={handleChange}
                  className="w-full h-10 rounded-md border border-input bg-transparent px-3 text-sm"
                >
                  <option value="">Selecione</option>
                  {TAMANHOS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="origem_conhecimento">Como conheceu</Label>
                <select
                  id="origem_conhecimento"
                  name="origem_conhecimento"
                  value={formData.origem_conhecimento}
                  onChange={handleChange}
                  className="w-full h-10 rounded-md border border-input bg-transparent px-3 text-sm"
                >
                  <option value="">Selecione</option>
                  {ORIGENS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label htmlFor="linkedin_url">LinkedIn</Label>
                <Input id="linkedin_url" name="linkedin_url" value={formData.linkedin_url} onChange={handleChange} placeholder="https://linkedin.com/in/" />
              </div>
              <div>
                <Label htmlFor="github_url">GitHub</Label>
                <Input id="github_url" name="github_url" value={formData.github_url} onChange={handleChange} placeholder="https://github.com/" />
              </div>
              <div>
                <Label htmlFor="website_url">Website</Label>
                <Input id="website_url" name="website_url" value={formData.website_url} onChange={handleChange} placeholder="https://" />
              </div>
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea id="bio" name="bio" value={formData.bio} onChange={handleChange} placeholder="Conte em ate 500 caracteres" className="min-h-24" />
            </div>

            {status && (
              <div className={`p-3 rounded-lg text-sm ${status.type === "success" ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
                {status.message}
              </div>
            )}

            <div className="flex justify-end">
              <Button type="submit" className="min-w-[140px]" disabled={isSaving}>
                {isSaving ? "Salvando..." : "Salvar perfil"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfilePage;
