import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Filter, X, CalendarClock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabaseClient';
export function intParaDiaSemana(n: number) {
  const dias = [
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
    "Domingo"
  ];

  return dias[n - 1] || null; // retorna null se n não estiver entre 1 e 7
}


interface agendaSemanal {
  id: number,
  day_week: number,
  title: string,
  description: string,
  hour: string,
  isSpecial: boolean,
  img_path: string
}
interface eventosSpeciais {
  id: number,
  date: string,
  title: string,
  description: string,
  hour: string,
  address: string,
  img_path: string
}




const Events = () => {
  const navigate = useNavigate()
  const [filterDate, setFilterDate] = useState('');
  const [Agenda, setAgenda] = useState<agendaSemanal[]>([])
  const [eventos, setEventos] = useState<eventosSpeciais[]>([])
  const filteredEvents = eventos.filter(e => !filterDate || e.date === filterDate);

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  useEffect(() => {
    const fetchAgenda = async () => {
      const { data, error } = await supabase.from('semanal').select("*").order("day_week").order("hour");
      if (!error && data) {
        setAgenda(data)
      }
    };
    const fetchEventos = async () => {
      const { data, error } = await supabase.from('eventos').select("*").order("date");
      if (!error && data) {
        setEventos(data)
      }
    };
    fetchAgenda();
    fetchEventos();
  }, []);


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
      <section className="bg-zinc-100 py-16 border-t border-b border-zinc-200 text-center">
        <motion.h2
          variants={fadeInUp}
          className="text-4xl font-bold mb-10 text-center border-b-4 border-zinc-800 inline-block pb-2"
        >
          Cultos
        </motion.h2>

        <Carousel
          opts={{
            align: "center",
            loop: false,
          }}
          className="relative max-w-6xl mx-auto px-4"
        >
          <CarouselContent>
            {Agenda.map((event) => (
              <CarouselItem
                key={event.id}
                className="md:basis-1/3 lg:basis-2/6 px-4"
              >
                <motion.div
                  {...fadeInUp}
                  transition={{ delay: event.id * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <img
                    src={event.img_path? event.img_path : `https://placehold.co/600x400?text=${event.title}`}
                    alt={event.title}
                    className="w-full h-110 object-contain"
                  />
                  <div className="p-5 flex flex-col justify-start gap-6 min-h-[220px]">
                    <div className='flex gap-4 items-center' >
                      <CalendarClock/>
                      <div className='flex flex-col justify-start items-start'>
                      <h1 className="text-lg font-semibold  text-zinc-900">{intParaDiaSemana(event.day_week)}</h1>
                      <h1 className="text-lg   text-zinc-900">{event.hour}</h1>
                      </div>
                      
                    </div>
                    <div className='text-start'>
                      <h3 className="text-lg font-semibold mb-2 text-zinc-900">
                        {event.title}
                      </h3>
                      <p className="text-sm text-zinc-600 line-clamp-3">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Botões */}
          <CarouselPrevious className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-primary/80 hover:bg-primary text-white border-0 shadow-lg" />
          <CarouselNext className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-primary/80 hover:bg-primary text-white border-0 shadow-lg" />
        </Carousel>
      </section>

      {/* EVENTOS ESPECIAIS */}
      <section className="p-10 md:p-16 text-secondary mx-auto bg-primary w-[100dvw]" >
        <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-10 text-center border-b-4 border-secondary inline-block pb-2">
          Próximos Eventos Especiais
        </motion.h2>

        {/* LISTA DE EVENTOS */}
        <div className="space-y-6 ">
          {filteredEvents.length > 0 ? (
            (
              <Carousel opts={{ align: "start", loop: true }} className="relative max-w-5xl mx-auto">
                <CarouselContent>
                  {filteredEvents.map((event, i) => (
                    <CarouselItem key={i} className="md:basis-3/3 lg:basis-3/3 px-3">
                      <motion.div
                        {...fadeInUp}
                        transition={{ delay: i * 0.2 }}
                        className="bg-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                      >
                        <img
                          src={event.img_path? event.img_path : `https://placehold.co/600x400?text=${event.title}`}
                          alt={event.title}
                          className="w-full h-140 object-contain"
                        />
                        <div className="p-6">
                          <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                          <p className="text-sm opacity-90 mb-4">
                            {event.description}
                          </p>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => navigate(`/events/${event.id}`)}
                            className="hover:scale-105 transition-transform"
                          >
                            Ver detalhes
                          </Button>
                        </div>
                      </motion.div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="absolute top-1/2 bg-white/20 hover:bg-white/30 text-white border-0" />
                <CarouselNext className="absolute top-1/2 bg-white/20 hover:bg-white/30 text-white border-0" />
              </Carousel>
            )

          ) : (
            <motion.p variants={fadeInUp} className="text-center text-lg text-zinc-700 bg-white p-8 border border-zinc-200 rounded-lg">
              Nenhum evento encontrado para esta data.
            </motion.p>
          )}
        </div>
      </section >
    </motion.div >
  );
};

export default Events;
