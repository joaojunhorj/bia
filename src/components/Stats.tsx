import Reveal from './Reveal';
import { Building2, CalendarHeart, Users, FileSignature, DollarSign, Stethoscope } from 'lucide-react';

const stats = [
  { value: '7k+', label: 'Clínicas', icon: Building2 },
  { value: '5mi+', label: 'Agendamentos', icon: CalendarHeart },
  { value: '3.5mi+', label: 'Pacientes', icon: Users },
  { value: '85k+', label: 'Documentos assinados', icon: FileSignature },
  { value: 'R$ 62mi+', label: 'Movimentado pelas clínicas', icon: DollarSign },
  { value: '30k+', label: 'Profissionais', icon: Stethoscope },
];

export default function Stats() {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-40" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-14">
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">Nossos números</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark-900 text-balance">
            Impacto que transforma vidas
          </h2>
          <p className="mt-4 text-dark-600 max-w-2xl mx-auto">
            Dados que refletem o sucesso alcançado por nossos clientes.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 80}>
              <div className="group text-center p-8 rounded-3xl bg-gradient-to-br from-dark-50 to-white border border-dark-100 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300 hover:-translate-y-1">
                <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-600 items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <stat.icon className="w-7 h-7 text-white" />
                </div>
                <p className="text-3xl lg:text-4xl font-extrabold gradient-text">{stat.value}</p>
                <p className="mt-1 text-sm text-dark-600 font-medium">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
