import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const fadeInUp = {
  initial: { y: 20, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const Home = () => {
  const navigate = useNavigate();
  const [eventos, setEventos] = useState<any>([])
  useEffect(() => {
    const fetchEventos = async () => {
      const { data, error } = await supabase.from('eventos').select("*").order("date");
      if (!error && data) {
        setEventos(data)
      }
    };
    fetchEventos()
  }, [])

  return (
    <div className="flex flex-col w-full">
      <section className="py-24 bg-zinc-900 text-zinc-900 text-center px-6">
        <Carousel opts={{ align: "start", loop: true }} className="relative max-w-5xl mx-auto">
          <CarouselContent>
            {eventos.map((event: any) => (
              <CarouselItem key={event.id} className="md:basis-3/3 lg:basis-3/3 px-3 text-secondary">
                <motion.div
                  {...fadeInUp}
                  transition={{ delay: event.id * 0.2 }}
                  className="bg-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <img
                    src={event.img_path ? event.img_path : `https://placehold.co/600x400?text=${event.title}`}
                    alt={event.title}
                    className="w-full h-140 object-contain sm:p-4"
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
      </section>


      {/* === SOBRE === */}
      <section className="py-24 bg-zinc-50 text-zinc-900 text-center px-6">
        {/*@ts-ignore */}
        <motion.div {...fadeInUp}>
          <h2 className="text-4xl font-bold mb-6 text-primary">Sobre Nós</h2>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed opacity-90">
            Somos uma comunidade comprometida com a adoração, a comunhão e o serviço ao próximo.
            Buscamos viver o amor de Cristo e compartilhar Sua palavra com todos.
          </p>
          <Button asChild variant="link" className="mt-4 text-primary font-medium">
            <Link to="/about">Ler mais →</Link>
          </Button>
        </motion.div>
      </section>


      {/* === AO VIVO === */}
      <section className="py-24 bg-zinc-900 text-white text-center px-6">
        {/*@ts-ignore */}
        <motion.div {...fadeInUp}>
          <h2 className="text-4xl font-bold mb-4">Cultos Ao Vivo</h2>
          <p className="max-w-2xl mx-auto mb-6 text-lg opacity-90">
            Acompanhe nossos cultos e eventos diretamente de sua casa, ao vivo e com fé.
          </p>
          <Button
            variant="secondary"
            size="lg"
            onClick={() => navigate("/live")}
            className="hover:scale-105 transition-transform"
          >
            Assistir Agora
          </Button>
        </motion.div>
      </section>

      {/* === CONTATO === */}
      <section className="py-24 bg-zinc-50 text-zinc-900 text-center px-6">
        {/*@ts-ignore */}
        <motion.div {...fadeInUp}>
          <h2 className="text-4xl font-bold mb-4 text-primary">Entre em Contato</h2>
          <p className="max-w-2xl mx-auto mb-6 text-lg opacity-90">
            Ficaremos felizes em receber sua visita ou mensagem. Estamos aqui para acolher e orar com você.
          </p>
          <Button asChild variant="default" size="lg" className="font-medium hover:scale-105 transition-transform">
            <Link to="/contact">Fale Conosco</Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;
