import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Filter, X } from 'lucide-react';
import { Button } from "@/components/ui/button";

const AGENDA_FIXA = [
  { day: 'Segunda-feira', time: '12h - 19:30h', title: 'Cura dos Vícios', isSpecial: true, description: 'Reunião de oração e libertação focada no livramento de vícios.' },
  { day: 'Terça-feira', time: '12h - 15h', title: 'Culto da Prosperidade (1ª parte)', isSpecial: true, description: 'Foco na Palavra e princípios de prosperidade.' },
  { day: 'Terça-feira', time: '19:30h', title: 'Culto da Prosperidade (2ª parte)', isSpecial: true, description: 'Momento de adoração e testemunhos de milagres financeiros.' },
  { day: 'Quarta-feira', time: '12h - 19h', title: 'Círculo de Oração da Família', isSpecial: true, description: 'Intercessão contínua e clamor pela restauração familiar.' },
  { day: 'Quinta-feira', time: '8h - 12h', title: 'Humilhação pelas Causas Perdidas (1ª parte)', isSpecial: true, description: 'Período de jejum e busca por soluções impossíveis.' },
  { day: 'Quinta-feira', time: '19:30h', title: 'Humilhação pelas Causas Perdidas (2ª parte)', isSpecial: true, description: 'Culto de oração e fé pelas causas difíceis.' },
  { day: 'Sexta-feira', time: '8h - 12h', title: 'Sexta dos Milagres (1ª parte)', isSpecial: true, description: 'Clínica de oração e imposição de mãos.' },
  { day: 'Sexta-feira', time: '15h', title: 'Sexta dos Milagres (2ª parte)', isSpecial: true, description: 'Culto da Tarde com a Palavra e o poder de Deus.' },
  { day: 'Sexta-feira', time: '19:30h', title: 'Sexta dos Milagres (3ª parte)', isSpecial: true, description: 'Culto da Noite com ministrações e batismos.' },
  { day: 'Sábado', time: '16h', title: 'Culto dos Jovens', isSpecial: false, description: 'Adoração e palavra direcionada para a juventude.' },
  { day: 'Domingo', time: '8h - 19h', title: 'Domingo da Adoração', isSpecial: false, description: 'Período de adoração contínua, com cultos em vários horários.' },
];

const PROXIMOS_EVENTOS = [
  { id: 1, date: '2025-10-18', time: '09:00h', title: 'Café com Pastores', location: 'Salão Comunitário', description: 'Momento de comunhão com a liderança.' },
  { id: 2, date: '2025-11-05', time: '19:00h', title: 'Conferência Profética', location: 'Auditório Principal', description: 'Três dias de ensino com preletores convidados.' },
];

const CULTOS_REGULARES = AGENDA_FIXA.filter(i => !i.isSpecial);
const REUNIOES_TEMATICAS = AGENDA_FIXA.filter(i => i.isSpecial);

