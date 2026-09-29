import { Bot, MessageSquare, FileText, Sparkles, ArrowRight } from 'lucide-react';
import Reveal from './Reveal';

const features = [
  { icon: MessageSquare, title: 'Bia Chatbot', desc: 'Atende e agenda no WhatsApp 24h por dia, sem intervenção humana.' },
  { icon: FileText, title: 'Bia Transcrição', desc: 'Transcreve os atendimentos de forma automática e organizada.' },
  { icon: Sparkles, title: 'Bia Copiloto', desc: 'Auxilia na produção de conteúdo para lembretes, contratos e prontuário.' },
];

export default function Assistant() {
  return (
    <section id="assistente" className="py-20 lg:py-32 bg-gradient-to-b from-dark-50 to-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary-400/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary-50 border border-secondary-200 mb-6">
                <Bot className="w-4 h-4 text-secondary-600" />
                <span className="text-sm font-medium text-secondary-700">Bia IA</span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark-900 leading-tight text-balance">
                A secretária virtual que atende e agenda por você,{' '}
                <span className="gradient-text">24h por dia</span>
              </h2>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-6 text-lg text-dark-600 leading-relaxed">
                A linha de recursos guiados por inteligência artificial da Bia Health tem ainda mais a
                oferecer! A <strong className="text-dark-800">Bia Transcrição</strong> transcreve os
                atendimentos de forma automática e a <strong className="text-dark-800">Bia Copiloto</strong>{' '}
                auxilia na produção de conteúdo para lembretes, contratos e prontuário.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-8 space-y-4">
                {features.map((f, i) => (
                  <div
                    key={f.title}
                    className="group flex items-start gap-4 p-5 rounded-2xl bg-white border border-dark-100 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-500/10 transition-all duration-300"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <f.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-dark-900">{f.title}</h3>
                      <p className="text-sm text-dark-600 mt-1">{f.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={400}>
              <a
                href="#recursos"
                className="group mt-8 inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors"
              >
                Explore os recursos da Bia
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Reveal>
          </div>

          <Reveal delay={200} className="relative flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400/30 to-secondary-400/30 rounded-[2.5rem] blur-3xl" />
              <img
                src="/phone-app.webp"
                alt="Aplicativo da Bia Health no celular"
                className="relative w-72 lg:w-80 animate-float drop-shadow-2xl"
              />
              <div className="absolute top-8 -right-4 lg:-right-8 glass rounded-2xl p-3 shadow-xl animate-bounce-subtle">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-success-500 flex items-center justify-center">
                    <span className="text-white text-xs font-bold">✓</span>
                  </div>
                  <p className="text-xs font-medium text-dark-700">Agendado!</p>
                </div>
              </div>
              <div className="absolute bottom-20 -left-4 lg:-left-8 glass rounded-2xl p-3 shadow-xl animate-float-slow">
                <div className="flex items-center gap-2">
                  <Bot className="w-8 h-8 text-primary-600" />
                  <div>
                    <p className="text-xs font-bold text-dark-900">Bia</p>
                    <p className="text-[10px] text-dark-500">online 24h</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
