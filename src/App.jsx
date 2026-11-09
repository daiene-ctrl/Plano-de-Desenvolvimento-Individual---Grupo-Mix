import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Users, Target, CheckCircle2, Clock, Search, Filter, 
  ChevronRight, Award, BarChart3, Printer, BookOpen, 
  TrendingUp, UserPlus, X, Lock, LogOut, Shield, Loader2, Save, Plus, Calendar, CheckSquare, FileCheck, MessageSquare, AlertTriangle, ArrowUpRight, Sliders, CalendarClock, AlertCircle, UserCheck, Camera 
} from 'lucide-react';

const supabaseUrl = 'https://hbyjblwzuvntinpugetr.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhieWpibHd6dXZudGlucHVnZXRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEyMzQ1NjcsImV4cCI6MjAxNTAwMDAwMH0.placeholder';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Logo oficial da Mix Soluções Ambientais
const LOGO_URL = "https://hbyjblwzuvntinpugetr.supabase.co/storage/v1/object/public/assets/logo.png";[cite: 3]

const validUsers = [
  { name: "Daiene Santos", email: "daiene@mixsolucoesambientais.com.br", pass: "mix#rh2026", profile: "RH", role: "Gestora de RH / DHO" },
  { name: "Roberto Santos", email: "roberto@mixsolucoesambientais.com.br", pass: "gestor123", profile: "GESTOR", role: "Supervisor Operacional" },
  { name: "Marcos Oliveira", email: "marcos@mixsolucoesambientais.com.br", pass: "gestor123", profile: "GESTOR", role: "Coordenador de Logística" },
  { name: "Augusto Arruda", email: "augusto@mixsolucoesambientais.com.br", pass: "gestor123", profile: "GESTOR", role: "Supervisor Operacional" },
  { name: "Jose Izailton", email: "log@mixsolucoesambientais.com.br", pass: "gestor123", profile: "GESTOR", role: "Gestor Logística" }
];