const Events = () => {
  const [filterDate, setFilterDate] = useState('');
  const filteredEvents = PROXIMOS_EVENTOS.filter(e => !filterDate || e.date === filterDate);

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <motion.div 
      initial="initial"
      animate="animate"
      variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
      className="pt-[72px] min-h-screen bg-gradient-to-b from-white to-zinc-50 text-zinc-900"
    >
      {/* HEADER */}
      <div className="bg-gradient-to-r from-zinc-900 via-black to-zinc-800 text-white p-16 text-center shadow-md">
        <h1 className="text-5xl font-extrabold mb-3 tracking-tight">Agenda Semanal e Eventos</h1>
        <p className="text-lg text-zinc-300 max-w-2xl mx-auto">
          Descubra os cultos, reuniões e eventos que transformam vidas. Venha fazer parte!
        </p>
      </div>

      {/* CULTOS */}
      <section className="p-10 md:p-16 max-w-6xl mx-auto">
        <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-10 text-center border-b-4 border-black inline-block pb-2">
          Cultos Principais
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {CULTOS_REGULARES.map((culto, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="bg-white rounded-xl p-6 shadow-sm border border-zinc-200 hover:shadow-lg transition-all duration-200 hover:-translate-y-1"
            >
              <h3 className="text-2xl font-bold mb-2">{culto.title}</h3>
              <div className="flex items-center text-zinc-700 font-medium mb-1">
                <Clock className="w-5 h-5 mr-2 text-black" />
                {culto.day} — {culto.time}
              </div>
              <p className="text-sm text-zinc-600">{culto.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* REUNIÕES */}
      <section className="bg-zinc-100 py-16 border-t border-b border-zinc-200">
        <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-10 text-center border-b-4 border-zinc-800 inline-block pb-2">
          Reuniões Temáticas
        </motion.h2>
        <div className="max-w-5xl mx-auto space-y-4">
          {REUNIOES_TEMATICAS.map((r, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              className="bg-white p-5 rounded-lg border border-zinc-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col sm:flex-row"
            >
              <div className="sm:w-48 mb-2 sm:mb-0 sm:pr-4 sm:border-r border-zinc-100">
                <p className="font-bold text-black">{r.day}</p>
                <p className="flex items-center text-sm font-medium text-zinc-700 mt-1">
                  <Clock className="w-4 h-4 mr-1" /> {r.time}
                </p>
              </div>
              <div className="sm:pl-4">
                <h3 className="text-lg font-semibold text-zinc-900">{r.title}</h3>
                <p className="text-sm text-zinc-600 mt-1">{r.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* EVENTOS ESPECIAIS */}
      <section className="p-10 md:p-16 max-w-6xl mx-auto">
        <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-10 text-center border-b-4 border-black inline-block pb-2">
          Próximos Eventos Especiais
        </motion.h2>

        {/* FILTRO */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10 bg-white p-4 rounded-lg border border-zinc-300 shadow-sm">
          <Filter className="w-5 h-5 text-black" />
          <label htmlFor="filter-date" className="text-base font-semibold whitespace-nowrap">Filtrar por data:</label>
          <input
            id="filter-date"
            type="date"
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="p-2 border border-zinc-400 rounded-md bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-black text-zinc-900"
          />
          {filterDate && (
            <Button
              variant="ghost"
              onClick={() => setFilterDate('')}
              className="flex items-center text-red-600 hover:bg-zinc-100"
            >
              <X className="w-4 h-4 mr-1" /> Limpar
            </Button>
          )}
        </div>

        {/* LISTA DE EVENTOS */}
        <div className="space-y-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(e => (
              <motion.div
                key={e.id}
                variants={fadeInUp}
                className="bg-white rounded-xl p-6 shadow-md border-l-4 border-black hover:shadow-lg hover:-translate-y-1 transition-all duration-200"
              >
                <div className="flex flex-col md:flex-row md:items-start">
                  <div className="md:w-64 mb-4 md:mb-0">
                    <p className="text-sm font-bold text-zinc-800 mb-1">
                      {new Date(e.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}
                    </p>
                    <p className="flex items-center text-lg font-semibold text-black">
                      <Clock className="h-5 w-5 mr-2" />
                      {e.time}
                    </p>
                  </div>
                  <div className="flex-1 md:pl-6">
                    <h3 className="text-2xl font-bold text-zinc-900 mb-2">{e.title}</h3>
                    <p className="text-zinc-600 mb-3">{e.description}</p>
                    <p className="flex items-center text-sm text-zinc-500">
                      <MapPin className="h-4 w-4 mr-1" /> Local: {e.location}
                    </p>
                    <div className="mt-4">
                      <Button size="sm" className="bg-black hover:bg-zinc-800 text-white border border-black">
                        Detalhes / Inscrever-se
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.p variants={fadeInUp} className="text-center text-lg text-zinc-700 bg-white p-8 border border-zinc-200 rounded-lg">
              Nenhum evento encontrado para esta data.
            </motion.p>
          )}
        </div>
      </section>
    </motion.div>
  );
};

export default Events;
