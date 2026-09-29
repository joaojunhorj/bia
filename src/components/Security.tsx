import { ShieldCheck, Eye, Settings, FileSearch, GraduationCap, Headset, ArrowRightLeft, RefreshCw } from 'lucide-react';
import Reveal from './Reveal';

const securityItems = [
  { icon: ShieldCheck, title: 'Proteção total dos dados', desc: 'Criptografia de ponta a ponta e backups automáticos.' },
  { icon: Eye, title: 'Consentimento e transparência', desc: 'Coleta de dados clara e com consentimento explícito.' },
  { icon: Settings, title: 'Controle nas suas mãos', desc: 'Você decide quem acessa o quê, a qualquer momento.' },
  { icon: FileSearch, title: 'Pronto para auditorias', desc: 'Registros completos e rastreáveis de todas as ações.' },
];

const differentials = [
  { icon: GraduationCap, title: 'Treinamento semanal' },
  { icon: Headset, title: 'Suporte especializado' },
  { icon: ArrowRightLeft, title: 'Migração de dados facilitada' },
  { icon: RefreshCw, title: 'Atualizações e feedbacks' },
];

export default function Security() {
  return (
    <>
      <section id="seguranca" className="py-20 lg:py-32 bg-gradient-to-b from-white to-dark-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-success-400/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14">
            <p className="text-sm font-semibold text-success-600 uppercase tracking-wider mb-3">Segurança</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark-900 text-balance max-w-3xl mx-auto">
              Sua clínica segura e em conformidade com a LGPD
            </h2>
            <p className="mt-4 text-dark-600 max-w-2xl mx-auto">
              Privacidade e segurança dos dados dos seus pacientes em primeiro lugar, do cadastro à auditoria.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityItems.map((item, i) => (
              <Reveal key={item.title} delay={i * 80}>
                <div className="group h-full p-7 rounded-3xl bg-white border border-dark-100 hover:border-success-300 hover:shadow-xl hover:shadow-success-500/10 transition-all duration-300 hover:-translate-y-1.5 text-center">
                  <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-success-400 to-success-600 items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-dark-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-dark-600">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-dark-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal className="text-center mb-14">
            <p className="text-sm font-semibold text-primary-400 uppercase tracking-wider mb-3">Diferenciais</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white text-balance max-w-3xl mx-auto">
              Motivos para assinar a Bia Health
            </h2>
            <p className="mt-4 text-dark-300 max-w-2xl mx-auto">
              Recursos, suporte e benefícios pensados para a sua clínica crescer com eficiência, segurança e autonomia.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {differentials.map((d, i) => (
              <Reveal key={d.title} delay={i * 80}>
                <div className="group h-full p-7 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary-400/50 transition-all duration-300 text-center">
                  <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-500 to-secondary-600 items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <d.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-white">{d.title}</h3>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
