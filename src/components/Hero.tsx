import { Star, ArrowRight, Check, Play } from 'lucide-react';
import Reveal from './Reveal';

const perks = ['Teste grátis por 7 dias', 'Garantia incondicional de 30 dias', 'Migração facilitada'];

export default function Hero() {
  return (
    <section id="hero" className="relative pt-32 pb-20 lg:pt-44 lg:pb-32 overflow-hidden bg-hero-gradient">
      <div className="absolute inset-0 bg-grid-pattern opacity-60" />
      <div className="absolute top-20 -left-20 w-72 h-72 bg-primary-400/20 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-0 -right-20 w-96 h-96 bg-secondary-400/20 rounded-full blur-3xl animate-pulse-slow" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="text-center lg:text-left">
            <Reveal>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-200 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
                <span className="text-sm font-medium text-primary-700">Novo: Bia IA integrada ao sistema</span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-dark-900 leading-[1.1] text-balance">
                Absolutamente tudo o que a sua clínica precisa para{' '}
                <span className="gradient-text">crescer!</span>
              </h1>
            </Reveal>

            <Reveal delay={200}>
              <p className="mt-6 text-lg text-dark-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Milhares de profissionais da saúde já transformaram suas rotinas e aumentaram seus
                resultados com a <strong className="text-dark-800">Bia Health</strong>, o sistema de gestão
                tudo-em-um para clínicas, potencializado por Inteligência Artificial.
              </p>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <a
                  href="#cta"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold shadow-xl shadow-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/40 hover:-translate-y-1 transition-all duration-300"
                >
                  Crie sua conta grátis
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </a>
                <a
                  href="#assistente"
                  className="group inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-white text-dark-800 font-semibold border-2 border-dark-200 hover:border-primary-400 hover:text-primary-600 transition-all duration-300"
                >
                  <Play className="w-5 h-5 fill-current" />
                  Veja como funciona
                </a>
              </div>
            </Reveal>

            <Reveal delay={400}>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 justify-center lg:justify-start">
                {perks.map((perk) => (
                  <div key={perk} className="flex items-center gap-2 text-sm text-dark-600">
                    <span className="w-5 h-5 rounded-full bg-success-100 flex items-center justify-center">
                      <Check className="w-3 h-3 text-success-600" strokeWidth={3} />
                    </span>
                    {perk}
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={500}>
              <div className="mt-10 flex items-center gap-4 justify-center lg:justify-start">
                <div className="flex -space-x-3">
                  {[
                    'https://images.pexels.com/photos/5234511/pexels-photo-5234511.jpeg?auto=compress&cs=tinysrgb&h=80&w=80',
                    'https://images.pexels.com/photos/7752805/pexels-photo-7752805.jpeg?auto=compress&cs=tinysrgb&h=80&w=80',
                    'https://images.pexels.com/photos/25651531/pexels-photo-25651531.jpeg?auto=compress&cs=tinysrgb&h=80&w=80',
                    'https://images.pexels.com/photos/7752811/pexels-photo-7752811.jpeg?auto=compress&cs=tinysrgb&h=80&w=80',
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt=""
                      className="w-10 h-10 rounded-full border-2 border-white object-cover"
                    />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-accent-500 fill-accent-500" />
                    ))}
                  </div>
                  <p className="text-sm text-dark-600 mt-0.5">
                    Amado por <strong className="text-dark-900">+ de 20 mil</strong> usuários
                  </p>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={300} className="relative hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-400/30 to-secondary-400/30 rounded-3xl blur-3xl" />
              <img
                src="/dashboard-hero.webp"
                alt="Dashboard da Bia Health"
                className="relative rounded-3xl shadow-2xl shadow-primary-900/20 w-full animate-float"
              />
              <div className="absolute -bottom-6 -left-6 glass rounded-2xl p-4 shadow-xl animate-float-slow">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-success-400 to-success-600 flex items-center justify-center">
                    <Check className="w-6 h-6 text-white" strokeWidth={3} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-dark-900">+70%</p>
                    <p className="text-xs text-dark-500">menos faltas</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 glass rounded-2xl p-4 shadow-xl animate-bounce-subtle">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-400 to-secondary-600 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">IA</span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-dark-900">Bia</p>
                    <p className="text-xs text-dark-500">atende 24h</p>
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
