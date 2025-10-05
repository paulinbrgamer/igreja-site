import { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, MapPin, Filter, X } from 'lucide-react'; // Ícones mantidos
import { Button } from "@/components/ui/button";

// --- DADOS REAIS DO CARTAZ ---
// Estes dados são fixos e representam a 'Agenda de Cultos e Reuniões'
const AGENDA_FIXA = [
  // Segunda-feira
  { day: 'Segunda-feira', time: '12h - 19:30h', title: 'Cura dos Vícios', isSpecial: true, description: 'Reunião de oração e libertação focada no livramento de vícios.' },
  
  // Terça-feira
  { day: 'Terça-feira', time: '12h - 15h', title: 'Culto da Prosperidade (1ª parte)', isSpecial: true, description: 'Foco na Palavra e princípios de prosperidade.' },
  { day: 'Terça-feira', time: '19:30h', title: 'Culto da Prosperidade (2ª parte)', isSpecial: true, description: 'Momento de adoração e testemunhos de milagres financeiros.' },

  // Quarta-feira
  { day: 'Quarta-feira', time: '12h - 19h', title: 'Círculo de Oração da Família', isSpecial: true, description: 'Intercessão contínua e clamor pela restauração familiar.' },

  // Quinta-feira
  { day: 'Quinta-feira', time: '8h - 12h', title: 'Humilhação pelas Causas Perdidas (1ª parte)', isSpecial: true, description: 'Período de jejum e busca por soluções impossíveis.' },
  { day: 'Quinta-feira', time: '19:30h', title: 'Humilhação pelas Causas Perdidas (2ª parte)', isSpecial: true, description: 'Culto de oração e fé pelas causas difíceis.' },

  // Sexta-feira
  { day: 'Sexta-feira', time: '8h - 12h', title: 'Sexta dos Milagres (1ª parte)', isSpecial: true, description: 'Clínica de oração e imposição de mãos.' },
  { day: 'Sexta-feira', time: '15h', title: 'Sexta dos Milagres (2ª parte)', isSpecial: true, description: 'Culto da Tarde com a Palavra e o poder de Deus.' },
  { day: 'Sexta-feira', time: '19:30h', title: 'Sexta dos Milagres (3ª parte)', isSpecial: true, description: 'Culto da Noite com ministrações e batismos.' },

  // Sábado
  { day: 'Sábado', time: '16h', title: 'Culto dos Jovens', isSpecial: false, description: 'Adoração e palavra direcionada para a juventude.' },

  // Domingo
  { day: 'Domingo', time: '8h - 19h', title: 'Domingo da Adoração', isSpecial: false, description: 'Período de adoração contínua, com cultos em vários horários ao longo do dia.' },
];

// --- DADOS MOCKADOS (Mantidos para Eventos NÃO fixos como conferências, etc.) ---
const PROXIMOS_EVENTOS = [
  // Mantive os dados mockados para eventos únicos (não semanais)
  { id: 1, date: '2025-10-18', time: '09:00h', title: 'Café com Pastores', location: 'Salão Comunitário', description: 'Momento de tirar dúvidas e comunhão com a liderança.' },
  { id: 2, date: '2025-11-05', time: '19:00h', title: 'Conferência Profética', location: 'Auditório Principal', description: 'Três dias de ensino com preletores convidados.' },
];

// Separando a AGENDA FIXA em Cultos (Sábado/Domingo) e Reuniões Temáticas (Segunda a Sexta)
const CULTOS_REGULARES = AGENDA_FIXA.filter(item => !item.isSpecial);
const REUNIOES_TEMATICAS = AGENDA_FIXA.filter(item => item.isSpecial);


// --- COMPONENTE PRINCIPAL ---

