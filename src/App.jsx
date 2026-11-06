import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Users, Target, CheckCircle2, Clock, Search, Filter, 
  ChevronRight, Award, BarChart3, Printer, BookOpen, 
  TrendingUp, UserPlus, Lock, LogOut, Shield, Loader2, RefreshCw
} from 'lucide-react';

const supabaseUrl = 'https://hbyjblwzuvntinpugetr.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhieWpibHd6dXZudGlucHVnZXRyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MjAxNTAwMDAwMH0.placeholder';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const validUsers = [
  { name: "Daiene Santos", email: "daiene@mixsolucoesambientais.com.br", pass: "mix#rh2026", profile: "RH", role: "Gestora de RH / DHO" },
  { name: "Roberto Santos", email: "roberto@mixsolucoesambientais.com.br", pass: "gestor123", profile: "GESTOR", role: "Supervisor Operacional" },
  { name: "Marcos Oliveira", email: "marcos@mixsolucoesambientais.com.br", pass: "gestor123", profile: "GESTOR", role: "Coordenador de Logística" },
  { name: "Augusto Arruda", email: "augusto@mixsolucoesambientais.com.br", pass: "gestor123", profile: "GESTOR", role: "Supervisor Operacional" },
  { name: "Jose Izailton", email: "log@mixsolucoesambientais.com.br", pass: "gestor123", profile: "GESTOR", role: "Gestor Logística" }
];

