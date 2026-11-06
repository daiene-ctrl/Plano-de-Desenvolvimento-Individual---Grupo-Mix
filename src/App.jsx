import React, { useState } from 'react';
import { 
  Users, Target, CheckCircle2, Clock, Plus, Search, Filter, 
  ChevronRight, Award, BarChart3, Printer, FileText, Calendar, 
  Building2, TrendingUp, Sparkles, BookOpen, UserCheck, Edit3, Trash2
} from 'lucide-react';

const initialEmployees = [
  {
    id: 1,
    name: "Carlos Eduardo Silva",
    role: "Operador de Máquinas",
    department: "Operacional",
    manager: "Roberto Santos",
    status: "Em Andamento",
    progress: 65,
    strengths: "Agilidade nas rotinas, pontualidade e excelente rigor com uso de EPIs.",
    growthAreas: "Comunicação verbal assertiva e noções básicas de liderança operacional.",
    goal: "Evoluir para a função de Encarado de Campo nos próximos 12 meses.",
    actions: [
      { id: 101, type: "70%", title: "Conduzir o Diálogo Diário de Segurança (DDS) às terças-feiras", category: "Prática", status: "Em Andamento", deadline: "2026-11-30", evidence: "Registro em ata do DDS" },
      { id: 102, type: "20%", title: "Sessões mensais de mentoria operacional com o Supervisor de Campo", category: "Mentoria", status: "Em Andamento", deadline: "2026-12-15", evidence: "Ficha de feedback assinado" },
      { id: 103, type: "10%", title: "Curso online de Liderança Operacional e Comunicação (16h)", category: "Curso", status: "Concluído", deadline: "2026-10-20", evidence: "Certificado entregue ao RH" }
    ],
    checkins: [
      { date: "2026-10-15", notes: "Curso de liderança concluído com sucesso. Demonstrou ótimo empenho nas reuniões de campo." }
    ]
  },
  {
    id: 2,
    name: "Mariana Alcantara",
    role: "Assistente Administrativo",
    department: "Administrativo / RH",
    manager: "Daiene Santos",
    status: "Concluído",
    progress: 100,
    strengths: "Organização impecável, domínio de planilhas e atendimento cortês.",
    growthAreas: "Gestão de projetos internos e análise de indicadores de RH.",
    goal: "Assumir responsabilidade direta pelos subsistemas de DHO e Treinamento.",
    actions: [
      { id: 201, type: "70%", title: "Mapear e organizar o fluxo de integração de 100% dos novos colaboradores", category: "Prática", status: "Concluído", deadline: "2026-09-30", evidence: "Procedimento operacional documentado" },
      { id: 202, type: "20%", title: "Acompanhamento quinzenal no alinhamento das Metas Estratégicas 2026", category: "Mentoria", status: "Concluído", deadline: "2026-10-15", evidence: "Relatório de progresso de metas" },
      { id: 203, type: "10%", title: "Treinamento em Indicadores de Gestão de Pessoas e Power BI", category: "Curso", status: "Concluído", deadline: "2026-08-30", evidence: "Dashboard de RH implementado" }
    ],
    checkins: [
      { date: "2026-09-10", notes: "Implementou o fluxo de integração sem pendências." },
      { date: "2026-10-28", notes: "PDI 100% concluído antes do prazo previsto!" }
    ]
  },
  {
    id: 3,
    name: "João Pedro Souza",
    role: "Motorista Operacional",
    department: "Logística",
    manager: "Marcos Oliveira",
    status: "Não Iniciado",
    progress: 0,
    strengths: "Direção defensiva excelente e profundo conhecimento de rotas urbanas.",
    growthAreas: "Preenchimento digital dos relatórios de viagem e checklist diário.",
    goal: "Tornar-se referência em eficiência logística e economia de combustível.",
    actions: [
      { id: 301, type: "70%", title: "Realizar o checklist de saída via aplicativo em 100% das viagens", category: "Prática", status: "Não Iniciado", deadline: "2026-11-25", evidence: "Registros no sistema logístico" },
      { id: 302, type: "20%", title: "Acompanhamento semanal com o Gestor de Frota", category: "Mentoria", status: "Não Iniciado", deadline: "2026-12-10", evidence: "Checklist validado" },
      { id: 303, type: "10%", title: "Treinamento interno em Tecnologias de Gestão de Frotas", category: "Curso", status: "Não Iniciado", deadline: "2026-12-01", evidence: "Certificado de conclusão" }
    ],
    checkins: []
  }
];

