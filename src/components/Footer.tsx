import { Instagram, Facebook, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';

const footerLinks = {
  Produto: ['Recursos', 'Bia IA', 'Módulos', 'Preços', 'Teste grátis'],
  Empresa: ['Sobre nós', 'Blog', 'Carreiras', 'Parceiros', 'Contato'],
  Suporte: ['Central de ajuda', 'Treinamentos', 'Status', 'Migração', 'Documentação'],
  Legal: ['Termos de uso', 'Privacidade', 'LGPD', 'Cookies', 'Contrato'],
};

export default function Footer() {
  return (
    <footer className="bg-dark-950 text-dark-400 pt-20 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-6 gap-10 mb-12">
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2.5 mb-5">
              <img
                src="/bia.png"
                alt="Logo Bia Health"
                className="w-20 h-10 rounded-lg bg-white px-1 object-contain object-left"
              />
              <span className="font-display font-extrabold text-xl text-white">
                Bia<span className="text-primary-500">Health</span>
              </span>
            </a>
            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              O sistema de gestão tudo-em-um para clínicas, potencializado por Inteligência Artificial.
            </p>
            <div className="flex gap-3">
              {[Instagram, Facebook, Linkedin, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-white/5 hover:bg-primary-500 flex items-center justify-center transition-colors duration-300"
                  aria-label="Social link"
                >
                  <Icon className="w-4 h-4 text-white" />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold text-white text-sm mb-4">{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm hover:text-primary-400 transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4 text-sm">
            <span className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary-500" /> contato@biahealth.com.br
            </span>
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary-500" /> +55 (11) 4000-0000
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-primary-500" /> São Paulo, Brasil
            </span>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-xs text-dark-500">
              © {new Date().getFullYear()} Bia Health. Todos os direitos reservados.
            </p>
            <a href="#admin" className="text-xs text-dark-500 hover:text-primary-400 transition-colors">
              Admin
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