const Events = () => {
  const [filterDate, setFilterDate] = useState('');

  const filteredEvents = PROXIMOS_EVENTOS.filter(event => {
    if (!filterDate) return true;
    return event.date === filterDate;
  });

  const handleClearFilter = () => {
    setFilterDate('');
  };

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <motion.div 
        initial="initial"
        animate="animate"
        variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
        className="pt-[72px] min-h-screen bg-white text-zinc-900" 
    >
      {/* HEADER DA PÁGINA */}
      <div className="bg-zinc-900 text-white p-12 text-center border-b border-black">
        <h1 className="text-5xl font-extrabold mb-2">Agenda Semanal e Eventos</h1>
        <p className="text-xl text-zinc-300">Seu sofrimento acaba aqui. Participe de uma de nossas reuniões!</p>
      </div>

      {/* 1. SEÇÃO: CULTOS (Sábado e Domingo) */}
      <section className="p-10 md:p-16 max-w-7xl mx-auto">
        <motion.h2 
            variants={fadeInUp} 
            className="text-4xl font-extrabold mb-12 text-center text-zinc-900 border-b-2 border-black inline-block px-4 pb-2"
        >
            Cultos Principais (Adoração e Jovens)
        </motion.h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {CULTOS_REGULARES.map((culto, index) => (
            <motion.div 
              key={index}
              variants={fadeInUp}
              className="bg-zinc-50 p-6 shadow-md border-t-4 border-black hover:shadow-lg transition-shadow"
            >
              <h3 className="text-2xl font-bold mb-1 text-zinc-900">{culto.day}</h3>
              <p className="flex items-center text-xl text-black font-extrabold mb-3">
                <Clock className="h-6 w-6 mr-2 text-black" />
                {culto.time}
              </p>
              <h4 className="font-semibold mb-1">{culto.title}</h4>
              <p className="text-sm text-zinc-600">{culto.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
      
      {/* 2. SEÇÃO: REUNIÕES E ORAÇÃO TEMÁTICAS (Segunda a Sexta) */}
      <section className="bg-zinc-100 p-10 md:p-16 text-zinc-900 border-t border-b border-zinc-200">
        <motion.h2 
            variants={fadeInUp} 
            className="text-4xl font-extrabold mb-10 text-center text-zinc-900 border-b-2 border-black inline-block px-4 pb-2"
        >
            Reuniões Temáticas e Círculo de Oração
        </motion.h2>

        <div className="max-w-6xl mx-auto space-y-4">
          {REUNIOES_TEMATICAS.map((reuniao, index) => (
            <motion.div 
              key={index} 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row bg-white p-4 shadow-sm hover:shadow-md transition-shadow border-l-4 border-zinc-500"
            >
              {/* Dia da Semana */}
              <div className="flex-shrink-0 sm:w-40 mb-2 sm:mb-0 sm:pr-4 sm:border-r border-zinc-200">
                  <p className="text-lg font-bold text-black">{reuniao.day}</p>
              </div>
              
              {/* Horário e Título */}
              <div className="sm:pl-4 flex-grow">
                  <h3 className="text-xl font-bold mb-1">{reuniao.title}</h3>
                  <p className="flex items-center text-lg font-extrabold text-black">
                      <Clock className="h-5 w-5 mr-2 text-black" />
                      {reuniao.time}
                  </p>
                  <p className="text-sm text-zinc-600 mt-1">{reuniao.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>


      {/* 3. SEÇÃO: PRÓXIMOS EVENTOS ESPECIAIS (NÃO FIXOS) */}
      <section className="p-10 md:p-16 max-w-7xl mx-auto">
        <motion.h2 
            variants={fadeInUp} 
            className="text-4xl font-extrabold mb-10 text-center text-zinc-900 border-b-2 border-black inline-block px-4 pb-2"
        >
            Próximos Eventos Especiais (Datas Únicas)
        </motion.h2>

        {/* CONTROLES DE FILTRO (MANTIDOS) */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-12 max-w-2xl mx-auto p-4 bg-zinc-50 border border-zinc-300 shadow-md">
            <Filter className="w-5 h-5 text-black" />
            <label htmlFor="filter-date" className="text-lg font-semibold whitespace-nowrap">Filtrar por Data:</label>
            <input
                id="filter-date"
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
                className="p-2 border border-black bg-white text-zinc-900 flex-grow" 
            />
            {filterDate && (
                <Button 
                    variant="ghost" 
                    onClick={handleClearFilter}
                    className="flex items-center text-red-600 hover:bg-zinc-200"
                >
                    <X className="w-4 h-4 mr-1" />
                    Limpar
                </Button>
            )}
        </div>

        {/* LISTA DE EVENTOS ESPECIAIS (NÃO FIXOS) */}
        <div className="max-w-4xl mx-auto space-y-6">
          {filteredEvents.length > 0 ? (
            filteredEvents.map(event => (
              <motion.div 
                key={event.id} 
                variants={fadeInUp}
                className="flex flex-col md:flex-row bg-white p-6 shadow-lg hover:shadow-xl transition-shadow border-l-4 border-black" 
              >
                {/* Data e Hora */}
                <div className="flex-shrink-0 md:w-36 mb-4 md:mb-0 md:pr-6 md:border-r border-zinc-300">
                    <p className="text-sm font-bold text-black mb-1">{new Date(event.date).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                    <p className="flex items-center text-xl font-extrabold text-zinc-900">
                        <Clock className="h-5 w-5 mr-2 text-black" />
                        {event.time}
                    </p>
                </div>
                
                {/* Detalhes do Evento */}
                <div className="md:pl-6 flex-grow">
                    <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
                    <p className="text-zinc-700 mb-3">{event.description}</p>
                    <p className="flex items-center text-sm text-zinc-500">
                        <MapPin className="h-4 w-4 mr-1" />
                        Local: {event.location}
                    </p>
                    <div className="mt-4">
                        <Button 
                            size="sm" 
                            className="bg-black hover:bg-zinc-700 text-white border border-black"
                        >
                            Detalhes / Inscrever-se
                        </Button>
                    </div>
                </div>
              </motion.div>
            ))
          ) : (
            <motion.p variants={fadeInUp} className="text-center text-xl text-zinc-700 bg-white p-8 border border-zinc-300 shadow-inner">
                Nenhum evento especial encontrado para esta data.
            </motion.p>
          )}
        </div>
      </section>

    </motion.div>
  );
};

export default Events;