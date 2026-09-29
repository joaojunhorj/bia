import {
  CalendarDays,
  ClipboardList,
  Syringe,
  Scan,
  Pill,
  Wallet,
  ShoppingCart,
  Package,
  Megaphone,
} from 'lucide-react';
import Reveal from './Reveal';

const features = [
  { icon: CalendarDays, title: 'Agenda inteligente', desc: 'Acesso na palma da mão' },
  { icon: ClipboardList, title: 'Atendimentos', desc: 'Tudo salvo na nuvem' },
  { icon: Syringe, title: 'Injetáveis', desc: 'Mapa corporal digital' },
  { icon: Scan, title: 'Odontograma digital', desc: 'Tecnologia e segurança' },
  { icon: Pill, title: 'Prescrição digital', desc: 'Agilidade e segurança' },
  { icon: Wallet, title: 'Financeiro integrado', desc: 'Relatórios em segundos' },
  { icon: ShoppingCart, title: 'Vendas', desc: 'Funil e orçamentos' },
  { icon: Package, title: 'Estoque', desc: 'Controle e alertas' },
  { icon: Megaphone, title: 'Marketing', desc: 'Materiais customizáveis' },
];

export default function Features() {
  return (
    <section id="recursos" className="py-20 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-14">
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">Recursos</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark-900 text-balance max-w-3xl mx-auto">
            Somos um sistema tudo-em-um que resolve a sua gestão
          </h2>
          <p className="mt-4 text-dark-600 max-w-2xl mx-auto">
            Além da integração entre os módulos, a Bia Health conta com uma assistente virtual guiada
            por IA que automatiza a sua rotina.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 70}>
              <div className="group h-full p-7 rounded-3xl bg-gradient-to-br from-white to-dark-50 border border-dark-100 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 hover:-translate-y-1.5">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  <f.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-dark-900 mb-1">{f.title}</h3>
                <p className="text-sm text-dark-600">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
