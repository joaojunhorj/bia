import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import Reveal from './Reveal';

const faqs = [
  {
    q: 'O que é a Bia Health?',
    a: 'É um sistema de gestão tudo-em-um para clínicas, com Inteligência Artificial integrada. Reúne agenda, prontuário, prescrição, financeiro e atendimento em um só lugar.',
  },
  {
    q: 'Quais recursos estão inclusos?',
    a: 'Agenda inteligente, prontuário eletrônico, prescrição digital, financeiro, relatórios e os recursos essenciais da IA Bia. Módulos adicionais podem ser ativados conforme a necessidade.',
  },
  {
    q: 'Serve para clínicas de qualquer tamanho?',
    a: 'Sim! Da clínica de um único profissional às operações com dezenas de salas e equipes. O sistema cresce junto com a sua clínica.',
  },
  {
    q: 'Como funciona o suporte?',
    a: 'Suporte humano e especializado, treinamento semanal ao vivo e ajuda na migração dos seus dados, tudo para você extrair o máximo do sistema.',
  },
  {
    q: 'Como a Bia ajuda a reduzir faltas e aumentar agendamentos?',
    a: 'Lembretes automáticos reduzem faltas, a IA responde e agenda 24h e as ferramentas de marketing e CRM mantêm o relacionamento com cada paciente.',
  },
  {
    q: 'A Bia IA funciona no WhatsApp?',
    a: 'Sim. A Bia atende e agenda no WhatsApp, transcreve consultas e cria conteúdo, atuando em toda a rotina da clínica.',
  },
  {
    q: 'Os dados dos pacientes estão seguros?',
    a: 'Totalmente. Criptografia, consentimento explícito, controle de acesso por equipe e registros auditáveis garantem a segurança dos dados dos seus pacientes.',
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-20 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Reveal className="text-center mb-14">
          <p className="text-sm font-semibold text-primary-600 uppercase tracking-wider mb-3">FAQ</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark-900 text-balance">
            Tudo que você precisa saber
          </h2>
          <p className="mt-4 text-dark-600">
            Tire suas dúvidas e descubra como a Bia Health pode ajudar a sua clínica a ganhar tempo,
            eficiência e mais controle no dia a dia.
          </p>
        </Reveal>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <Reveal key={i} delay={i * 50}>
              <div
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  open === i
                    ? 'border-primary-300 bg-primary-50/30 shadow-lg shadow-primary-500/5'
                    : 'border-dark-200 bg-white hover:border-dark-300'
                }`}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 p-5 text-left"
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span className="font-semibold text-dark-900">{faq.q}</span>
                  <ChevronDown
                    className={`flex-shrink-0 w-5 h-5 text-primary-600 transition-transform duration-300 ${
                      open === i ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    open === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 text-dark-600 leading-relaxed">{faq.a}</p>
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
