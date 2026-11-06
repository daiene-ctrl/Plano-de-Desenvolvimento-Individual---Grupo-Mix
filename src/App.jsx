import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Users, Target, CheckCircle2, Clock, Search, Filter, 
  ChevronRight, Award, BarChart3, Printer, BookOpen, 
  TrendingUp, UserPlus, X, Lock, LogOut, Shield, Loader2
} from 'lucide-react';

const supabaseUrl = 'https://hbyjblwzuvntinpugetr.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhieWpibHd6dXZudGlucHVnZXRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMzQ1NjcsImV4cCI6MjAxNTAwMDAwMH0.placeholder';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const validUsers = [
  { name: "Daiene Santos", email: "daiene@mixsolucoesambientais.com.br", pass: "mix#rh2026", profile: "RH", role: "Gestora de RH / DHO" },
  { name: "Roberto Santos", email: "roberto@mixsolucoesambientais.com.br", pass: "gestor123", profile: "GESTOR", role: "Supervisor Operacional" },
  { name: "Marcos Oliveira", email: "marcos@mixsolucoesambientais.com.br", pass: "gestor123", profile: "GESTOR", role: "Coordenador de Logística" },
  { name: "Augusto Arruda", email: "augusto@mixsolucoesambientais.com.br", pass: "gestor123", profile: "GESTOR", role: "Supervisor Operacional" },
  { name: "Jose Izailton", email: "log@mixsolucoesambientais.com.br", pass: "gestor123", profile: "GESTOR", role: "Gestor Logística" }
];

