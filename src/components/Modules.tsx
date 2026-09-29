import {
  FileSignature,
  Workflow,
  Globe,
  MessageCircle,
  Receipt,
  Video,
  Bot,
  Mic,
  Sparkles,
} from 'lucide-react';
import Reveal from './Reveal';

const modules = [
  { icon: FileSignature, title: 'BiaDocs', desc: 'Documentos 100% digitais' },
  { icon: Workflow, title: 'BiaCRM', desc: 'Fluxo comercial' },
  { icon: Globe, title: 'BiaSite', desc: 'Agendamento online' },
  { icon: MessageCircle, title: 'BiaChat', desc: 'Integrado ao WhatsApp' },
  { icon: Receipt, title: 'BiaNotas', desc: 'NF em um clique' },
  { icon: Video, title: 'BiaTele', desc: 'Amplie seu alcance' },
  { icon: Bot, title: 'Bia Chatbot', desc: 'Automação de WhatsApp' },
  { icon: Mic, title: 'Bia Transcrição', desc: 'Transcrição automática' },
  { icon: Sparkles, title: 'Bia Copiloto', desc: 'Agilidade no prontuário' },
];

export default function Modules() {
  return (
    <section id="modulos" className="py-20 lg:py-32 bg-dark-900 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-14">
          <p className="text-sm font-semibold text-primary-400 uppercase tracking-wider mb-3">Adicionais</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white text-balance max-w-3xl mx-auto">
            Turbine seu sistema com os módulos adicionais
          </h2>
          <p className="mt-4 text-dark-300 max-w-2xl mx-auto">
            Agregue mais funcionalidades ao seu sistema e potencialize a sua clínica com os recursos de
            inteligência artificial.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {modules.map((m, i) => (
            <Reveal key={m.title} delay={i * 70}>
              <div className="group h-full p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-primary-400/50 transition-all duration-300 hover:-translate-y-1">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <m.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white">{m.title}</h3>
                    <p className="text-sm text-dark-400">{m.desc}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
