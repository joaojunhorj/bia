import { ArrowRight, Check } from 'lucide-react';
import Reveal from './Reveal';

const perks = ['Teste grátis por 7 dias', 'Garantia de 30 dias', 'Migração facilitada'];

export default function CTA() {
  return (
    <section id="cta" className="py-20 lg:py-32 bg-dark-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-gradient opacity-30" />
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-secondary-500/20 rounded-full blur-3xl animate-pulse-slow" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Reveal>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white text-balance leading-tight">
            O sistema que transforma sua rotina e acelera o crescimento da sua clínica!
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <p className="mt-6 text-lg text-dark-300 max-w-2xl mx-auto">
            Montamos uma proposta personalizada para você. Fale com um especialista e descubra como a
            Bia Health trabalha pela sua clínica.
          </p>
        </Reveal>

        <Reveal delay={200}>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#form"
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-xl shadow-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/40 hover:-translate-y-1 transition-all duration-300"
            >
              Fale com um especialista
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </Reveal>

        <Reveal delay={300}>
          <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 justify-center">
            {perks.map((perk) => (
              <div key={perk} className="flex items-center gap-2 text-sm text-dark-300">
                <span className="w-5 h-5 rounded-full bg-success-500/20 flex items-center justify-center">
                  <Check className="w-3 h-3 text-success-400" strokeWidth={3} />
                </span>
                {perk}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
