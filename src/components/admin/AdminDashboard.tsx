import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { LogOut, LayoutDashboard, Star, BarChart3, Grid3x3, Blocks, HelpCircle, Menu, X, ExternalLink } from 'lucide-react';
import DataManager from './DataManager';

type Tab = 'overview' | 'testimonials' | 'stats' | 'features' | 'modules' | 'faqs';

const tabs: { id: Tab; label: string; icon: typeof Star }[] = [
  { id: 'overview', label: 'Visão geral', icon: LayoutDashboard },
  { id: 'testimonials', label: 'Depoimentos', icon: Star },
  { id: 'stats', label: 'Estatísticas', icon: BarChart3 },
  { id: 'features', label: 'Recursos', icon: Grid3x3 },
  { id: 'modules', label: 'Módulos', icon: Blocks },
  { id: 'faqs', label: 'FAQ', icon: HelpCircle },
];

export default function AdminDashboard() {
  const { signOut, user } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [counts, setCounts] = useState<Record<string, number>>({});

  const fetchCounts = useCallback(async () => {
    const tables = ['site_testimonials', 'site_stats', 'site_features', 'site_modules', 'site_faqs'];
    const entries = await Promise.all(
      tables.map(async (t) => {
        const { count } = await supabase.from(t).select('*', { count: 'exact', head: true });
        return [t, count ?? 0];
      })
    );
    setCounts(Object.fromEntries(entries));
  }, []);

  useEffect(() => {
    fetchCounts();
  }, [fetchCounts]);

  const handleRefresh = () => fetchCounts();

  return (
    <div className="min-h-screen bg-dark-50 flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 z-40 h-screen w-72 bg-dark-900 text-white flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <img
              src="/bia.png"
              alt="Logo Bia Health"
              className="w-20 h-10 rounded-lg bg-white px-1 object-contain object-left"
            />
            <div>
              <p className="font-display font-extrabold text-lg">
                Bia<span className="text-primary-500">Health</span>
              </p>
              <p className="text-xs text-dark-400">Admin Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg shadow-primary-500/20'
                  : 'text-dark-300 hover:bg-white/5 hover:text-white'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10 space-y-2">
          <div className="px-4 py-2 text-xs text-dark-400 truncate">
            {user?.email}
          </div>
          <a
            href="/"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-dark-300 hover:bg-white/5 hover:text-white transition-all"
          >
            <ExternalLink className="w-5 h-5" />
            Ver site
          </a>
          <button
            onClick={signOut}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-error-400 hover:bg-error-500/10 transition-all"
          >
            <LogOut className="w-5 h-5" />
            Sair
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <header className="sticky top-0 z-20 glass border-b border-dark-100 px-4 lg:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-dark-100"
          >
            <Menu className="w-6 h-6 text-dark-700" />
          </button>
          <h2 className="text-lg font-display font-bold text-dark-900">
            {tabs.find((t) => t.id === activeTab)?.label}
          </h2>
          <div className="w-10 lg:w-0" />
        </header>

        <main className="p-4 lg:p-8">
          {activeTab === 'overview' ? (
            <Overview counts={counts} onNavigate={setActiveTab} />
          ) : (
            <DataManager table={activeTab} onRefresh={handleRefresh} />
          )}
        </main>
      </div>
    </div>
  );
}

function Overview({
  counts,
  onNavigate,
}: {
  counts: Record<string, number>;
  onNavigate: (tab: Tab) => void;
}) {
  const cards = [
    { label: 'Depoimentos', count: counts['site_testimonials'] ?? 0, tab: 'testimonials' as Tab, color: 'from-accent-400 to-accent-600', icon: Star },
    { label: 'Estatísticas', count: counts['site_stats'] ?? 0, tab: 'stats' as Tab, color: 'from-secondary-400 to-secondary-600', icon: BarChart3 },
    { label: 'Recursos', count: counts['site_features'] ?? 0, tab: 'features' as Tab, color: 'from-primary-400 to-primary-600', icon: Grid3x3 },
    { label: 'Módulos', count: counts['site_modules'] ?? 0, tab: 'modules' as Tab, color: 'from-success-400 to-success-600', icon: Blocks },
    { label: 'FAQs', count: counts['site_faqs'] ?? 0, tab: 'faqs' as Tab, color: 'from-warning-400 to-warning-600', icon: HelpCircle },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-display font-extrabold text-dark-900">Bem-vindo!</h3>
        <p className="text-dark-500 mt-1">Gerencie todo o conteúdo do site Bia Health.</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {cards.map((card) => (
          <button
            key={card.label}
            onClick={() => onNavigate(card.tab)}
            className="group p-6 rounded-3xl bg-white border border-dark-100 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 hover:-translate-y-1 text-left"
          >
            <div className={`inline-flex w-12 h-12 rounded-2xl bg-gradient-to-br ${card.color} items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <card.icon className="w-6 h-6 text-white" />
            </div>
            <p className="text-3xl font-extrabold text-dark-900">{card.count}</p>
            <p className="text-sm text-dark-500 mt-1">{card.label}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