const initialEmployees = [
  { id: 1, name: "HELIO MARCOS DE JESUS SANTOS", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 2, name: "WALLACE SILVA RODRIGUES", role: "MECANICO DE AUTOMOVEIS E CAMINHOES EM GERAL", department: "Logistica", manager: "Jose Izailton", managerEmail: "log@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 3, name: "GLAUBER LUAN LIMA VIANA", role: "MOTORISTA DE CAMINHÃO", department: "Logistica", manager: "Jose Izailton", managerEmail: "log@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 4, name: "JOSE IZAILTON BATISTA ALMEIDA JUNIOR", role: "ANALISTA DE LOGISTICA DE TRANSPORTE", department: "Logistica", manager: "George Costa", managerEmail: "george@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 5, name: "GIVALDO DE SOUSA CONCEICAO", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 6, name: "AUGUSTO CESAR DE ARRUDA", role: "ENCARREGADO OPERACIONAL LOGISTICO", department: "Operação", manager: "Lucas Borges", managerEmail: "lucas@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 7, name: "BENIVALDO EVANGELISTA DOS SANTOS", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 8, name: "FERNANDO JOAQUIM DO NASCIMENTO", role: "OPERADOR DE EMPILHADEIRA", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 9, name: "LAERCIO SOUZA OLIVEIRA SANTOS", role: "MOTORISTA DE CAMINHÃO", department: "Logistica", manager: "Jose Izailton", managerEmail: "log@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 10, name: "RAFAEL ANJOS MENEZES", role: "MOTORISTA DE CAMINHÃO", department: "Logistica", manager: "Jose Izailton", managerEmail: "log@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 11, name: "ANDRE LACERDA DOS SANTOS", role: "OPERADOR DE TRATAMENTO TERMICO DE RESIDUOS", department: "TR 2", manager: "Ederson Borges", managerEmail: "", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 12, name: "ROQUE NASCIMENTO DOS SANTOS", role: "OPERADOR DE TRATAMENTO TERMICO DE RESIDUOS", department: "TR 2", manager: "Ederson Borges", managerEmail: "", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 13, name: "UILIAM SANTANA DO NASCIMENTO", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 14, name: "EDERSON BORGES SANTOS DE CARVALHO", role: "Supervisor TR2", department: "TR 2", manager: "Lucas Borges", managerEmail: "lucas@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 15, name: "JADSON SANTOS DE SOUZA", role: "MOTORISTA CARRETEIRO", department: "Logistica", manager: "Jose Izailton", managerEmail: "log@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 16, name: "JORGINEI ALMEIDA", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 17, name: "EVANILDO GARCIA DOS SANTOS", role: "SOLDADOR", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 18, name: "FABRICIO DOS SANTOS SAMPAIO", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 19, name: "AVANILDE SANTOS SILVA", role: "AUX. DE LIMPEZA", department: "SGI", manager: "Luiza Costa", managerEmail: "luiza@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 20, name: "ADRIANO ANITOGE DE ARRUDA", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 21, name: "ALEX SANTANA DO NASCIMENTO", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 22, name: "EDUARDO SILVA DA SILVA", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 23, name: "GIVANILDO CONCEICAO MOREIRA", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 24, name: "ACACIO NOVAIS SANTOS", role: "MOTORISTA DE CAMINHÃO", department: "Logistica", manager: "Jose Izailton", managerEmail: "log@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 25, name: "JEFERSON JESUS DE ALCANTARA", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 26, name: "DAVI REIS DE ANDRADE", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 27, name: "ALINE SANTOS SILVA", role: "ASSISTENTE ADMINISTRATIVO", department: "Logistica", manager: "Jose Izailton", managerEmail: "log@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 28, name: "LILIANE ALVES DA SILVA", role: "ASSISTENTE LOGISTICA", department: "Logistica", manager: "Jose Izailton", managerEmail: "log@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 29, name: "PABLO RIAN REIS NOVAES", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 30, name: "JOSIVAN MOTA CARDOSO", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 31, name: "JUTAIR DOS SANTOS BASTOS", role: "VIGIA", department: "SGI", manager: "Luiza Costa", managerEmail: "luiza@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 32, name: "RICARDO ALVES TEIXEIRA", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 33, name: "DANIEL FRANCA BASTOS", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 34, name: "DAIENE LIMA DA SILVA SANTOS MOREIRA", role: "ASSISTENTE DE RECURSOS HUMANOS", department: "Recursos Humanos", manager: "Luiza Costa", managerEmail: "luiza@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 9, c2: 9, c3: 9, c4: 9 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 35, name: "VAGNER RODRIGUES DE OLIVEIRA", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 36, name: "CLEIDIANE SOUZA DOS SANTOS", role: "AUXILIAR FINANCEIRO", department: "Administrativo", manager: "Lucas Borges", managerEmail: "lucas@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 37, name: "JOEVALDO MORAIS DE SANTANA", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 38, name: "VITOR FONSECA DOS SANTOS", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 39, name: "MAYRA MATOS COSTA DE OLIVEIRA", role: "AUXILIAR ADMINISTRATIVO AMBIENTAL", department: "SGI", manager: "Luiza Costa", managerEmail: "luiza@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 40, name: "CASSIANO DE JESUS DOS SANTOS", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 41, name: "ALAENE RODRIGUES COIMBRA ALVES", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 42, name: "BRUNO DOS SANTOS BISPO", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 43, name: "CARLOS ROBERTO DOS SANTOS", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 44, name: "CELIO DOS SANTOS BRITO JUNIOR", role: "MOTORISTA DE CAMINHÃO", department: "Logistica", manager: "Jose Izailton", managerEmail: "log@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 45, name: "DIONE BARRETO CARMO", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 46, name: "EDIVALDO FRANCISCO DE JESUS", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 47, name: "EDSON DOS SANTOS OLIVEIRA", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 48, name: "GUSTAVO BARRENSE DE SOUZA", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 49, name: "IGOR DOS SANTOS NOVAIS", role: "MOTORISTA CARRETEIRO", department: "Logistica", manager: "Jose Izailton", managerEmail: "log@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 50, name: "JAIME BORGES PINHEIRO", role: "MOTORISTA CARRETEIRO", department: "Logistica", manager: "Jose Izailton", managerEmail: "log@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 51, name: "JEOZADAQUE OLIVEIRA SANTOS", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 52, name: "LUIZ FELIPE DE SOUZA MIRANDA", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 53, name: "PAULA XAUANA DO CARMO OLIVEIRA", role: "AUXILIAR ADMINISTRATIVO", department: "Administrativo", manager: "Luiza Costa", managerEmail: "luiza@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 54, name: "RAFAEL BARROSO SANTANA", role: "ASSISTENTE ADMINISTRATIVO", department: "Administrativo", manager: "George Costa", managerEmail: "george@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 55, name: "RAFAEL DOS SANTOS DE LIMA", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 56, name: "SANDRA ALVES PINTO DE SOUZA", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 57, name: "JEFERSON RICARDO NOVAIS DE BARROS", role: "MOTORISTA DE CAMINHÃO", department: "Logistica", manager: "Jose Izailton", managerEmail: "log@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 58, name: "OZIAS OLIVEIRA SANTOS", role: "MOTORISTA CARRETEIRO", department: "Logistica", manager: "Jose Izailton", managerEmail: "log@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 59, name: "SIDNEI LOPES DE OLIVEIRA", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 60, name: "MARCOS ANTONIO ESPIRITO SANTO DE JESUS", role: "MOTORISTA DE CAMINHÃO", department: "Logistica", manager: "Jose Izailton", managerEmail: "log@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 61, name: "DANILO SANTANA DOS SANTOS", role: "MOTORISTA DE CAMINHÃO", department: "Logistica", manager: "Jose Izailton", managerEmail: "log@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 62, name: "UILIANS SILVA SANTOS", role: "MOTORISTA DE CAMINHÃO", department: "Logistica", manager: "Jose Izailton", managerEmail: "log@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 63, name: "RENIO GOMES SOUZA", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 64, name: "REGIVALDO FRANQLIN DOS ANJOS MIRANDA", role: "MOTORISTA DE CAMINHÃO", department: "Logistica", manager: "Jose Izailton", managerEmail: "log@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 65, name: "BRENDO WILLIAN DA SILVA CARMO", role: "ASSISTENTE ADMINISTRATIVO", department: "Administrativo", manager: "Luiza Costa", managerEmail: "luiza@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 66, name: "WALLAS DE SOUZA VIEIRA", role: "MOTORISTA DE CAMINHÃO", department: "Logistica", manager: "Jose Izailton", managerEmail: "log@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null },
  { id: 67, name: "EDUARDO MARTIN DE MACEDO", role: "EXECUTIVO COMERCIAL", department: "Comercial", manager: "George Costa", managerEmail: "george@mixsolucoesambientais.com.br", photo: "", status: "Não Iniciado", progress: 0, cycle: "2026", deadline: "31/12/2026", periodicity: "Trimestral", criteria: { c1: 7, c2: 7, c3: 7, c4: 7 }, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [], notes: [], managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null }
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [employees, setEmployees] = useState(initialEmployees);
  const [selectedId, setSelectedId] = useState(1);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('Todos');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newEmployee, setNewEmployee] = useState({
    name: '', role: '', department: 'Operação', manager: 'Daiene Santos', photo: '', cycle: '2026', deadline: '31/12/2026', periodicity: 'Trimestral'
  });

  const [editFormData, setEditFormData] = useState({ 
    strengths: '', growthAreas: '', goal: '', cycle: '2026', deadline: '31/12/2026', periodicity: 'Trimestral', photo: '',
    criteria: { c1: 7, c2: 7, c3: 7, c4: 7 } 
  });
  
  const [newAction, setNewAction] = useState({ title: '', type: '70% Prática', deadline: '', norm: 'Geral / DHO', evidence: '' });
  const [newNote, setNewNote] = useState('');

  const selectedEmployee = employees.find(e => e.id === selectedId) || employees[0];

  useEffect(() => {
    if (selectedEmployee) {
      setEditFormData({
        strengths: selectedEmployee.strengths || '',
        growthAreas: selectedEmployee.growthAreas || '',
        goal: selectedEmployee.goal || '',
        cycle: selectedEmployee.cycle || '2026',
        deadline: selectedEmployee.deadline || '31/12/2026',
        periodicity: selectedEmployee.periodicity || 'Trimestral',
        photo: selectedEmployee.photo || '',
        criteria: selectedEmployee.criteria || { c1: 7, c2: 7, c3: 7, c4: 7 }
      });
    }
  }, [selectedId, selectedEmployee]);

  // Função auxiliar para gerar iniciais para os avatares sem foto
  const getInitials = (name) => {
    if (!name) return "MS";
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Componente visual unificado para renderizar a foto do colaborador ou as iniciais em fallback
  const renderAvatar = (emp, size = "w-10 h-10 text-xs") => {
    if (emp && emp.photo && emp.photo.trim() !== '') {
      return (
        <img 
          src={emp.photo} 
          alt={emp.name} 
          className={`${size} rounded-full object-cover border-2 border-emerald-500 shadow-sm flex-shrink-0`}
          onError={(e) => { e.target.style.display = 'none'; }}
        />
      );
    }
    return (
      <div className={`${size} rounded-full bg-emerald-700 text-white font-extrabold flex items-center justify-center border-2 border-emerald-500 shadow-sm flex-shrink-0`}>
        {getInitials(emp?.name)}
      </div>
    );
  };

  const calculateScore = (criteria) => {
    const sum = Number(criteria.c1) + Number(criteria.c2) + Number(criteria.c3) + Number(criteria.c4);
    return Math.round((sum / 4) * 10);
  };

  const getFarolStatus = (employee) => {
    const notesCount = (employee.notes || []).length;
    if (notesCount > 0) return { color: "bg-emerald-500", text: "Em Dia (Acompanhado)", badge: "bg-emerald-100 text-emerald-800 border-emerald-200" };
    else if (employee.status === 'Em Andamento' || employee.progress > 0) return { color: "bg-amber-500", text: "Pendente Feedback", badge: "bg-amber-100 text-amber-800 border-amber-200" };
    else return { color: "bg-red-500", text: "Sem Acompanhamento", badge: "bg-red-100 text-red-800 border-red-200" };
  };

  const getRecommendation = (score) => {
    if (score < 60) return { status: "Abaixo do Mínimo / Risco", action: "Plano de Recuperação Rigoroso", badgeColor: "bg-red-600 text-white", icon: AlertTriangle };
    else if (score >= 60 && score <= 84) return { status: "Atende / Em Desenvolvimento", action: "Manter na Função com Foco Contínuo", badgeColor: "bg-amber-600 text-white", icon: Clock };
    else return { status: "Supera o Esperado / Alto Desempenho", action: "Elegível para Promoção", badgeColor: "bg-emerald-600 text-white", icon: ArrowUpRight };
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const user = validUsers.find(u => u.email.toLowerCase() === loginEmail.trim().toLowerCase() && u.pass === loginPassword);
    if (user) { setCurrentUser(user); setIsAuthenticated(true); setLoginError(''); }
    else { setLoginError('E-mail ou senha incorretos.'); }
  };

  const handleLogout = () => { setIsAuthenticated(false); setCurrentUser(null); };

  const handleSavePDI = (e) => {
    e.preventDefault();
    setEmployees(prev => prev.map(emp => {
      if (emp.id === selectedId) {
        return {
          ...emp,
          strengths: editFormData.strengths,
          growthAreas: editFormData.growthAreas,
          goal: editFormData.goal,
          cycle: editFormData.cycle,
          deadline: editFormData.deadline,
          periodicity: editFormData.periodicity,
          photo: editFormData.photo,
          criteria: editFormData.criteria
        };
      }
      return emp;
    }));
    alert("Dados, foto e critérios salvos com sucesso!");
  };

  const handleAddAction = (e) => {
    e.preventDefault();
    if (!newAction.title) return;
    setEmployees(prev => prev.map(emp => {
      if (emp.id === selectedId) {
        const updatedActions = [...(emp.actions || []), { ...newAction, id: Date.now(), completed: false }];
        const completedCount = updatedActions.filter(a => a.completed).length;
        const progress = Math.round((completedCount / updatedActions.length) * 100);
        const status = progress === 100 ? 'Concluído' : 'Em Andamento';
        return { ...emp, actions: updatedActions, progress, status };
      }
      return emp;
    }));
    setNewAction({ title: '', type: '70% Prática', deadline: '', norm: 'Geral / DHO', evidence: '' });
  };

  const toggleActionStatus = (actionId) => {
    setEmployees(prev => prev.map(emp => {
      if (emp.id === selectedId) {
        const updatedActions = emp.actions.map(act => act.id === actionId ? { ...act, completed: !act.completed } : act);
        const completedCount = updatedActions.filter(a => a.completed).length;
        const progress = updatedActions.length > 0 ? Math.round((completedCount / updatedActions.length) * 100) : 0;
        const status = progress === 100 ? 'Concluído' : progress > 0 ? 'Em Andamento' : 'Não Iniciado';
        return { ...emp, actions: updatedActions, progress, status };
      }
      return emp;
    }));
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim()) return;
    const dateStr = new Date().toLocaleDateString('pt-BR');
    const noteObj = { id: Date.now(), text: newNote, date: dateStr, author: currentUser.name };
    setEmployees(prev => prev.map(emp => emp.id === selectedId ? { ...emp, notes: [...(emp.notes || []), noteObj] } : emp));
    setNewNote('');
    alert("Acompanhamento registado com sucesso!");
  };

  const toggleManagerSignature = () => {
    const nowStr = new Date().toLocaleString('pt-BR');
    setEmployees(prev => prev.map(emp => emp.id === selectedId ? { ...emp, managerSigned: !emp.managerSigned, managerSignedAt: !emp.managerSigned ? nowStr : null } : emp));
  };

  const toggleEmployeeSignature = () => {
    const nowStr = new Date().toLocaleString('pt-BR');
    setEmployees(prev => prev.map(emp => emp.id === selectedId ? { ...emp, employeeSigned: !emp.employeeSigned, employeeSignedAt: !emp.employeeSigned ? nowStr : null } : emp));
  };

  const handleAddEmployee = (e) => {
    e.preventDefault();
    const newEmpObj = {
      id: Date.now(),
      name: newEmployee.name,
      role: newEmployee.role,
      department: newEmployee.department,
      manager: newEmployee.manager,
      photo: newEmployee.photo || '',
      cycle: newEmployee.cycle,
      deadline: newEmployee.deadline,
      periodicity: newEmployee.periodicity,
      criteria: { c1: 7, c2: 7, c3: 7, c4: 7 },
      status: 'Não Iniciado',
      progress: 0,
      strengths: 'A mapear em reunião de PDI.',
      growthAreas: 'A definir com a gestão.',
      goal: 'Desenvolvimento contínuo.',
      actions: [], notes: [],
      managerSigned: false, managerSignedAt: null, employeeSigned: false, employeeSignedAt: null
    };
    setEmployees(prev => [newEmpObj, ...prev]);
    setShowAddModal(false);
    setNewEmployee({ name: '', role: '', department: 'Operação', manager: 'Daiene Santos', photo: '', cycle: '2026', deadline: '31/12/2026', periodicity: 'Trimestral' });
    alert("Colaborador cadastrado com sucesso!");
  };

  const accessibleEmployees = employees.filter(emp => {
    if (!currentUser) return false;
    if (currentUser.profile === 'RH') return true;
    return emp.manager.toLowerCase().includes(currentUser.name.toLowerCase().split(' ')[0]);
  });

  const totalPDIs = accessibleEmployees.length;
  const completedPDIs = accessibleEmployees.filter(e => e.progress === 100).length;
  const inProgressPDIs = accessibleEmployees.filter(e => e.progress > 0 && e.progress < 100).length;
  const implementationRate = totalPDIs > 0 ? Math.round((accessibleEmployees.filter(e => e.status !== 'Não Iniciado').length / totalPDIs) * 100) : 0;

  const filteredEmployees = accessibleEmployees.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) || e.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = departmentFilter === 'Todos' || e.department === departmentFilter;
    return matchesSearch && matchesDept;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0d1527] flex items-center justify-center p-4 font-sans">
        <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
          <div className="bg-white p-8 text-center flex flex-col items-center justify-center space-y-3 border-b">
            <img src={LOGO_URL} alt="Mix Soluções Ambientais" className="h-14 object-contain" />[cite: 3]
            <p className="text-xs text-slate-500 font-semibold uppercase tracking-wider">Portal de Gestão de PDI • Pilar Desenvolvimento</p>
          </div>
          <form onSubmit={handleLogin} className="p-8 space-y-5 text-xs">
            {loginError && <div className="p-3 bg-red-50 text-red-700 rounded-xl text-center font-bold">{loginError}</div>}
            <div>
              <label className="block font-bold text-slate-700 mb-1">E-mail Corporativo</label>
              <input type="email" required placeholder="seu.nome@mixsolucoesambientais.com.br" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className="w-full p-3 border rounded-xl" />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Senha de Acesso</label>
              <input type="password" required placeholder="••••••••" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} className="w-full p-3 border rounded-xl" />
            </div>
            <button type="submit" className="w-full py-3.5 bg-[#0b9669] hover:bg-[#087753] text-white rounded-xl font-bold transition">Entrar no Sistema</button>
          </form>
        </div>
      </div>
    );
  }const currentScore = calculateScore(editFormData.criteria);
  const currentRec = getRecommendation(currentScore);
  const RecIcon = currentRec.icon;
  const currentFarol = getFarolStatus(selectedEmployee);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <header className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-xl shadow-sm">
            <img src={LOGO_URL} alt="Mix Soluções Ambientais" className="h-8 object-contain" />[cite: 3]
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-emerald-950/60 px-3 py-1.5 rounded-xl border border-emerald-700/50 flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-300" />
              <div className="text-xs">
                <span className="font-bold text-white block">{currentUser.name}</span>
                <span className="text-[10px] text-emerald-300 font-semibold uppercase">{currentUser.role}</span>
              </div>
            </div>
            <button onClick={handleLogout} className="p-2 bg-emerald-950/40 hover:bg-red-600 text-emerald-200 hover:text-white rounded-xl transition text-xs font-semibold flex items-center gap-1">
              <LogOut className="w-4 h-4" /> Sair
            </button>
          </div>

          <nav className="flex items-center gap-2">
            <div className="flex bg-emerald-950/40 p-1 rounded-xl border border-emerald-700/50">
              <button onClick={() => setActiveTab('dashboard')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${activeTab === 'dashboard' ? 'bg-white text-emerald-900 shadow' : 'text-emerald-100 hover:text-white'}`}>
                <BarChart3 className="w-4 h-4" /> Visão Geral
              </button>
              <button onClick={() => setActiveTab('list')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 ${activeTab === 'list' || activeTab === 'detail' ? 'bg-white text-emerald-900 shadow' : 'text-emerald-100 hover:text-white'}`}>
                <Users className="w-4 h-4" /> Colaboradores ({accessibleEmployees.length})
              </button>
            </div>

            {currentUser.profile === 'RH' && (
              <button onClick={() => setShowAddModal(true)} className="px-3 py-2 bg-emerald-500 hover:bg-emerald-400 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md">
                <UserPlus className="w-4 h-4" /> Novo Colaborador
              </button>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap justify-between items-center gap-4">
              <div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">SGI & FAROL DE ACOMPANHAMENTO</span>
                <h2 className="text-2xl font-bold text-slate-900 mt-2">Implementação de 100% dos PDIs e Metas</h2>
                <p className="text-sm text-slate-500">Gestão integrada alinhada às NRs e desenvolvimento humano.</p>
              </div>
              <div className="text-right bg-slate-50 p-4 rounded-xl border">
                <span className="text-xs text-slate-500 font-medium">Taxa de Adesão</span>
                <div className="text-3xl font-extrabold text-emerald-600">{implementationRate}%</div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-xl border shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">Total Colaboradores</p>
                  <p className="text-2xl font-bold text-slate-800 mt-1">{totalPDIs}</p>
                </div>
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Users className="w-6 h-6" /></div>
              </div>
              <div className="bg-white p-5 rounded-xl border shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">Em Andamento</p>
                  <p className="text-2xl font-bold text-amber-600 mt-1">{inProgressPDIs}</p>
                </div>
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Clock className="w-6 h-6" /></div>
              </div>
              <div className="bg-white p-5 rounded-xl border shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">Concluídos</p>
                  <p className="text-2xl font-bold text-emerald-600 mt-1">{completedPDIs}</p>
                </div>
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><CheckCircle2 className="w-6 h-6" /></div>
              </div>
            </div>

            <div className="bg-white rounded-xl border shadow-sm p-4">
              <h3 className="font-bold text-slate-800 mb-4">Lista de Colaboradores Recentes</h3>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-xs uppercase text-slate-500">
                    <th className="p-3">Foto</th>
                    <th className="p-3">Farol</th>
                    <th className="p-3">Colaborador</th>
                    <th className="p-3">Cargo</th>
                    <th className="p-3">Gestor Responsável</th>
                    <th className="p-3">Média</th>
                    <th className="p-3 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {accessibleEmployees.slice(0, 10).map(emp => {
                    const scr = calculateScore(emp.criteria || { c1: 7, c2: 7, c3: 7, c4: 7 });
                    const farol = getFarolStatus(emp);
                    return (
                      <tr key={emp.id} className="border-b hover:bg-slate-50">
                        <td className="p-3">{renderAvatar(emp, "w-9 h-9 text-xs")}</td>
                        <td className="p-3"><span className={`inline-block w-3.5 h-3.5 rounded-full ${farol.color} shadow-sm`} title={farol.text}></span></td>
                        <td className="p-3 font-semibold">{emp.name}</td>
                        <td className="p-3 text-slate-600">{emp.role}</td>
                        <td className="p-3 font-bold text-emerald-900">{emp.manager}</td>
                        <td className="p-3 font-bold">{scr}/100</td>
                        <td className="p-3 text-right">
                          <button onClick={() => { setSelectedId(emp.id); setActiveTab('detail'); }} className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold">Abrir PDI</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'list' && (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4 justify-between items-center">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input type="text" placeholder="Buscar colaborador ou cargo..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-9 pr-4 py-2 bg-white border rounded-xl text-sm" />
              </div>
              <div className="flex items-center gap-3">
                <Filter className="w-4 h-4 text-slate-500" />
                <select value={departmentFilter} onChange={e => setDepartmentFilter(e.target.value)} className="bg-white border rounded-xl px-3 py-2 text-sm">
                  <option value="Todos">Todos os Setores</option>
                  <option value="Operação">Operação</option>
                  <option value="Logistica">Logística</option>
                  <option value="TR 2">TR 2</option>
                  <option value="Administrativo">Administrativo</option>
                  <option value="Comercial">Comercial</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEmployees.map(emp => {
                const scr = calculateScore(emp.criteria || { c1: 7, c2: 7, c3: 7, c4: 7 });
                const rec = getRecommendation(scr);
                const farol = getFarolStatus(emp);
                return (
                  <div key={emp.id} className="bg-white p-5 rounded-2xl border shadow-sm flex flex-col justify-between">
                    <div>
                      <div className="flex items-start gap-3">
                        {renderAvatar(emp, "w-12 h-12 text-sm")}
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className={`w-3 h-3 rounded-full ${farol.color} shadow-sm`} title={farol.text}></span>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded border ${farol.badge}`}>{farol.text}</span>
                          </div>
                          <h3 className="font-bold text-slate-900 text-sm">{emp.name}</h3>
                          <p className="text-xs text-slate-500">{emp.role}</p>
                        </div>
                      </div>

                      <div className="mt-3 p-2 bg-emerald-50/60 rounded-xl border border-emerald-100 flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-emerald-700 flex-shrink-0" />
                        <div className="text-xs">
                          <span className="text-[10px] text-emerald-800 font-semibold block uppercase">Gestor Responsável</span>
                          <span className="font-bold text-slate-800">{emp.manager}</span>
                        </div>
                      </div>

                      <div className="mt-3 space-y-2">
                        <div className="flex justify-between text-xs text-slate-600">
                          <span>Validade: <b>{emp.deadline || '31/12/2026'}</b></span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${rec.badgeColor}`}>{rec.status}</span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-full" style={{ width: `${emp.progress}%` }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-5 pt-3 border-t flex justify-end items-center text-xs">
                      <button onClick={() => { setSelectedId(emp.id); setActiveTab('detail'); }} className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition">
                        Ver Ficha e Histórico <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'detail' && selectedEmployee && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <button onClick={() => setActiveTab('list')} className="text-xs font-bold text-slate-500 hover:text-slate-800">← Voltar para a lista</button>
              <button onClick={() => window.print()} className="px-4 py-2 bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm">
                <Printer className="w-4 h-4" /> Imprimir Ficha de Auditoria (PDF)
              </button>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border shadow-sm space-y-6">
              <div className="flex justify-between border-b pb-4 flex-wrap gap-4 items-center">
                <div className="flex items-center gap-4">
                  {renderAvatar(selectedEmployee, "w-16 h-16 text-lg")}
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`w-3.5 h-3.5 rounded-full ${currentFarol.color} shadow-sm`}></span>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded border ${currentFarol.badge}`}>Farol SGI: {currentFarol.text}</span>
                    </div>
                    <h2 className="text-2xl font-extrabold text-slate-900 mt-1">{selectedEmployee.name}</h2>
                    <p className="text-xs text-slate-500 font-medium">{selectedEmployee.role} • {selectedEmployee.department}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 flex-wrap">
                  <div className="bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl flex items-center gap-2.5">
                    <div className="p-2 bg-emerald-600 text-white rounded-lg"><UserCheck className="w-4 h-4" /></div>
                    <div>
                      <span className="text-[10px] text-emerald-800 font-bold block uppercase">Gestor Responsável</span>
                      <span className="text-xs font-extrabold text-slate-900">{selectedEmployee.manager}</span>
                    </div>
                  </div>

                  <div className="text-right border-l pl-3">
                    <span className="text-xs text-slate-400 block">Ciclo</span>
                    <select value={editFormData.cycle} onChange={e => setEditFormData({...editFormData, cycle: e.target.value})} className="p-1.5 border rounded-lg text-xs font-bold bg-slate-50">
                      <option value="2026">Ciclo 2026</option>
                      <option value="2027">Ciclo 2027</option>
                    </select>
                  </div>

                  <div className="text-right border-l pl-3">
                    <span className="text-xs text-slate-400 block">Prazo / Meta Conclusão</span>
                    <input type="text" value={editFormData.deadline} onChange={e => setEditFormData({...editFormData, deadline: e.target.value})} className="w-24 p-1.5 border rounded-lg text-xs font-bold bg-slate-50 text-center" />
                  </div>

                  <div className="text-right border-l pl-3">
                    <span className="text-xs text-slate-400 block">Acompanhamento</span>
                    <select value={editFormData.periodicity} onChange={e => setEditFormData({...editFormData, periodicity: e.target.value})} className="p-1.5 border rounded-lg text-xs font-bold bg-emerald-50 text-emerald-800">
                      <option value="Trimestral">Trimestral</option>
                      <option value="Semestral">Semestral</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* CAMPO DE INCLUSÃO DA FOTO DO COLABORADOR */}
              <div className="p-4 bg-slate-50 rounded-xl border flex items-center gap-4">
                <Camera className="w-5 h-5 text-emerald-700 flex-shrink-0" />
                <div className="flex-1">
                  <label className="block text-xs font-bold text-slate-700 mb-1">URL da Fotografia do Colaborador (Link da imagem)</label>
                  <input 
                    type="url" 
                    placeholder="Cole o link da foto (ex: https://exemplo.com/foto.jpg)" 
                    value={editFormData.photo}
                    onChange={e => setEditFormData({...editFormData, photo: e.target.value})}
                    className="w-full p-2 border rounded-lg text-xs bg-white"
                  />
                </div>
              </div>

              {/* CRITÉRIOS OBJETIVOS */}
              <div className="bg-slate-50 p-6 rounded-2xl border space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-emerald-700" />
                    <h3 className="font-bold text-slate-900 text-sm">Critérios Objetivos de Desempenho (Pontue de 0 a 10)</h3>
                  </div>
                  <span className="text-xs bg-emerald-100 text-emerald-800 font-bold px-3 py-1 rounded-full">
                    Média Calculada: {currentScore} / 100
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="bg-white p-3 rounded-xl border space-y-1">
                    <div className="flex justify-between font-bold text-slate-700">
                      <span>1. Competência Técnica / Tarefas</span>
                      <input type="number" min="0" max="10" value={editFormData.criteria.c1} onChange={e => setEditFormData({...editFormData, criteria: {...editFormData.criteria, c1: e.target.value}})} className="w-12 p-1 text-center border rounded font-bold" />
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border space-y-1">
                    <div className="flex justify-between font-bold text-slate-700">
                      <span>2. Segurança (NRs) & SGI</span>
                      <input type="number" min="0" max="10" value={editFormData.criteria.c2} onChange={e => setEditFormData({...editFormData, criteria: {...editFormData.criteria, c2: e.target.value}})} className="w-12 p-1 text-center border rounded font-bold" />
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border space-y-1">
                    <div className="flex justify-between font-bold text-slate-700">
                      <span>3. Ética, Conduta & Equipe</span>
                      <input type="number" min="0" max="10" value={editFormData.criteria.c3} onChange={e => setEditFormData({...editFormData, criteria: {...editFormData.criteria, c3: e.target.value}})} className="w-12 p-1 text-center border rounded font-bold" />
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded-xl border space-y-1">
                    <div className="flex justify-between font-bold text-slate-700">
                      <span>4. Proatividade & Evolução PDI</span>
                      <input type="number" min="0" max="10" value={editFormData.criteria.c4} onChange={e => setEditFormData({...editFormData, criteria: {...editFormData.criteria, c4: e.target.value}})} className="w-12 p-1 text-center border rounded font-bold" />
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-xl border ${currentRec.badgeColor.includes('red') ? 'bg-red-50 text-red-700 border-red-200' : currentRec.badgeColor.includes('amber') ? 'bg-amber-50 text-amber-800 border-amber-200' : 'bg-emerald-50 text-emerald-800 border-emerald-200'} flex items-center justify-between flex-wrap gap-3`}>
                  <div className="flex items-center gap-3">
                    <RecIcon className="w-5 h-5 flex-shrink-0" />
                    <div>
                      <span className="text-[10px] uppercase font-bold block opacity-80">Status Automático</span>
                      <h4 className="font-extrabold text-sm">{currentRec.status}</h4>
                    </div>
                  </div>
                  <div className="text-xs"><b>Recomendação:</b> {currentRec.action}</div>
                </div>
              </div>

              <form onSubmit={handleSavePDI} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl space-y-2">
                  <label className="text-xs font-bold uppercase text-emerald-800 block">Pontos Fortes</label>
                  <textarea rows={4} value={editFormData.strengths} onChange={e => setEditFormData({...editFormData, strengths: e.target.value})} className="w-full p-2 text-xs border rounded-lg" />
                </div>
                <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-xl space-y-2">
                  <label className="text-xs font-bold uppercase text-amber-800 block">Pontos a Desenvolver</label>
                  <textarea rows={4} value={editFormData.growthAreas} onChange={e => setEditFormData({...editFormData, growthAreas: e.target.value})} className="w-full p-2 text-xs border rounded-lg" />
                </div>
                <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl space-y-2">
                  <label className="text-xs font-bold uppercase text-blue-800 block">Objetivo de Carreira</label>
                  <textarea rows={4} value={editFormData.goal} onChange={e => setEditFormData({...editFormData, goal: e.target.value})} className="w-full p-2 text-xs border rounded-lg" />
                </div>
                <div className="md:col-span-3 flex justify-end">
                  <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow">
                    <Save className="w-4 h-4" /> Salvar Alterações, Foto e Avaliação
                  </button>
                </div>
              </form>

              {/* PLANO DE AÇÃO */}
              <div className="pt-6 border-t space-y-4">
                <h3 className="font-bold text-slate-900 text-base">Plano de Ação e Treinamentos (Metodologia 70/20/10)</h3>
                <form onSubmit={handleAddAction} className="grid grid-cols-1 sm:grid-cols-5 gap-3 bg-slate-50 p-4 rounded-xl border">
                  <input type="text" required placeholder="Ação ou Treinamento" value={newAction.title} onChange={e => setNewAction({...newAction, title: e.target.value})} className="p-2 border rounded-lg text-xs sm:col-span-2" />
                  <select value={newAction.type} onChange={e => setNewAction({...newAction, type: e.target.value})} className="p-2 border rounded-lg text-xs bg-white">
                    <option value="70% Prática">70% Prática</option>
                    <option value="20% Mentoria">20% Mentoria</option>
                    <option value="10% Cursos/NR">10% Cursos / NRs</option>
                  </select>
                  <select value={newAction.norm} onChange={e => setNewAction({...newAction, norm: e.target.value})} className="p-2 border rounded-lg text-xs bg-white">
                    <option value="Geral / DHO">Geral / DHO</option>
                    <option value="NR 01 (Gerenciamento)">NR 01</option>
                    <option value="NR 06 (EPIs)">NR 06</option>
                    <option value="NR 17 (Ergonomia)">NR 17</option>
                    <option value="SGI (Gestão Integrada)">SGI</option>
                  </select>
                  <button type="submit" className="p-2 bg-emerald-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1"><Plus className="w-4 h-4" /> Adicionar</button>
                </form>

                <div className="space-y-2">
                  {(selectedEmployee.actions || []).map(action => (
                    <div key={action.id} className="flex items-center justify-between p-3 border rounded-xl text-xs bg-white gap-2">
                      <div className="flex items-center gap-3 flex-1">
                        <input type="checkbox" checked={action.completed} onChange={() => toggleActionStatus(action.id)} className="w-4 h-4 text-emerald-600 rounded" />
                        <span className={action.completed ? "line-through text-slate-400 font-semibold" : "font-semibold text-slate-800"}>{action.title}</span>
                      </div>
                      <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-md text-[10px] font-bold border">{action.norm}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* HISTÓRICO */}
              <div className="pt-6 border-t space-y-4">
                <div className="flex items-center gap-2">
                  <CalendarClock className="w-5 h-5 text-emerald-700" />
                  <h4 className="font-bold text-slate-900 text-sm">Histórico de Acompanhamento</h4>
                </div>
                <form onSubmit={handleAddNote} className="space-y-3 bg-slate-50 p-4 rounded-xl border">
                  <textarea rows={3} required placeholder="Registar notas da reunião de feedback..." value={newNote} onChange={e => setNewNote(e.target.value)} className="w-full p-3 border rounded-xl text-xs bg-white" />
                  <div className="flex justify-end"><button type="submit" className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-2"><Save className="w-4 h-4" /> Registar Feedback</button></div>
                </form>
                <div className="space-y-2 pt-2">
                  {(selectedEmployee.notes || []).map(note => (
                    <div key={note.id} className="p-3 bg-white border rounded-xl text-xs space-y-1">
                      <div className="flex justify-between text-slate-400 text-[10px]">
                        <span>Registado por: <b>{note.author}</b></span>
                        <span>{note.date}</span>
                      </div>
                      <p className="text-slate-700">{note.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ASSINATURA DIGITAL */}
              <div className="pt-6 border-t space-y-4 bg-emerald-50/40 p-5 rounded-2xl border border-emerald-100">
                <div className="flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-emerald-700" />
                  <h4 className="font-bold text-slate-900 text-sm">Assinatura Digital & Validação de Conformidade (SGI)</h4>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
                  <div className="bg-white p-4 rounded-xl border shadow-sm space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                      <input type="checkbox" checked={selectedEmployee.managerSigned} onChange={toggleManagerSignature} className="w-4 h-4 text-emerald-600 rounded" />
                      <span>Assinatura do Gestor ({selectedEmployee.manager})</span>
                    </label>
                    {selectedEmployee.managerSigned && <div className="text-[11px] text-emerald-700 bg-emerald-50 p-2 rounded">✓ Assinado em: <b>{selectedEmployee.managerSignedAt}</b></div>}
                  </div>
                  <div className="bg-white p-4 rounded-xl border shadow-sm space-y-3">
                    <label className="flex items-center gap-2 cursor-pointer font-bold text-slate-800">
                      <input type="checkbox" checked={selectedEmployee.employeeSigned} onChange={toggleEmployeeSignature} className="w-4 h-4 text-emerald-600 rounded" />
                      <span>De Acordo do Colaborador ({selectedEmployee.name})</span>
                    </label>
                    {selectedEmployee.employeeSigned && <div className="text-[11px] text-emerald-700 bg-emerald-50 p-2 rounded">✓ Validado em: <b>{selectedEmployee.employeeSignedAt}</b></div>}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-800 text-base flex items-center gap-2"><UserPlus className="w-5 h-5 text-emerald-600" /> Cadastrar Novo Colaborador</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleAddEmployee} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nome Completo</label>
                <input type="text" required placeholder="Ex: João da Silva" value={newEmployee.name} onChange={e => setNewEmployee({...newEmployee, name: e.target.value})} className="w-full p-2.5 border rounded-xl" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Cargo</label>
                  <input type="text" required placeholder="Ex: Operador" value={newEmployee.role} onChange={e => setNewEmployee({...newEmployee, role: e.target.value})} className="w-full p-2.5 border rounded-xl" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Setor</label>
                  <select value={newEmployee.department} onChange={e => setNewEmployee({...newEmployee, department: e.target.value})} className="w-full p-2.5 border rounded-xl bg-white">
                    <option value="Operação">Operação</option>
                    <option value="Logistica">Logística</option>
                    <option value="TR 2">TR 2</option>
                    <option value="Administrativo">Administrativo</option>
                    <option value="Comercial">Comercial</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">URL da Foto (Opcional)</label>
                <input type="url" placeholder="https://..." value={newEmployee.photo} onChange={e => setNewEmployee({...newEmployee, photo: e.target.value})} className="w-full p-2.5 border rounded-xl" />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Gestor</label>
                  <select value={newEmployee.manager} onChange={e => setNewEmployee({...newEmployee, manager: e.target.value})} className="w-full p-2.5 border rounded-xl bg-white">
                    <option value="Daiene Santos">Daiene Santos</option>
                    <option value="Roberto Santos">Roberto Santos</option>
                    <option value="Marcos Oliveira">Marcos Oliveira</option>
                    <option value="Augusto Arruda">Augusto Arruda</option>
                    <option value="Jose Izailton">Jose Izailton</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Validade</label>
                  <input type="text" value={newEmployee.deadline} onChange={e => setNewEmployee({...newEmployee, deadline: e.target.value})} className="w-full p-2.5 border rounded-xl text-center" />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Acompanhamento</label>
                  <select value={newEmployee.periodicity} onChange={e => setNewEmployee({...newEmployee, periodicity: e.target.value})} className="w-full p-2.5 border rounded-xl bg-white font-bold">
                    <option value="Trimestral">Trimestral</option>
                    <option value="Semestral">Semestral</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl font-bold">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold">Salvar Colaborador</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