export default function App() {
  const [employees, setEmployees] = useState(initialEmployees);
  const [selectedId, setSelectedId] = useState(1);
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, list, detail, new
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('Todos');

  const selectedEmployee = employees.find(e => e.id === selectedId) || employees[0];

  // Global statistics
  const totalPDIs = employees.length;
  const completedPDIs = employees.filter(e => e.progress === 100).length;
  const inProgressPDIs = employees.filter(e => e.progress > 0 && e.progress < 100).length;
  const implementationRate = Math.round((employees.filter(e => e.status !== 'Não Iniciado').length / (totalPDIs || 1)) * 100);

  const filteredEmployees = employees.filter(e => {
    const matchesSearch = e.name.toLowerCase().includes(searchTerm.toLowerCase()) || e.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = departmentFilter === 'Todos' || e.department === departmentFilter;
    return matchesSearch && matchesDept;
  });

  const handleStatusChange = (actionId, newStatus) => {
    setEmployees(prev => prev.map(emp => {
      if (emp.id !== selectedId) return emp;
      const updatedActions = emp.actions.map(act => act.id === actionId ? { ...act, status: newStatus } : act);
      const completed = updatedActions.filter(a => a.status === 'Concluído').length;
      const progress = Math.round((completed / updatedActions.length) * 100);
      let status = 'Em Andamento';
      if (progress === 100) status = 'Concluído';
      if (progress === 0 && updatedActions.every(a => a.status === 'Não Iniciado')) status = 'Não Iniciado';
      return { ...emp, actions: updatedActions, progress, status };
    }));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Header Corporativo */}
      <header className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white shadow-md no-print">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-wrap justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-white p-2 rounded-lg shadow-inner flex items-center justify-center">
             <img src="/logo.png" alt="Mix Soluções Ambientais" className="h-8 w-auto object-contain" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">MIX SOLUÇÕES AMBIENTAIS</h1>
              <p className="text-xs text-emerald-200">Sistema de Gestão de PDI • Pilar Desenvolvimento 2026</p>
            </div>
          </div>
          
          <nav className="flex bg-emerald-950/40 p-1 rounded-xl border border-emerald-700/50">
            <button 
              onClick={() => setActiveTab('dashboard')} 
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-2 ${activeTab === 'dashboard' ? 'bg-white text-emerald-900 shadow' : 'text-emerald-100 hover:text-white'}`}
            >
              <BarChart3 className="w-4 h-4" /> Visão Geral
            </button>
            <button 
              onClick={() => setActiveTab('list')} 
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-2 ${activeTab === 'list' || activeTab === 'detail' ? 'bg-white text-emerald-900 shadow' : 'text-emerald-100 hover:text-white'}`}
            >
              <Users className="w-4 h-4" /> Colaboradores ({employees.length})
            </button>
          </nav>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6">
        
        {/* DASHBOARD TAB */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap justify-between items-center gap-4">
              <div>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full">META ESTRATÉGICA 2026</span>
                <h2 className="text-2xl font-bold text-slate-900 mt-2">Implementação de 100% dos PDIs</h2>
                <p className="text-sm text-slate-500">Acompanhamento contínuo dos planos de desenvolvimento individual.</p>
              </div>
              <div className="text-right bg-slate-50 p-4 rounded-xl border border-slate-100">
                <span className="text-xs text-slate-500 font-medium">Taxa de Adesão Global</span>
                <div className="text-3xl font-extrabold text-emerald-600">{implementationRate}%</div>
              </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">Total de Colaboradores</p>
                  <p className="text-2xl font-bold text-slate-800 mt-1">{totalPDIs}</p>
                </div>
                <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Users className="w-6 h-6" /></div>
              </div>
              
              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">PDIs Em Andamento</p>
                  <p className="text-2xl font-bold text-amber-600 mt-1">{inProgressPDIs}</p>
                </div>
                <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Clock className="w-6 h-6" /></div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">PDIs Concluídos</p>
                  <p className="text-2xl font-bold text-emerald-600 mt-1">{completedPDIs}</p>
                </div>
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><CheckCircle2 className="w-6 h-6" /></div>
              </div>

              <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase">Metodologia 70/20/10</p>
                  <p className="text-sm font-semibold text-slate-700 mt-1">Prática • Mentoria • Cursos</p>
                </div>
                <div className="p-3 bg-teal-50 text-teal-600 rounded-xl"><BookOpen className="w-6 h-6" /></div>
              </div>
            </div>

            {/* Tabela Resumo */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="p-4 border-b border-slate-100 flex justify-between items-center">
                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" /> Status por Colaborador
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
                      <th className="p-4">Progresso</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {employees.map(emp => (
                      <tr key={emp.id} className="hover:bg-slate-50 transition">
                        <td className="p-4 font-semibold text-slate-800">{emp.name}</td>
                        <td className="p-4">{emp.department}</td>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-32 bg-slate-100 h-2 rounded-full overflow-hidden">
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

        {/* LIST TAB */}
        {activeTab === 'list' && (
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

        {/* DETAIL TAB (FICHA DO PDI) */}
        {activeTab === 'detail' && selectedEmployee && (
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

            {/* Ficha Imprimível */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-8">
              {/* Cabeçalho da Ficha */}
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

              {/* Mapeamento de Competências */}
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

              {/* Matriz de Ações 70/20/10 */}
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

              {/* Seção de Assinaturas (Visual na Impressão) */}
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

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 text-xs py-4 text-center border-t border-slate-800 no-print">
        <p>Mix Soluções Ambientais • Sistema Interno de Gestão de Desenvolvimento Individual 2026</p>
      </footer>
    </div>
  );
}