// 67 Colaboradores Reais Importados da Planilha
const initialEmployees = [
  {
    "id": 1,
    "name": "HELIO MARCOS DE JESUS SANTOS",
    "role": "AUXILIAR DE LOGISTICA E OPERACOES",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 2,
    "name": "WALLACE SILVA RODRIGUES",
    "role": "MECANICO DE AUTOMOVEIS E CAMINHOES EM GERAL",
    "department": "Logistica",
    "manager": "Jose Izailton",
    "managerEmail": "log@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 3,
    "name": "GLAUBER LUAN LIMA VIANA",
    "role": "MOTORISTA DE CAMINHÃO",
    "department": "Logistica",
    "manager": "Jose Izailton",
    "managerEmail": "log@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 4,
    "name": "JOSE IZAILTON BATISTA ALMEIDA JUNIOR",
    "role": "ANALISTA DE LOGISTICA DE TRANSPORTE",
    "department": "Logistica",
    "manager": "George Costa",
    "managerEmail": "george@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 5,
    "name": "GIVALDO DE SOUSA CONCEICAO",
    "role": "AUXILIAR DE LOGISTICA E OPERACOES",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 6,
    "name": "AUGUSTO CESAR DE ARRUDA",
    "role": "ENCARREGADO OPERACIONAL LOGISTICO",
    "department": "Operação",
    "manager": "Lucas Borges",
    "managerEmail": "lucas@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 7,
    "name": "BENIVALDO EVANGELISTA DOS SANTOS",
    "role": "AUXILIAR DE LOGISTICA E OPERACOES",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 8,
    "name": "FERNANDO JOAQUIM DO NASCIMENTO",
    "role": "OPERADOR DE EMPILHADEIRA",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 9,
    "name": "LAERCIO SOUZA OLIVEIRA SANTOS",
    "role": "MOTORISTA DE CAMINHÃO",
    "department": "Logistica",
    "manager": "Jose Izailton",
    "managerEmail": "log@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 10,
    "name": "RAFAEL ANJOS MENEZES",
    "role": "MOTORISTA DE CAMINHÃO",
    "department": "Logistica",
    "manager": "Jose Izailton",
    "managerEmail": "log@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 11,
    "name": "ANDRE LACERDA DOS SANTOS",
    "role": "OPERADOR DE TRATAMENTO TERMICO DE RESIDUOS",
    "department": "TR 2",
    "manager": "Ederson Borges",
    "managerEmail": "",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 12,
    "name": "ROQUE NASCIMENTO DOS SANTOS",
    "role": "OPERADOR DE TRATAMENTO TERMICO DE RESIDUOS",
    "department": "TR 2",
    "manager": "Ederson Borges",
    "managerEmail": "",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 13,
    "name": "UILIAM SANTANA DO NASCIMENTO",
    "role": "AUXILIAR DE LOGISTICA E OPERACOES",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 14,
    "name": "EDERSON BORGES SANTOS DE CARVALHO",
    "role": "Supervisor TR2",
    "department": "TR 2",
    "manager": "Lucas Borges",
    "managerEmail": "lucas@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 15,
    "name": "JADSON SANTOS DE SOUZA",
    "role": "MOTORISTA CARRETEIRO",
    "department": "Logistica",
    "manager": "Jose Izailton",
    "managerEmail": "log@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 16,
    "name": "JORGINEI ALMEIDA",
    "role": "AUXILIAR DE LOGISTICA E OPERACOES",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 17,
    "name": "EVANILDO GARCIA DOS SANTOS",
    "role": "SOLDADOR",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 18,
    "name": "FABRICIO DOS SANTOS SAMPAIO",
    "role": "AUXILIAR DE LOGISTICA E OPERACOES",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 19,
    "name": "AVANILDE SANTOS SILVA",
    "role": "AUX. DE LIMPEZA",
    "department": "SGI",
    "manager": "Luiza Costa",
    "managerEmail": "luiza@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 20,
    "name": "ADRIANO ANITOGE DE ARRUDA",
    "role": "AUXILIAR DE LOGISTICA E OPERACOES",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 21,
    "name": "ALEX SANTANA DO NASCIMENTO",
    "role": "AUXILIAR DE LOGISTICA E OPERACOES",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 22,
    "name": "EDUARDO SILVA DA SILVA",
    "role": "AUXILIAR DE LOGISTICA E OPERACOES",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 23,
    "name": "GIVANILDO CONCEICAO MOREIRA",
    "role": "AUXILIAR DE LOGISTICA E OPERACOES",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 24,
    "name": "ACACIO NOVAIS SANTOS",
    "role": "MOTORISTA DE CAMINHÃO",
    "department": "Logistica",
    "manager": "Jose Izailton",
    "managerEmail": "log@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 25,
    "name": "JEFERSON JESUS DE ALCANTARA",
    "role": "AUXILIAR DE LOGISTICA E OPERACOES",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 26,
    "name": "DAVI REIS DE ANDRADE",
    "role": "AUXILIAR DE LOGISTICA E OPERACOES",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 27,
    "name": "ALINE SANTOS SILVA",
    "role": "ASSISTENTE ADMINISTRATIVO",
    "department": "Logistica",
    "manager": "Jose Izailton",
    "managerEmail": "log@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 28,
    "name": "LILIANE ALVES DA SILVA",
    "role": "ASSISTENTE LOGISTICA",
    "department": "Logistica",
    "manager": "Jose Izailton",
    "managerEmail": "log@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 29,
    "name": "PABLO RIAN REIS NOVAES",
    "role": "AUXILIAR DE LOGISTICA E OPERACOES",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 30,
    "name": "JOSIVAN MOTA CARDOSO",
    "role": "AUXILIAR DE LOGISTICA E OPERACOES",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 31,
    "name": "JUTAIR DOS SANTOS BASTOS",
    "role": "VIGIA",
    "department": "SGI",
    "manager": "Luiza Costa",
    "managerEmail": "luiza@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 32,
    "name": "RICARDO ALVES TEIXEIRA",
    "role": "AUXILIAR DE LOGISTICA E OPERACOES",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 33,
    "name": "DANIEL FRANCA BASTOS",
    "role": "AUXILIAR DE LOGISTICA E OPERACOES",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 34,
    "name": "DAIENE LIMA DA SILVA SANTOS MOREIRA",
    "role": "ASSISTENTE DE RECURSOS HUMANOS",
    "department": "Recursos Humanos",
    "manager": "Luiza Costa",
    "managerEmail": "luiza@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 35,
    "name": "VAGNER RODRIGUES DE OLIVEIRA",
    "role": "AUXILIAR DE LOGISTICA E OPERACOES",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 36,
    "name": "CLEIDIANE SOUZA DOS SANTOS",
    "role": "AUXILIAR FINANCEIRO",
    "department": "Administrativo",
    "manager": "Lucas Borges",
    "managerEmail": "lucas@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 37,
    "name": "JOEVALDO MORAIS DE SANTANA",
    "role": "AUXILIAR DE LOGISTICA E OPERACOES",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 38,
    "name": "VITOR FONSECA DOS SANTOS",
    "role": "AUXILIAR DE LOGISTICA E OPERACOES",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 39,
    "name": "MAYRA MATOS COSTA DE OLIVEIRA",
    "role": "AUXILIAR ADMINISTRATIVO AMBIENTAL",
    "department": "SGI",
    "manager": "Luiza Costa",
    "managerEmail": "luiza@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 40,
    "name": "CASSIANO DE JESUS DOS SANTOS",
    "role": "AUXILIAR DE LOGISTICA E OPERACOES",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 41,
    "name": "ALAENE RODRIGUES COIMBRA ALVES",
    "role": "AUXILIAR DE LOGISTICA E OPERACOES",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 42,
    "name": "BRUNO DOS SANTOS BISPO",
    "role": "AUXILIAR DE LOGISTICA E OPERACOES",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 43,
    "name": "CARLOS ROBERTO DOS SANTOS",
    "role": "AUXILIAR DE LOGISTICA E OPERACOES",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 44,
    "name": "CELIO DOS SANTOS BRITO JUNIOR",
    "role": "MOTORISTA DE CAMINHÃO",
    "department": "Logistica",
    "manager": "Jose Izailton",
    "managerEmail": "log@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 45,
    "name": "DIONE BARRETO CARMO",
    "role": "AUXILIAR DE LOGISTICA E OPERACOES",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 46,
    "name": "EDIVALDO FRANCISCO DE JESUS",
    "role": "AUXILIAR DE LOGISTICA E OPERACOES",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 47,
    "name": "EDSON DOS SANTOS OLIVEIRA",
    "role": "AUXILIAR DE LOGISTICA E OPERACOES",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 48,
    "name": "GUSTAVO BARRENSE DE SOUZA",
    "role": "AUXILIAR DE LOGISTICA E OPERACOES",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 49,
    "name": "IGOR DOS SANTOS NOVAIS",
    "role": "MOTORISTA CARRETEIRO",
    "department": "Logistica",
    "manager": "Jose Izailton",
    "managerEmail": "log@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 50,
    "name": "JAIME BORGES PINHEIRO",
    "role": "MOTORISTA CARRETEIRO",
    "department": "Logistica",
    "manager": "Jose Izailton",
    "managerEmail": "log@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 51,
    "name": "JEOZADAQUE OLIVEIRA SANTOS",
    "role": "AUXILIAR DE LOGISTICA E OPERACOES",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 52,
    "name": "LUIZ FELIPE DE SOUZA MIRANDA",
    "role": "AUXILIAR DE LOGISTICA E OPERACOES",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 53,
    "name": "PAULA XAUANA DO CARMO OLIVEIRA",
    "role": "AUXILIAR ADMINISTRATIVO",
    "department": "Administrativo",
    "manager": "Luiza Costa",
    "managerEmail": "luiza@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 54,
    "name": "RAFAEL BARROSO SANTANA",
    "role": "ASSISTENTE ADMINISTRATIVO",
    "department": "Administrativo",
    "manager": "George Costa",
    "managerEmail": "george@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 55,
    "name": "RAFAEL DOS SANTOS DE LIMA",
    "role": "AUXILIAR DE LOGISTICA E OPERACOES",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 56,
    "name": "SANDRA ALVES PINTO DE SOUZA",
    "role": "AUXILIAR DE LOGISTICA E OPERACOES",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 57,
    "name": "JEFERSON RICARDO NOVAIS DE BARROS",
    "role": "MOTORISTA DE CAMINHÃO",
    "department": "Logistica",
    "manager": "Jose Izailton",
    "managerEmail": "log@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 58,
    "name": "OZIAS OLIVEIRA SANTOS",
    "role": "MOTORISTA CARRETEIRO",
    "department": "Logistica",
    "manager": "Jose Izailton",
    "managerEmail": "log@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 59,
    "name": "SIDNEI LOPES DE OLIVEIRA",
    "role": "AUXILIAR DE LOGISTICA E OPERACOES",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 60,
    "name": "MARCOS ANTONIO ESPIRITO SANTO DE JESUS",
    "role": "MOTORISTA DE CAMINHÃO",
    "department": "Logistica",
    "manager": "Jose Izailton",
    "managerEmail": "log@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 61,
    "name": "DANILO SANTANA DOS SANTOS",
    "role": "MOTORISTA DE CAMINHÃO",
    "department": "Logistica",
    "manager": "Jose Izailton",
    "managerEmail": "log@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 62,
    "name": "UILIANS SILVA SANTOS",
    "role": "MOTORISTA DE CAMINHÃO",
    "department": "Logistica",
    "manager": "Jose Izailton",
    "managerEmail": "log@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 63,
    "name": "RENIO GOMES SOUZA",
    "role": "AUXILIAR DE LOGISTICA E OPERACOES",
    "department": "Operação",
    "manager": "Augusto Arruda",
    "managerEmail": "augusto@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 64,
    "name": "REGIVALDO FRANQLIN DOS ANJOS MIRANDA",
    "role": "MOTORISTA DE CAMINHÃO",
    "department": "Logistica",
    "manager": "Jose Izailton",
    "managerEmail": "log@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 65,
    "name": "BRENDO WILLIAN DA SILVA CARMO",
    "role": "ASSISTENTE ADMINISTRATIVO",
    "department": "Administrativo",
    "manager": "Luiza Costa",
    "managerEmail": "luiza@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 66,
    "name": "WALLAS DE SOUZA VIEIRA",
    "role": "MOTORISTA DE CAMINHÃO",
    "department": "Logistica",
    "manager": "Jose Izailton",
    "managerEmail": "log@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  },
  {
    "id": 67,
    "name": "EDUARDO MARTIN DE MACEDO",
    "role": "EXECUTIVO COMERCIAL",
    "department": "Comercial",
    "manager": "George Costa",
    "managerEmail": "george@mixsolucoesambientais.com.br",
    "status": "Não Iniciado",
    "progress": 0,
    "strengths": "A mapear em reunião de PDI.",
    "growthAreas": "A definir com a gestão.",
    "goal": "Desenvolvimento contínuo.",
    "actions": []
  }
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [employees, setEmployees] = useState(initialEmployees);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(1);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('Todos');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newEmployee, setNewEmployee] = useState({
    nome: '',
    cargo: '',
    departamento: 'Operação',
    gestor_nome: 'Daiene Santos',
    pontos_fortes: '',
    pontos_desenvolver: '',
    objetivo_carreira: ''
  });

  const fetchEmployeesFromSupabase = async () => {
    setLoading(true);
    try {
      const { data: dbData } = await supabase.from('colaboradores').select('*');
      if (dbData && dbData.length > 0) {
        const formatted = dbData.map(emp => ({
          id: emp.id,
          name: emp.nome || emp.name,
          role: emp.cargo || emp.role,
          department: emp.departamento || emp.department,
          manager: emp.gestor_nome || emp.manager,
          status: emp.status || 'Não Iniciado',
          progress: emp.progress || 0,
          strengths: emp.pontos_fortes || 'A mapear em reunião de PDI.',
          growthAreas: emp.pontos_desenvolver || 'A definir com a gestão.',
          goal: emp.objetivo_carreira || 'Desenvolvimento contínuo.',
          actions: []
        }));
        setEmployees(formatted);
      }
    } catch (err) {
      console.log("Usando a lista de 67 colaboradores reais carregada no sistema.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchEmployeesFromSupabase();
    }
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = validUsers.find(
      u => u.email.toLowerCase() === loginEmail.trim().toLowerCase() && u.pass === loginPassword
    );

    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('E-mail ou senha incorretos.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    const newEmpObj = {
      id: Date.now(),
      name: newEmployee.nome,
      role: newEmployee.cargo,
      department: newEmployee.departamento,
      manager: newEmployee.gestor_nome,
      status: 'Não Iniciado',
      progress: 0,
      strengths: newEmployee.pontos_fortes || 'A mapear em reunião de PDI.',
      growthAreas: newEmployee.pontos_desenvolver || 'A definir com a gestão.',
      goal: newEmployee.objetivo_carreira || 'Desenvolvimento contínuo.',
      actions: []
    };

    setEmployees(prev => [newEmpObj, ...prev]);

    try {
      await supabase.from('colaboradores').insert([{
        nome: newEmployee.nome,
        cargo: newEmployee.cargo,
        departamento: newEmployee.departamento,
        gestor_nome: newEmployee.gestor_nome,
        pontos_fortes: newEmployee.pontos_fortes,
        pontos_desenvolver: newEmployee.pontos_desenvolver,
        objetivo_carreira: newEmployee.objetivo_carreira,
        status: 'Não Iniciado',
        progress: 0
      }]);
    } catch (err) {
      console.log("Adicionado localmente.");
    }

    setShowAddModal(false);
    setNewEmployee({
      nome: '',
      cargo: '',
      departamento: 'Operação',
      gestor_nome: 'Daiene Santos',
      pontos_fortes: '',
      pontos_desenvolver: '',
      objetivo_carreira: ''
    });
  };

  const accessibleEmployees = employees.filter(emp => {
    if (!currentUser) return false;
    if (currentUser.profile === 'RH') return true;
    return emp.manager.toLowerCase().includes(currentUser.name.toLowerCase().split(' ')[0]);
  });

  const selectedEmployee = accessibleEmployees.find(e => e.id === selectedId) || accessibleEmployees[0];

  const totalPDIs = accessibleEmployees.length;
  const completedPDIs = accessibleEmployees.filter(e => e.progress === 100).length;
  const inProgressPDIs = accessibleEmployees.filter(e => e.progress > 0 && e.progress < 100).length;
  const implementationRate = totalPDIs > 0 
    ? Math.round((accessibleEmployees.filter(e => e.status !== 'Não Iniciado').length / totalPDIs) * 100)
    : 0;

  const filteredEmployees = accessibleEmployees.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) || e.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = departmentFilter === 'Todos' || e.department === departmentFilter;
    return matchesSearch && matchesDept;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0d1527] flex items-center justify-center p-4 font-sans">
        <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
          <div className="bg-[#055a43] p-8 text-center text-white space-y-2">
            <div className="flex justify-center mb-2">
              <img src="/logo.png" alt="Mix Soluções Ambientais" className="h-16 w-auto object-contain" />
            </div>
            <h2 className="text-xl font-extrabold tracking-tight mt-1">MIX SOLUÇÕES AMBIENTAIS</h2>
            <p className="text-xs text-emerald-100/80 font-medium">Portal de Gestão de PDI • Pilar Desenvolvimento</p>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-5 text-xs">
            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl font-semibold text-center">
                {loginError}
              </div>
            )}

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">E-mail Corporativo</label>
              <input 
                type="email" 
                required 
                placeholder="seu.nome@mixsolucoesambientais.com.br"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1.5">Senha de Acesso</label>
              <input 
                type="password" 
                required 
                placeholder="••••••••"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-xl text-slate-700 placeholder-slate-400 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-3.5 bg-[#0b9669] hover:bg-[#087a55] text-white rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" /> Entrar no Sistema
            </button>

            <div className="pt-4 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
              <p className="font-bold text-slate-700 mb-1.5">Credenciais de Teste:</p>
              <p>• <strong className="text-slate-700">RH (Visão Total):</strong> daiene@mixsolucoesambientais.com.br / mix#rh2026</p>
              <p>• <strong className="text-slate-700">Gestor Operacional:</strong> roberto@mixsolucoesambientais.com.br / gestor123</p>
              <p>• <strong className="text-slate-700">Gestor Logística:</strong> marcos@mixsolucoesambientais.com.br / gestor123</p>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <header className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-4">
          <img src="/logo.png" alt="Mix Soluções Ambientais" className="h-10 w-auto object-contain" />

          <div className="flex items-center gap-4">
            <div className="bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-700/50 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-300" />
              <div className="text-xs">
                <span className="font-bold text-white block">{currentUser.name}</span>
                <span className="text-[10px] text-emerald-300 font-semibold uppercase">{currentUser.role}</span>
              </div>
            </div>

            <button 
              onClick={handleLogout}
              className="p-2 bg-emerald-950/40 hover:bg-red-600 text-emerald-200 hover:text-white rounded-xl transition border border-emerald-700/50 flex items-center gap-1 text-xs font-semibold"
            >
              <LogOut className="w-4 h-4" /> Sair
            </button>
          </div>

          <nav className="flex items-center gap-2">
            <div className="flex bg-emerald-950/40 p-1 rounded-xl border border-emerald-700/50">
              <button 
                onClick={() => setActiveTab('dashboard')} 
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-2 ${activeTab === 'dashboard' ? 'bg-white text-emerald-900 shadow' : 'text-emerald-100 hover:text-white'}`}
              >
                <BarChart3 className="w-4 h-4" /> Visão Geral
              </button>
              <button 
                onClick={() => setActiveTab('list')} 
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-2 ${activeTab === 'list' || activeTab === 'detail' ? 'bg-white text-emerald-900 shadow' : 'text-emerald-100 hover:text-white'}`}
              >
                <Users className="w-4 h-4" /> Colaboradores ({accessibleEmployees.length})
              </button>
            </div>

            {currentUser.profile === 'RH' && (
              <button 
                onClick={() => setShowAddModal(true)}
                className="px-3 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md"
              >
                <UserPlus className="w-4 h-4" /> Novo Colaborador
              </button>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
          </div>
        )}

        {!loading && activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap justify-between items-center gap-4">
              <div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">META ESTRATÉGICA 2026</span>
                <h2 className="text-2xl font-bold text-slate-900 mt-2">Implementação de 100% dos PDIs</h2>
                <p className="text-sm text-slate-500">
                  {currentUser.profile === 'RH' ? `Acompanhamento global de todos os ${employees.length} colaboradores da empresa.` : `Gerenciando a equipe de ${currentUser.name}.`}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="text-right bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-500 font-medium">Taxa de Adesão</span>
                  <div className="text-3xl font-extrabold text-emerald-600">{implementationRate}%</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">Colaboradores</p>
                  <p className="text-2xl font-bold text-slate-800 mt-1">{totalPDIs}</p>
                </div>
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Users className="w-6 h-6" /></div>
              </div>
              
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">Em Andamento</p>
                  <p className="text-2xl font-bold text-amber-600 mt-1">{inProgressPDIs}</p>
                </div>
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Clock className="w-6 h-6" /></div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">Concluídos</p>
                  <p className="text-2xl font-bold text-emerald-600 mt-1">{completedPDIs}</p>
                </div>
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><CheckCircle2 className="w-6 h-6" /></div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">Metodologia</p>
                  <p className="text-sm font-semibold text-slate-700 mt-1">70/20/10</p>
                </div>
                <div className="p-3 bg-teal-50 text-teal-600 rounded-xl"><BookOpen className="w-6 h-6" /></div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" /> Lista dos Colaboradores ({accessibleEmployees.length})
                </h3>
                <button onClick={() => setActiveTab('list')} className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1">
                  Ver Todos <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="overflow-x-auto max-h-[500px]">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b sticky top-0">
                    <tr>
                      <th className="p-4">Colaborador</th>
                      <th className="p-4">Cargo</th>
                      <th className="p-4">Setor</th>
                      <th className="p-4">Gestor Responsável</th>
                      <th className="p-4">Progresso</th>
                      <th className="p-4 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {accessibleEmployees.map(emp => (
                      <tr key={emp.id} className="hover:bg-slate-50 transition">
                        <td className="p-4 font-semibold text-slate-800">{emp.name}</td>
                        <td className="p-4">{emp.role}</td>
                        <td className="p-4">{emp.department}</td>
                        <td className="p-4 font-medium text-slate-700">{emp.manager}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-24 bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${emp.progress}%` }}></div>
                            </div>
                            <span className="text-xs font-bold text-slate-700">{emp.progress}%</span>
                          </div>
                        </td>
                        <td className="p-4 text-right">
                          <button 
                            onClick={() => { setSelectedId(emp.id); setActiveTab('detail'); }} 
                            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold transition"
                          >
                            Abrir PDI
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {!loading && activeTab === 'list' && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Buscar colaborador ou cargo..." 
                  value={searchTerm} 
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center gap-3">
                <Filter className="w-4 h-4 text-slate-500" />
                <select 
                  value={departmentFilter} 
                  onChange={e => setDepartmentFilter(e.target.value)}
                  className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Todos">Todos os Setores</option>
                  <option value="Operação">Operação</option>
                  <option value="Logistica">Logística</option>
                  <option value="TR 2">TR 2</option>
                  <option value="Administrativo / RH">Administrativo / RH</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEmployees.map(emp => (
                <div key={emp.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-bold text-slate-900">{emp.name}</h3>
                        <p className="text-xs text-slate-500">{emp.role}</p>
                      </div>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {emp.department}
                      </span>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex justify-between text-xs text-slate-600">
                        <span>Progresso do PDI</span>
                        <span className="font-bold">{emp.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${emp.progress}%` }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex justify-between items-center">
                    <span className="text-xs text-slate-400">Gestor: {emp.manager}</span>
                    <button 
                      onClick={() => { setSelectedId(emp.id); setActiveTab('detail'); }}
                      className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-bold transition flex items-center gap-1"
                    >
                      Ver Detalhes <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!loading && activeTab === 'detail' && selectedEmployee && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <button 
                onClick={() => setActiveTab('list')}
                className="text-xs font-bold text-slate-500 hover:text-slate-800 flex items-center gap-1"
              >
                ← Voltar para a lista
              </button>
              <button 
                onClick={() => window.print()} 
                className="px-4 py-2 bg-slate-800 text-white hover:bg-slate-900 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-sm"
              >
                <Printer className="w-4 h-4" /> Imprimir / PDF
              </button>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
              <div className="border-b border-slate-200 pb-6 flex justify-between items-start flex-wrap gap-4">
                <div>
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Ficha Individual de PDI</span>
                  <h2 className="text-3xl font-extrabold text-slate-900 mt-1">{selectedEmployee.name}</h2>
                  <p className="text-sm text-slate-500 font-medium">{selectedEmployee.role} • {selectedEmployee.department}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Gestor Responsável</span>
                  <span className="text-sm font-bold text-slate-700">{selectedEmployee.manager}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl">
                  <h4 className="text-xs font-bold uppercase text-emerald-800 flex items-center gap-1.5 mb-2">
                    <Award className="w-4 h-4" /> Pontos Fortes
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{selectedEmployee.strengths}</p>
                </div>

                <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-xl">
                  <h4 className="text-xs font-bold uppercase text-amber-800 flex items-center gap-1.5 mb-2">
                    <Target className="w-4 h-4" /> Pontos a Desenvolver
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{selectedEmployee.growthAreas}</p>
                </div>

                <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
                  <h4 className="text-xs font-bold uppercase text-blue-800 flex items-center gap-1.5 mb-2">
                    <TrendingUp className="w-4 h-4" /> Objetivo de Carreira
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{selectedEmployee.goal}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Modal de Cadastro de Novo Colaborador */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-800 text-lg flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-emerald-600" /> Cadastrar Novo Colaborador
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEmployee} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nome Completo</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Ex: Carlos Silva"
                  value={newEmployee.nome}
                  onChange={e => setNewEmployee({...newEmployee, nome: e.target.value})}
                  className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Cargo</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Ex: Motorista Operacional"
                    value={newEmployee.cargo}
                    onChange={e => setNewEmployee({...newEmployee, cargo: e.target.value})}
                    className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Departamento / Setor</label>
                  <select 
                    value={newEmployee.departamento}
                    onChange={e => setNewEmployee({...newEmployee, departamento: e.target.value})}
                    className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  >
                    <option value="Operação">Operação</option>
                    <option value="Logistica">Logística</option>
                    <option value="TR 2">TR 2</option>
                    <option value="Administrativo / RH">Administrativo / RH</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Gestor Responsável</label>
                <select 
                  value={newEmployee.gestor_nome}
                  onChange={e => setNewEmployee({...newEmployee, gestor_nome: e.target.value})}
                  className="w-full p-2.5 border rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                >
                  <option value="Daiene Santos">Daiene Santos (RH)</option>
                  <option value="Roberto Santos">Roberto Santos (Operacional)</option>
                  <option value="Marcos Oliveira">Marcos Oliveira (Logística)</option>
                  <option value="Augusto Arruda">Augusto Arruda (Operacional)</option>
                  <option value="Jose Izailton">Jose Izailton (Logística)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold hover:bg-slate-200 transition"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition"
                >
                  Salvar Colaborador
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
