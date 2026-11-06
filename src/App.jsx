import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Users, Target, CheckCircle2, Clock, Search, Filter, 
  ChevronRight, Award, BarChart3, Printer, BookOpen, 
  TrendingUp, UserPlus, X, Lock, LogOut, Shield, Loader2
} from 'lucide-react';

// Conexão dinâmica com as variáveis de ambiente ativas na Vercel
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey) : null;

const validUsers = [
  { name: "Daiene Santos", email: "daiene@mixsolucoesambientais.com.br", pass: "mix#rh2026", profile: "RH", role: "Gestora de RH / DHO" },
  { name: "Roberto Santos", email: "roberto@mixsolucoesambientais.com.br", pass: "gestor123", profile: "GESTOR", role: "Supervisor Operacional" },
  { name: "Marcos Oliveira", email: "marcos@mixsolucoesambientais.com.br", pass: "gestor123", profile: "GESTOR", role: "Coordenador de Logística" }
];

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Main App State
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('Todos');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    role: '',
    department: 'Operacional',
    manager: 'Daiene Santos',
    strengths: '',
    growthAreas: '',
    goal: ''
  });

  // Carregar dados reais do Supabase
  const fetchEmployees = async () => {
    if (!supabase) return;
    setLoading(true);
    try {
      const { data: colaboradoresData, error: empError } = await supabase
        .from('colaboradores')
        .select('*');

      if (empError) throw empError;

      const { data: acoesData, error: acoesError } = await supabase
        .from('acoes_pdi')
        .select('*');

      if (acoesError) throw acoesError;

      const formatted = colaboradoresData.map(emp => ({
        id: emp.id,
        name: emp.name,
        role: emp.role,
        department: emp.department,
        manager: emp.manager,
        managerEmail: emp.manager_email,
        status: emp.status || 'Não Iniciado',
        progress: emp.progress || 0,
        strengths: emp.strengths || 'A mapear em reunião de PDI.',
        growthAreas: emp.growth_areas || 'A definir com a gestão.',
        goal: emp.goal || 'Desenvolvimento contínuo.',
        actions: acoesData.filter(a => a.colaborador_id === emp.id).map(a => ({
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
      console.error("Erro ao buscar dados do Supabase:", err);
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
      setLoginError('E-mail ou senha incorretos. Verifique as credenciais.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setLoginEmail('');
    setLoginPassword('');
  };

  const accessibleEmployees = employees.filter(emp => {
    if (!currentUser) return false;
    if (currentUser.profile === 'RH') return true;
    return emp.manager === currentUser.name;
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

    // Atualização otimista no estado local
    const updatedActions = selectedEmployee.actions.map(act => act.id === actionId ? { ...act, status: newStatus } : act);
    const completed = updatedActions.filter(a => a.status === 'Concluído').length;
    const progress = Math.round((completed / (updatedActions.length || 1)) * 100);
    let status = 'Em Andamento';
    if (progress === 100) status = 'Concluído';
    if (progress === 0 && updatedActions.every(a => a.status === 'Não Iniciado')) status = 'Não Iniciado';

    setEmployees(prev => prev.map(emp => emp.id === selectedEmployee.id ? { ...emp, actions: updatedActions, progress, status } : emp));

    // Persistência no Supabase
    if (supabase) {
      await supabase.from('acoes_pdi').update({ status: newStatus }).eq('id', actionId);
      await supabase.from('colaboradores').update({ progress, status }).eq('id', selectedEmployee.id);
    }
  };

  const handleAddEmployee = async (e) => {
    e.preventDefault();
    if (!supabase) return;

    setLoading(true);
    try {
      const { data: newEmpData, error: empErr } = await supabase
        .from('colaboradores')
        .insert([{
          name: newEmployee.name,
          role: newEmployee.role,
          department: newEmployee.department,
          manager: newEmployee.manager,
          manager_email: `${newEmployee.manager.toLowerCase().split(' ')[0]}@mixsolucoesambientais.com.br`,
          status: 'Não Iniciado',
          progress: 0,
          strengths: newEmployee.strengths || 'A mapear em reunião de PDI.',
          growth_areas: newEmployee.growthAreas || 'A definir com a gestão.',
          goal: newEmployee.goal || 'Desenvolvimento contínuo.'
        }])
        .select();

      if (empErr) throw empErr;

      const createdEmp = newEmpData[0];

      const initialActions = [
        { colaborador_id: createdEmp.id, type: "70%", category: "Prática", title: "Alinhamento prático das rotinas operacionais", evidence: "Validação pelo gestor", deadline: "2026-12-31", status: "Não Iniciado" },
        { colaborador_id: createdEmp.id, type: "20%", category: "Mentoria", title: "Feedback e mentoria mensal", evidence: "Ata de reunião de feedback", deadline: "2026-12-31", status: "Não Iniciado" },
        { colaborador_id: createdEmp.id, type: "10%", category: "Curso", title: "Treinamento obrigatório de integração e segurança", evidence: "Certificado de conclusão", deadline: "2026-11-30", status: "Não Iniciado" }
      ];

      await supabase.from('acoes_pdi').insert(initialActions);

      await fetchEmployees();
      setShowAddModal(false);
      setNewEmployee({ name: '', role: '', department: 'Operacional', manager: 'Daiene Santos', strengths: '', growthAreas: '', goal: '' });
    } catch (err) {
      console.error("Erro ao cadastrar colaborador:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 font-sans relative overflow-hidden">
        <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl overflow-hidden border border-slate-100 z-10">
          <div className="bg-gradient-to-r from-emerald-800 to-teal-900 p-8 text-center text-white">
            <div className="flex justify-center mb-4">
              <img src="/logo.png" alt="Mix Soluções Ambientais" className="h-12 w-auto object-contain brightness-0 invert" />
            </div>
            <h2 className="text-xl font-extrabold tracking-tight">MIX SOLUÇÕES AMBIENTAIS</h2>
            <p className="text-xs text-emerald-200 mt-1">Portal de Gestão de PDI • Conectado ao Supabase</p>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-5 text-xs">
            {loginError && (
              <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-semibold">
                {loginError}
              </div>
            )}

            <div>
              <label className="block font-bold text-slate-700 mb-1">E-mail Corporativo</label>
              <input 
                type="email" 
                required 
                placeholder="seu.nome@mixsolucoesambientais.com.br"
                value={loginEmail}
                onChange={e => setLoginEmail(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Senha de Acesso</label>
              <input 
                type="password" 
                required 
                placeholder="••••••••"
                value={loginPassword}
                onChange={e => setLoginPassword(e.target.value)}
                className="w-full p-3 border border-slate-200 rounded-xl text-slate-800 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <button 
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-sm shadow-md transition flex items-center justify-center gap-2"
            >
              <Lock className="w-4 h-4" /> Entrar no Sistema
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <header className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white shadow-md no-print">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="Mix Soluções Ambientais" className="h-10 w-auto object-contain" />
            <div>
              <h1 className="text-xl font-bold tracking-tight">MIX SOLUÇÕES AMBIENTAIS</h1>
              <p className="text-xs text-emerald-200">Sistema de Gestão de PDI • Dados em Tempo Real</p>
            </div>
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
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-2 ${activeTab === 'list' || activeTab === 'detail' ? 'bg-white text-emerald-900 shadow' : 'text-emerald-100 hover:text-white'}`}
            >
              <Users className="w-4 h-4" /> Colaboradores ({accessibleEmployees.length})
            </button>
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
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">META ESTRATÉGICA 2026</span>
                  {currentUser.profile === 'GESTOR' && (
                    <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">Gestor: {currentUser.name}</span>
                  )}
                </div>
                <h2 className="text-2xl font-bold text-slate-900 mt-2">Implementação de 100% dos PDIs</h2>
                <p className="text-sm text-slate-500">
                  {currentUser.profile === 'RH' ? 'Acompanhamento global sincronizado no banco de dados.' : `Gerenciando colaboradores diretos de ${currentUser.name}.`}
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                {currentUser.profile === 'RH' && (
                  <button 
                    onClick={() => setShowAddModal(true)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" /> Cadastrar Colaborador
                  </button>
                )}
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
                  <TrendingUp className="w-5 h-5 text-emerald-600" /> Status dos PDIs
                </h3>
                <button onClick={() => setActiveTab('list')} className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold flex items-center gap-1">
                  Ver Todos <ChevronRight className="w-4 h-4" />
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-xs uppercase text-slate-500 font-semibold border-b">
                    <tr>
                      <th className="p-4">Colaborador</th>
                      <th className="p-4">Setor</th>
                      <th className="p-4">Gestor Responsável</th>
                      <th className="p-4">Progresso</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {accessibleEmployees.map(emp => (
                      <tr key={emp.id} className="hover:bg-slate-50 transition">
                        <td className="p-4 font-semibold text-slate-800">{emp.name}</td>
                        <td className="p-4">{emp.department}</td>
                        <td className="p-4 font-medium text-slate-700">{emp.manager}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-28 bg-slate-100 h-2 rounded-full overflow-hidden">
                              <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${emp.progress}%` }}></div>
                            </div>
                            <span className="text-xs font-bold text-slate-700">{emp.progress}%</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                            emp.status === 'Concluído' ? 'bg-emerald-100 text-emerald-800' :
                            emp.status === 'Em Andamento' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-600'
                          }`}>
                            {emp.status}
                          </span>
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
                  placeholder="Buscar por colaborador ou cargo..." 
                  value={searchTerm} 
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-slate-500" />
                  <select 
                    value={departmentFilter} 
                    onChange={e => setDepartmentFilter(e.target.value)}
                    className="bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Todos">Todos os Setores</option>
                    <option value="Operacional">Operacional</option>
                    <option value="Administrativo / RH">Administrativo / RH</option>
                    <option value="Logística">Logística</option>
                  </select>
                </div>

                {currentUser.profile === 'RH' && (
                  <button 
                    onClick={() => setShowAddModal(true)}
                    className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition flex items-center gap-2"
                  >
                    <UserPlus className="w-4 h-4" /> Novo Colaborador
                  </button>
                )}
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
                      <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-md ${
                        emp.department === 'Operacional' ? 'bg-amber-50 text-amber-700 border border-amber-200' : 'bg-blue-50 text-blue-700 border border-blue-200'
                      }`}>
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
            <div className="flex justify-between items-center no-print">
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
                <Printer className="w-4 h-4" /> Imprimir / Gerar PDF
              </button>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
              <div className="border-b border-slate-200 pb-6 flex justify-between items-start flex-wrap gap-4">
                <div>
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Ficha Individual de Desenvolvimento</span>
                  <h2 className="text-3xl font-extrabold text-slate-900 mt-1">{selectedEmployee.name}</h2>
                  <p className="text-sm text-slate-500 font-medium">{selectedEmployee.role} • {selectedEmployee.department}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Gestor Responsável</span>
                  <span className="text-sm font-bold text-slate-700">{selectedEmployee.manager}</span>
                  <div className="mt-2">
                    <span className="text-xs font-bold px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                      Status: {selectedEmployee.status} ({selectedEmployee.progress}%)
                    </span>
                  </div>
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

              <div>
                <h3 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-emerald-600" /> Plano de Ação Estruturado (Metodologia 70/20/10)
                </h3>
                <div className="space-y-3">
                  {selectedEmployee.actions.map(action => (
                    <div key={action.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-wrap items-center justify-between gap-4">
                      <div className="space-y-1 max-w-xl">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            action.type === '70%' ? 'bg-emerald-600 text-white' :
                            action.type === '20%' ? 'bg-blue-600 text-white' : 'bg-purple-600 text-white'
                          }`}>
                            {action.type} {action.category}
                          </span>
                          <span className="text-xs text-slate-400">Prazo: {action.deadline}</span>
                        </div>
                        <p className="text-sm font-semibold text-slate-800">{action.title}</p>
                        <p className="text-xs text-slate-500">Evidência esperada: {action.evidence}</p>
                      </div>

                      <div className="no-print">
                        <select 
                          value={action.status} 
                          onChange={e => handleStatusChange(action.id, e.target.value)}
                          className="text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        >
                          <option value="Não Iniciado">Não Iniciado</option>
                          <option value="Em Andamento">Em Andamento</option>
                          <option value="Concluído">Concluído</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-12 border-t border-slate-200 grid grid-cols-3 gap-6 text-center text-xs text-slate-500">
                <div>
                  <div className="border-b border-slate-300 mb-2 pb-8"></div>
                  <span>{selectedEmployee.name}</span>
                  <span className="block text-[10px] text-slate-400">Colaborador</span>
                </div>
                <div>
                  <div className="border-b border-slate-300 mb-2 pb-8"></div>
                  <span>{selectedEmployee.manager}</span>
                  <span className="block text-[10px] text-slate-400">Gestor Direto</span>
                </div>
                <div>
                  <div className="border-b border-slate-300 mb-2 pb-8"></div>
                  <span>Daiene Santos</span>
                  <span className="block text-[10px] text-slate-400">Recursos Humanos / DHO</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-2xl shadow-xl overflow-hidden border border-slate-100">
            <div className="bg-emerald-900 text-white p-4 flex justify-between items-center">
              <h3 className="font-bold text-sm flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-emerald-300" /> Cadastrar Novo Colaborador
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-emerald-200 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEmployee} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nome Completo</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Ex: Ana Clara Santos"
                  value={newEmployee.name}
                  onChange={e => setNewEmployee({...newEmployee, name: e.target.value})}
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Cargo</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Ex: Encarregado de Limpeza"
                    value={newEmployee.role}
                    onChange={e => setNewEmployee({...newEmployee, role: e.target.value})}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Setor / Departamento</label>
                  <select 
                    value={newEmployee.department}
                    onChange={e => setNewEmployee({...newEmployee, department: e.target.value})}
                    className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  >
                    <option value="Operacional">Operacional</option>
                    <option value="Administrativo / RH">Administrativo / RH</option>
                    <option value="Logística">Logística</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Gestor Imediato Responsável</label>
                <select 
                  value={newEmployee.manager}
                  onChange={e => setNewEmployee({...newEmployee, manager: e.target.value})}
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                >
                  <option value="Daiene Santos">Daiene Santos (RH / DHO)</option>
                  <option value="Roberto Santos">Roberto Santos (Supervisor Operacional)</option>
                  <option value="Marcos Oliveira">Marcos Oliveira (Coordenador de Logística)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Objetivo Principal de Carreira</label>
                <input 
                  type="text" 
                  placeholder="Ex: Desenvolvimento técnico para promoção a encarregado"
                  value={newEmployee.goal}
                  onChange={e => setNewEmployee({...newEmployee, goal: e.target.value})}
                  className="w-full p-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <div className="pt-4 flex justify-end gap-2">
                <button 
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-slate-50 transition"
                >
                  Cancelar
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition flex items-center gap-2"
                >
                  {loading && <Loader2 className="w-4 h-4 animate-spin" />}
                  Salvar no Banco
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <footer className="bg-slate-900 text-slate-400 text-xs py-4 text-center border-t border-slate-800 no-print">
        <p>Mix Soluções Ambientais • Sistema Interno de Gestão de PDI • Conectado ao PostgreSQL</p>
      </footer>
    </div>
  );
}
