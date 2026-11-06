import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Users, Target, CheckCircle2, Clock, Search, Filter, 
  ChevronRight, Award, BarChart3, Printer, BookOpen, 
  TrendingUp, UserPlus, X, Lock, LogOut, Shield, Loader2, Save, Plus, Trash2
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

const initialEmployees = [
  { id: 1, name: "HELIO MARCOS DE JESUS SANTOS", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", status: "Não Iniciado", progress: 0, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [] },
  { id: 2, name: "WALLACE SILVA RODRIGUES", role: "MECANICO DE AUTOMOVEIS E CAMINHOES EM GERAL", department: "Logistica", manager: "Jose Izailton", managerEmail: "log@mixsolucoesambientais.com.br", status: "Não Iniciado", progress: 0, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [] },
  { id: 3, name: "GLAUBER LUAN LIMA VIANA", role: "MOTORISTA DE CAMINHÃO", department: "Logistica", manager: "Jose Izailton", managerEmail: "log@mixsolucoesambientais.com.br", status: "Não Iniciado", progress: 0, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [] },
  { id: 4, name: "JOSE IZAILTON BATISTA ALMEIDA JUNIOR", role: "ANALISTA DE LOGISTICA DE TRANSPORTE", department: "Logistica", manager: "George Costa", managerEmail: "george@mixsolucoesambientais.com.br", status: "Não Iniciado", progress: 0, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [] },
  { id: 5, name: "GIVALDO DE SOUSA CONCEICAO", role: "AUXILIAR DE LOGISTICA E OPERACOES", department: "Operação", manager: "Augusto Arruda", managerEmail: "augusto@mixsolucoesambientais.com.br", status: "Não Iniciado", progress: 0, strengths: "A mapear em reunião de PDI.", growthAreas: "A definir com a gestão.", goal: "Desenvolvimento contínuo.", actions: [] }
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

  // Estados de edição do PDI
  const [editFormData, setEditFormData] = useState({ strengths: '', growthAreas: '', goal: '' });
  const [newAction, setNewAction] = useState({ title: '', type: '70% Prática', deadline: '', evidence: '' });

  const selectedEmployee = employees.find(e => e.id === selectedId) || employees[0];

  useEffect(() => {
    if (selectedEmployee) {
      setEditFormData({
        strengths: selectedEmployee.strengths || '',
        growthAreas: selectedEmployee.growthAreas || '',
        goal: selectedEmployee.goal || ''
      });
    }
  }, [selectedId, selectedEmployee]);

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

  const handleSavePDI = (e) => {
    e.preventDefault();
    setEmployees(prev => prev.map(emp => {
      if (emp.id === selectedId) {
        return {
          ...emp,
          strengths: editFormData.strengths,
          growthAreas: editFormData.growthAreas,
          goal: editFormData.goal
        };
      }
      return emp;
    }));
    alert("PDI atualizado com sucesso!");
  };

  const handleAddAction = (e) => {
    e.preventDefault();
    if (!newAction.title) return;

    setEmployees(prev => prev.map(emp => {
      if (emp.id === selectedId) {
        const updatedActions = [...(emp.actions || []), { ...newAction, id: Date.now(), completed: false }];
        const completedCount = updatedActions.filter(a => a.completed).length;
        const progress = Math.round((completedCount / updatedActions.length) * 100);
        const status = progress === 100 ? 'Concluído' : progress > 0 ? 'Em Andamento' : 'Em Andamento';

        return { ...emp, actions: updatedActions, progress, status };
      }
      return emp;
    }));

    setNewAction({ title: '', type: '70% Prática', deadline: '', evidence: '' });
  };

  const toggleActionStatus = (actionId) => {
    setEmployees(prev => prev.map(emp => {
      if (emp.id === selectedId) {
        const updatedActions = emp.actions.map(act => {
          if (act.id === actionId) return { ...act, completed: !act.completed };
          return act;
        });
        const completedCount = updatedActions.filter(a => a.completed).length;
        const progress = updatedActions.length > 0 ? Math.round((completedCount / updatedActions.length) * 100) : 0;
        const status = progress === 100 ? 'Concluído' : progress > 0 ? 'Em Andamento' : 'Não Iniciado';

        return { ...emp, actions: updatedActions, progress, status };
      }
      return emp;
    }));
  };

  const accessibleEmployees = employees.filter(emp => {
    if (!currentUser) return false;
    if (currentUser.profile === 'RH') return true;
    return emp.manager.toLowerCase().includes(currentUser.name.toLowerCase().split(' ')[0]);
  });

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
            <h2 className="text-xl font-extrabold tracking-tight mt-1">MIX SOLUÇÕES AMBIENTAIS</h2>
            <p className="text-xs text-emerald-100/80 font-medium">Portal de Gestão de PDI • Pilar Desenvolvimento</p>
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
            <button type="submit" className="w-full py-3.5 bg-[#0b9669] text-white rounded-xl font-bold">Entrar no Sistema</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <header className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="font-extrabold text-lg">MIX SOLUÇÕES AMBIENTAIS</h1>
          <nav className="flex items-center gap-2">
            <button onClick={() => setActiveTab('dashboard')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeTab === 'dashboard' ? 'bg-white text-emerald-900' : 'text-white'}`}>Visão Geral</button>
            <button onClick={() => setActiveTab('list')} className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${activeTab === 'list' || activeTab === 'detail' ? 'bg-white text-emerald-900' : 'text-white'}`}>Colaboradores ({accessibleEmployees.length})</button>
            <button onClick={handleLogout} className="p-2 bg-red-600 rounded-xl text-xs font-bold">Sair</button>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex justify-between items-center">
              <div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">META ESTRATÉGICA 2026</span>
                <h2 className="text-2xl font-bold mt-2">Implementação de 100% dos PDIs</h2>
              </div>
              <div className="text-3xl font-extrabold text-emerald-600">{implementationRate}%</div>
            </div>

            <div className="bg-white rounded-xl border p-4">
              <h3 className="font-bold text-slate-800 mb-4">Lista de Colaboradores</h3>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b text-xs uppercase text-slate-500">
                    <th className="p-3">Colaborador</th>
                    <th className="p-3">Cargo</th>
                    <th className="p-3">Setor</th>
                    <th className="p-3">Gestor</th>
                    <th className="p-3">Progresso</th>
                    <th className="p-3 text-right">Ação</th>
                  </tr>
                </thead>
                <tbody>
                  {accessibleEmployees.map(emp => (
                    <tr key={emp.id} className="border-b hover:bg-slate-50">
                      <td className="p-3 font-semibold">{emp.name}</td>
                      <td className="p-3">{emp.role}</td>
                      <td className="p-3">{emp.department}</td>
                      <td className="p-3">{emp.manager}</td>
                      <td className="p-3 font-bold text-emerald-600">{emp.progress}%</td>
                      <td className="p-3 text-right">
                        <button onClick={() => { setSelectedId(emp.id); setActiveTab('detail'); }} className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-xs font-bold">Abrir PDI</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'detail' && selectedEmployee && (
          <div className="space-y-6">
            <button onClick={() => setActiveTab('dashboard')} className="text-xs font-bold text-slate-500">← Voltar para a lista</button>

            <div className="bg-white p-6 rounded-2xl border shadow-sm space-y-6">
              <div className="flex justify-between border-b pb-4">
                <div>
                  <h2 className="text-2xl font-extrabold">{selectedEmployee.name}</h2>
                  <p className="text-xs text-slate-500">{selectedEmployee.role} • {selectedEmployee.department}</p>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Gestor</span>
                  <span className="text-sm font-bold">{selectedEmployee.manager}</span>
                </div>
              </div>

              {/* FORMULÁRIO DE EDIÇÃO DOS CAMPOS PRINCIPAIS */}
              <form onSubmit={handleSavePDI} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 bg-emerald-50/50 border border-emerald-100 rounded-xl space-y-2">
                  <label className="text-xs font-bold uppercase text-emerald-800 block">Pontos Fortes</label>
                  <textarea 
                    rows={4}
                    value={editFormData.strengths} 
                    onChange={e => setEditFormData({...editFormData, strengths: e.target.value})}
                    className="w-full p-2 text-xs border rounded-lg focus:ring-2 focus:ring-emerald-500"
                    placeholder="Digite os pontos fortes..."
                  />
                </div>

                <div className="p-4 bg-amber-50/50 border border-amber-100 rounded-xl space-y-2">
                  <label className="text-xs font-bold uppercase text-amber-800 block">Pontos a Desenvolver</label>
                  <textarea 
                    rows={4}
                    value={editFormData.growthAreas} 
                    onChange={e => setEditFormData({...editFormData, growthAreas: e.target.value})}
                    className="w-full p-2 text-xs border rounded-lg focus:ring-2 focus:ring-amber-500"
                    placeholder="Digite os pontos a desenvolver..."
                  />
                </div>

                <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-xl space-y-2">
                  <label className="text-xs font-bold uppercase text-blue-800 block">Objetivo de Carreira</label>
                  <textarea 
                    rows={4}
                    value={editFormData.goal} 
                    onChange={e => setEditFormData({...editFormData, goal: e.target.value})}
                    className="w-full p-2 text-xs border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Digite o objetivo de carreira..."
                  />
                </div>

                <div className="md:col-span-3 flex justify-end">
                  <button type="submit" className="px-4 py-2 bg-emerald-600 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow">
                    <Save className="w-4 h-4" /> Salvar Alterações do PDI
                  </button>
                </div>
              </form>

              {/* SEÇÃO DE AÇÕES 70/20/10 */}
              <div className="pt-6 border-t space-y-4">
                <h3 className="font-bold text-slate-900 text-base">Plano de Ação (Metodologia 70/20/10)</h3>

                <form onSubmit={handleAddAction} className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border">
                  <input 
                    type="text" 
                    required 
                    placeholder="Descrição da Ação (Ex: Curso de Excel)" 
                    value={newAction.title}
                    onChange={e => setNewAction({...newAction, title: e.target.value})}
                    className="p-2 border rounded-lg text-xs sm:col-span-2"
                  />
                  <select 
                    value={newAction.type}
                    onChange={e => setNewAction({...newAction, type: e.target.value})}
                    className="p-2 border rounded-lg text-xs bg-white"
                  >
                    <option value="70% Prática">70% Prática (No trabalho)</option>
                    <option value="20% Mentoria">20% Mentoria / Feedback</option>
                    <option value="10% Cursos">10% Cursos / Treinamentos</option>
                  </select>
                  <button type="submit" className="p-2 bg-emerald-600 text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1">
                    <Plus className="w-4 h-4" /> Adicionar Ação
                  </button>
                </form>

                <div className="space-y-2">
                  {(selectedEmployee.actions || []).length === 0 ? (
                    <p className="text-xs text-slate-400 italic">Nenhuma ação cadastrada para este colaborador ainda.</p>
                  ) : (
                    selectedEmployee.actions.map(action => (
                      <div key={action.id} className="flex items-center justify-between p-3 border rounded-xl text-xs bg-white">
                        <div className="flex items-center gap-3">
                          <input 
                            type="checkbox" 
                            checked={action.completed}
                            onChange={() => toggleActionStatus(action.id)}
                            className="w-4 h-4 text-emerald-600 rounded"
                          />
                          <span className={action.completed ? "line-through text-slate-400" : "font-semibold text-slate-700"}>{action.title}</span>
                        </div>
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold">{action.type}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
