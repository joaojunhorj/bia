import { Star } from 'lucide-react';
import Reveal from './Reveal';

const testimonials = [
  {
    text: 'A Bia Health mudou completamente a forma como eu organizo minha clínica. Hoje sobra tempo para os pacientes.',
    name: 'Dra. Fernanda Castro',
    role: 'Dermatologista',
    img: 'https://images.pexels.com/photos/5234511/pexels-photo-5234511.jpeg?auto=compress&cs=tinysrgb&h=120&w=120',
  },
  {
    text: 'O suporte é absurdo de bom e a Bia economiza horas do meu dia toda semana.',
    name: 'Dr. Bruno Tavares',
    role: 'Cirurgião-dentista',
    img: 'https://images.pexels.com/photos/7752805/pexels-photo-7752805.jpeg?auto=compress&cs=tinysrgb&h=120&w=120',
  },
  {
    text: 'Nunca foi tão fácil gerir minha equipe, a agenda e o financeiro no mesmo lugar.',
    name: 'Patrícia Nunes',
    role: 'Gestora de clínica de estética',
    img: 'https://images.pexels.com/photos/25651531/pexels-photo-25651531.jpeg?auto=compress&cs=tinysrgb&h=120&w=120',
  },
  {
    text: 'Migrei de outro sistema e o atendimento da equipe foi impecável do início ao fim.',
    name: 'Dr. Lucas Ferreira',
    role: 'Fisioterapeuta',
    img: 'https://images.pexels.com/photos/7752811/pexels-photo-7752811.jpeg?auto=compress&cs=tinysrgb&h=120&w=120',
  },
  {
    text: 'Os lembretes automáticos praticamente zeraram as faltas. Minha agenda nunca esteve tão cheia.',
    name: 'Dra. Camila Rocha',
    role: 'Nutricionista',
    img: 'https://images.pexels.com/photos/14156484/pexels-photo-14156484.jpeg?auto=compress&cs=tinysrgb&h=120&w=120',
  },
  {
    text: 'O prontuário eletrônico e a prescrição digital agilizaram demais os meus atendimentos.',
    name: 'Dr. André Martins',
    role: 'Clínico geral',
    img: 'https://images.pexels.com/photos/33799456/pexels-photo-33799456.jpeg?auto=compress&cs=tinysrgb&h=120&w=120',
  },
  {
    text: 'A Bia responde meus pacientes na hora, mesmo de madrugada. Lotou minha agenda de avaliações.',
    name: 'Mariana Lopes',
    role: 'Esteticista',
    img: 'https://images.pexels.com/photos/18351014/pexels-photo-18351014.jpeg?auto=compress&cs=tinysrgb&h=120&w=120',
  },
  {
    text: 'Hoje tenho o financeiro e os relatórios da clínica na palma da mão, em tempo real.',
    name: 'Dr. Rafael Souza',
    role: 'Ortopedista',
    img: 'https://images.pexels.com/photos/26150470/pexels-photo-26150470.jpeg?auto=compress&cs=tinysrgb&h=120&w=120',
  },
];

export default function Testimonials() {
  return (
    <section id="depoimentos" className="py-20 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-14">
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">Depoimentos</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark-900 text-balance">
            Quem usa ama e assina embaixo
          </h2>
        </Reveal>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((t, i) => (
            <Reveal key={i} delay={(i % 3) * 100}>
              <div className="break-inside-avoid p-7 rounded-3xl bg-gradient-to-br from-dark-50 to-white border border-dark-100 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-500/10 transition-all duration-300">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, s) => (
                    <Star key={s} className="w-4 h-4 text-accent-500 fill-accent-500" />
                  ))}
                </div>
                <p className="text-dark-700 leading-relaxed mb-5">{t.text}</p>
                <div className="flex items-center gap-3">
                  <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-dark-900">{t.name}</p>
                    <p className="text-sm text-dark-500">{t.role}</p>
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
