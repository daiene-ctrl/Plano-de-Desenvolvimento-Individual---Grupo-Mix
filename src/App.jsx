import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Users, Target, CheckCircle2, Clock, Search, Filter, 
  ChevronRight, Award, BarChart3, Printer, BookOpen, 
  TrendingUp, UserPlus, X, Lock, LogOut, Shield, Loader2, RefreshCw
} from 'lucide-react';

const supabaseUrl = 'https://hbyjblwzuvntinpugetr.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
const supabase = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey) : null;

const validUsers = [
  { name: "Daiene Santos", email: "daiene@mixsolucoesambientais.com.br", pass: "mix#rh2026", profile: "RH", role: "Gestora de RH / DHO" },
  { name: "Roberto Santos", email: "roberto@mixsolucoesambientais.com.br", pass: "gestor123", profile: "GESTOR", role: "Supervisor Operacional" },
  { name: "Marcos Oliveira", email: "marcos@mixsolucoesambientais.com.br", pass: "gestor123", profile: "GESTOR", role: "Coordenador de Logística" },
  { name: "Augusto Arruda", email: "augusto@mixsolucoesambientais.com.br", pass: "gestor123", profile: "GESTOR", role: "Supervisor Operacional" },
  { name: "Jose Izailton", email: "log@mixsolucoesambientais.com.br", pass: "gestor123", profile: "GESTOR", role: "Gestor Logística" }
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [selectedId, setSelectedId] = useState(null);
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

  const fetchEmployees = async () => {
    if (!supabase) return;
    setLoading(true);
    setFetchError('');
    try {
      const { data: colaboradoresData, error: empError } = await supabase
        .from('colaboradores')
        .select('*');

      if (empError) throw empError;

      const { data: acoesData } = await supabase
        .from('acoes_pdi')
        .select('*');

      const formatted = (colaboradoresData || []).map(emp => ({
        id: emp.id,
        name: emp.nome || emp.name || 'Sem Nome',
        role: emp.cargo || emp.role || 'Sem Cargo',
        department: emp.departamento || emp.department || 'Geral',
        manager: emp.gestor_nome || emp.manager || 'Não Definido',
        managerEmail: emp.gestor_email || emp.manager_email || '',
        status: emp.status || 'Não Iniciado',
        progress: emp.progress || 0,
        strengths: emp.pontos_fortes || emp.strengths || 'A mapear em reunião de PDI.',
        growthAreas: emp.pontos_desenvolver || emp.growth_areas || 'A definir com a gestão.',
        goal: emp.objetivo_carreira || emp.goal || 'Desenvolvimento contínuo.',
        actions: (acoesData || []).filter(a => a.colaborador_id === emp.id).map(a => ({
          id: a.id,
          type: a.type,
          category: a.category,
          title: a.title,
          evidence: a.evidence,
          deadline: a.deadline,
          status: a.status
        }))
      }));

      setEmployees(formatted);
      if (formatted.length > 0 && !selectedId) {
        setSelectedId(formatted[0].id);
      }
    } catch (err) {
      console.error("Erro Supabase:", err);
      setFetchError("Falha ao carregar colaboradores do Supabase.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchEmployees();
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

  const handleStatusChange = async (actionId, newStatus) => {
    if (!selectedEmployee) return;

    const updatedActions = selectedEmployee.actions.map(act => act.id === actionId ? { ...act, status: newStatus } : act);
    const completed = updatedActions.filter(a => a.status === 'Concluído').length;
    const progress = Math.round((completed / (updatedActions.length || 1)) * 100);
    let status = 'Em Andamento';
    if (progress === 100) status = 'Concluído';
    if (progress === 0 && updatedActions.every(a => a.status === 'Não Iniciado')) status = 'Não Iniciado';

    setEmployees(prev => prev.map(emp => emp.id === selectedEmployee.id ? { ...emp, actions: updatedActions, progress, status } : emp));

    if (supabase) {
      await supabase.from('acoes_pdi').update({ status: newStatus }).eq('id', actionId);
      await supabase.from('colaboradores').update({ progress, status }).eq('id', selectedEmployee.id);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0d1527] flex items-center justify-center p-4 font-sans">
        <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
          <div className="bg-[#055a43] p-8 text-center text-white space-y-2">
            <div className="flex justify-center mb-1">
              <svg className="h-10 w-auto text-white" viewBox="0 0 200 60" fill="none">
                <path d="M 10 50 L 10 15 L 25 38 L 40 15 L 40 50" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="58" y1="26" x2="58" y2="50" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
                <path d="M 53 20 C 48 10 50 2 60 2 C 65 10 62 18 53 20 Z" fill="#4CAE30" />
                <path d="M 60 19 C 62 10 70 5 78 8 C 75 16 68 20 60 19 Z" fill="#60A5FA" />
                <path d="M 72 26 L 95 50" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
                <path d="M 95 26 L 72 50" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
                <text x="105" y="34" fill="#4CAE30" fontFamily="Arial" fontSize="11" fontWeight="bold">SOLUÇÕES</text>
                <text x="105" y="47" fill="#4CAE30" fontFamily="Arial" fontSize="11" fontWeight="bold">AMBIENTAIS</text>
              </svg>
            </div>
            <h2 className="text-xl font-extrabold tracking-tight">MIX SOLUÇÕES AMBIENTAIS</h2>
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
          <div>
            <h1 className="text-xl font-bold tracking-tight">MIX SOLUÇÕES AMBIENTAIS</h1>
            <p className="text-xs text-emerald-200">Sistema de Gestão de PDI • {employees.length} Colaboradores</p>
          </div>

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

          <nav className="flex bg-emerald-950/40 p-1 rounded-xl border border-emerald-700/50">
            <button 
              onClick={() => setActiveTab('dashboard')} 
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-2 ${activeTab === 'dashboard' ? 'bg-white text-emerald-900 shadow' : 'text-emerald-100 hover:text-white'}`}
            >
              <BarChart3 className="w-4 h-4" /> Visão Geral
            </button>
            <button 
              onClick={() => setActiveTab('list')} 
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-2 ${activeTab === 'list' || activeTab === 'detail' ? 'bg-white text-emerald
