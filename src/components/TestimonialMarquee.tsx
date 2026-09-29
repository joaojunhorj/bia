import { Star } from 'lucide-react';

const testimonials = [
  { name: 'Carla Mendes', role: 'Dermatologista', text: 'Reduzi 70% das faltas com os lembretes automáticos da IA.', img: 'https://images.pexels.com/photos/5234511/pexels-photo-5234511.jpeg?auto=compress&cs=tinysrgb&h=120&w=120', stars: 5 },
  { name: 'Rafael Lima', role: 'Cirurgião-dentista', text: 'O financeiro integrado me deu clareza total da minha clínica.', img: 'https://images.pexels.com/photos/7752805/pexels-photo-7752805.jpeg?auto=compress&cs=tinysrgb&h=120&w=120', stars: 5 },
  { name: 'Juliana Souza', role: 'Nutricionista', text: 'A Bia agenda meus pacientes enquanto eu durmo. Surreal.', img: 'https://images.pexels.com/photos/25651531/pexels-photo-25651531.jpeg?auto=compress&cs=tinysrgb&h=120&w=120', stars: 5 },
  { name: 'Diego Alves', role: 'Fisioterapeuta', text: 'Migrei em um dia e dobrei meus agendamentos no primeiro mês.', img: 'https://images.pexels.com/photos/7752811/pexels-photo-7752811.jpeg?auto=compress&cs=tinysrgb&h=120&w=120', stars: 5 },
];

export default function TestimonialMarquee() {
  const doubled = [...testimonials, ...testimonials];
  return (
    <section className="py-12 bg-dark-50 border-y border-dark-100 overflow-hidden">
      <div className="relative">
        <div className="flex gap-6 animate-marquee w-max">
          {doubled.map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[340px] bg-white rounded-2xl p-6 shadow-sm border border-dark-100"
            >
              <div className="flex items-center gap-1 mb-3">
                {[...Array(t.stars)].map((_, s) => (
                  <Star key={s} className="w-4 h-4 text-accent-500 fill-accent-500" />
                ))}
              </div>
              <p className="text-sm text-dark-700 mb-4 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <img src={t.img} alt={t.name} className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="text-sm font-semibold text-dark-900">{t.name}</p>
                  <p className="text-xs text-dark-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-dark-50 to-transparent pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-dark-50 to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
