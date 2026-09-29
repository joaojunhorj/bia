import { useState } from 'react';
import { Lock, Mail, ArrowLeft, AlertCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function AdminLogin() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const { error } = await signIn(email, password);
    if (error) setError(error);
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient opacity-30" />
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-pulse-slow" />

      <div className="relative w-full max-w-md">
        <div className="glass-dark rounded-3xl p-8 shadow-2xl">
          <div className="text-center mb-8">
            <img
              src="/bia.png"
              alt="Logo Bia Health"
              className="w-48 h-16 rounded-xl bg-white px-2 object-contain mx-auto mb-4"
            />
            <h1 className="text-2xl font-display font-extrabold text-white">Painel Administrativo</h1>
            <p className="text-dark-400 text-sm mt-2">Bia Health — Gestão de conteúdo</p>
          </div>

          {error && (
            <div className="mb-5 flex items-center gap-3 p-4 rounded-xl bg-error-500/10 border border-error-500/30 text-error-400 text-sm">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">E-mail</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-dark-500 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 transition-all"
                  placeholder="admin@biahealth.com.br"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-300 mb-2">Senha</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-500" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-dark-500 focus:outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-500/20 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <a
            href="/"
            className="mt-6 flex items-center justify-center gap-2 text-sm text-dark-400 hover:text-primary-400 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar para o site
          </a>
        </div>
      </div>
    </div>
  );
}
