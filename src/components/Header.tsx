import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Recursos', href: '#recursos' },
  { label: 'Bia IA', href: '#assistente' },
  { label: 'Módulos', href: '#modulos' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'Segurança', href: '#seguranca' },
  { label: 'FAQ', href: '#faq' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass shadow-lg shadow-primary-900/5 py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2.5 group">
          <img
            src="/bia.png"
            alt="Logo Bia Health"
            className="w-16 sm:w-20 h-9 object-contain object-left group-hover:scale-105 transition-transform duration-300"
          />
          <span className={`font-display font-extrabold text-xl transition-colors ${scrolled ? 'text-dark-900' : 'text-dark-900'}`}>
            Bia<span className="text-primary-600">Health</span>
          </span>
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-dark-600 hover:text-primary-600 transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#cta"
            className="text-sm font-semibold text-dark-700 hover:text-primary-600 transition-colors px-4 py-2"
          >
            Entrar
          </a>
          <a
            href="#cta"
            className="text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 px-5 py-2.5 rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 hover:-translate-y-0.5 transition-all duration-300"
          >
            Teste grátis
          </a>
        </div>

        <button
          className="lg:hidden p-2 rounded-lg hover:bg-dark-100 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="lg:hidden glass mx-4 mt-3 rounded-2xl p-6 animate-fade-in-down">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-sm font-medium text-dark-700 hover:text-primary-600 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#cta"
              onClick={() => setMobileOpen(false)}
              className="text-sm font-semibold text-white bg-gradient-to-r from-primary-500 to-primary-600 px-5 py-2.5 rounded-xl text-center mt-2"
            >
              Teste grátis
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
