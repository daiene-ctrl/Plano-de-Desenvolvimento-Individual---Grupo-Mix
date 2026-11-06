import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Users, Search, Filter, Lock, LogOut, Loader2, RefreshCw 
} from 'lucide-react';

const supabaseUrl = 'https://hbyjblwzuvntinpugetr.supabase.co';
const supabaseAnonKey = 'sb_publishable_IiuFZ-CdVLo65oPqkJa-4Q_ucWFBSC9p';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

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
  const [searchTerm, setSearchTerm] = useState('');

  const fetchEmployees = async () => {
    setLoading(true);
    setFetchError('');
    try {
      const { data, error } = await supabase
        .from('colaboradores')
        .select('*');

      if (error) {
        console.error("Erro Supabase:", error);
        setFetchError(`Erro ao carregar dados: ${error.message}`);
      } else {
        setEmployees(data || []);
      }
    } catch (err) {
      console.error("Erro de conexão:", err);
      setFetchError("Falha de conexão com o banco de dados.");
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
    return name.toLowerCase().includes(searchTerm.toLowerCase()) || 
           role.toLowerCase().includes(searchTerm.toLowerCase());
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0d1527] flex items-center justify-center p-4 font-sans">
        <div className="bg-white max-w-md w-full rounded-2xl shadow-2xl overflow-hidden border border-slate-100">
          <div className="bg-[#055a43] p-8 text-center text-white">
            <div className="flex items-center justify-center space-x-1 text-white font-black text-2xl tracking-wider mb-2">
              <span>M<span className="text-emerald-300">i</span>x</span>
              <span className="text-[10px] font-normal leading-tight text-emerald-100 text-left uppercase ml-1">
                SOLUÇÕES<br/>AMBIENTAIS
              </span>
            </div>
            <h2 className="text-xl font-extrabold tracking-tight">MIX SOLUÇÕES AMBIENTAIS</h2>
            <p className="text-xs text-emerald-100/80 mt-1 font-medium">Portal de Gestão de PDI • Pilar Desenvolvimento</p>
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
      <header className="bg-[#055a43] text-white shadow-md p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">MIX SOLUÇÕES AMBIENTAIS</h1>
            <p className="text-