// Vetor idêntico à Logomarca Oficial da Mix Soluções Ambientais
function LogoMixOficial() {
  return (
    <div className="flex items-center justify-center select-none py-1">
      <svg className="h-16 w-auto" viewBox="0 0 280 120" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Letra M */}
        <path d="M 15 110 L 15 40 L 40 85 L 65 40 L 65 110" stroke="#0078C8" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
        
        {/* Letra i (Haste) */}
        <line x1="92" y1="58" x2="92" y2="110" stroke="#0078C8" strokeWidth="12" strokeLinecap="round" />

        {/* Folha Verde (Superior Esquerda) */}
        <path d="M 85 45 C 70 30 75 10 92 10 C 100 25 95 40 85 45 Z" fill="#4CAE30" />
        
        {/* Folha Azul (Superior Direita) */}
        <path d="M 94 43 C 95 25 110 15 125 22 C 120 38 105 45 94 43 Z" fill="#0078C8" />
        
        {/* Curva Ramo Verde sob o pingo do i */}
        <path d="M 80 50 C 78 68 115 70 175 25" stroke="#4CAE30" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        <path d="M 82 52 C 85 62 105 64 135 50" stroke="#4CAE30" strokeWidth="2.5" fill="none" />

        {/* Letra x */}
        <path d="M 115 62 C 130 85 140 100 162 110" stroke="#0078C8" strokeWidth="11" strokeLinecap="round" />
        <path d="M 162 62 C 145 85 130 98 115 110" stroke="#0078C8" strokeWidth="11" strokeLinecap="round" />

        {/* Texto SOLUÇÕES AMBIENTAIS */}
        <text x="172" y="76" fill="#4CAE30" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" letterSpacing="1">SOLUÇÕES</text>
        <text x="172" y="102" fill="#4CAE30" fontFamily="Arial, sans-serif" fontSize="20" fontWeight="bold" letterSpacing="1">AMBIENTAIS</text>
      </svg>
    </div>
  );
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('Todos');

  const fetchEmployees = async () => {
    setLoading(true);
    setFetchError('');
    try {
      const { data, error } = await supabase
        .from('colaboradores')
        .select('*');

      if (error) throw error;
      setEmployees(data || []);
    } catch (err) {
      console.error("Erro Supabase:", err);
      setFetchError("Não foi possível carregar os colaboradores.");
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

  const filteredEmployees = employees.filter(e => {
    const name = e.nome || e.name || '';
    const role = e.cargo || e.role || '';
    const dept = e.departamento || e.department || '';
    
    const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = departmentFilter === 'Todos' || dept === departmentFilter;
    
    return matchesSearch && matchesDept;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0d1527] flex items-center justify-center p-4 font-sans">
        <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
          <div className="bg-white p-6 text-center border-b border-slate-100 space-y-2">
            <LogoMixOficial />
            <div className="pt-1">
              <h2 className="text-sm font-extrabold tracking-tight text-slate-800 uppercase">MIX SOLUÇÕES AMBIENTAIS</h2>
              <p className="text-[11px] text-slate-500 font-medium">Portal de Gestão de PDI • Pilar Desenvolvimento</p>
            </div>
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
      <header className="bg-white border-b border-slate-200 text-slate-800 shadow-sm p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <LogoMixOficial />
          <div className="flex items-center gap-4">
            <div className="text-right text-xs">
              <span className="font-bold block text-slate-800">{currentUser?.name}</span>
              <span className="text-[10px] text-emerald-700 font-bold uppercase">{currentUser?.role}</span>
            </div>
            <button onClick={handleLogout} className="text-xs bg-slate-100 hover:bg-red-600 hover:text-white text-slate-700 px-3 py-1.5 rounded-lg transition flex items-center gap-1 font-semibold border border-slate-200">
              <LogOut className="w-3.5 h-3.5" /> Sair
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto p-6">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-3">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
            <span className="text-xs font-bold text-slate-500">Conectando ao banco de dados...</span>
          </div>
        ) : fetchError ? (
          <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-2xl text-xs font-semibold text-center space-y-3 max-w-md mx-auto mt-10 shadow-sm">
            <p>{fetchError}</p>
            <button onClick={fetchEmployees} className="px-4 py-2 bg-red-600 text-white rounded-xl flex items-center justify-center gap-2 mx-auto font-bold">
              <RefreshCw className="w-4 h-4" /> Recarregar Conexão
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-wrap gap-4 justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Buscar colaborador ou cargo..." 
                  value={searchTerm} 
                  onChange={e => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="flex items-center gap-3">
                <Filter className="w-4 h-4 text-slate-400" />
                <select 
                  value={departmentFilter} 
                  onChange={e => setDepartmentFilter(e.target.value)}
                  className="border border-slate-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                >
                  <option value="Todos">Todos os Setores</option>
                  <option value="Operação">Operação</option>
                  <option value="Logistica">Logística</option>
                  <option value="TR 2">TR 2</option>
                  <option value="Administrativo / RH">Administrativo / RH</option>
                </select>

                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-4 py-2 rounded-xl border border-emerald-200">
                  Total: {filteredEmployees.length} Colaboradores
                </span>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-600">
                  <thead className="bg-slate-50 uppercase text-slate-500 font-semibold border-b">
                    <tr>
                      <th className="p-3">#</th>
                      <th className="p-3">Nome Completo</th>
                      <th className="p-3">Cargo</th>
                      <th className="p-3">Departamento</th>
                      <th className="p-3">Gestor Responsável</th>
                      <th className="p-3 text-right">Ação</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredEmployees.map((emp, index) => (
                      <tr key={emp.id || index} className="hover:bg-slate-50 transition">
                        <td className="p-3 font-bold text-slate-400">{index + 1}</td>
                        <td className="p-3 font-bold text-slate-800">{emp.nome || emp.name}</td>
                        <td className="p-3">{emp.cargo || emp.role}</td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded bg-slate-100 font-semibold text-slate-700">
                            {emp.departamento || emp.department}
                          </span>
                        </td>
                        <td className="p-3 font-semibold text-emerald-800">{emp.gestor_nome || emp.manager}</td>
                        <td className="p-3 text-right">
                          <button 
                            onClick={() => alert(`Abrindo PDI de ${emp.nome || emp.name}`)}
                            className="px-3 py-1 bg-emerald-600 text-white rounded-md font-bold hover:bg-emerald-700 transition"
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
      </main>
    </div>
  );
}
