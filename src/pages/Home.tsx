import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { MoveRight } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full">
      {/* === HERO / INTRO === */}
      <section
        className="relative min-h-[calc(70vh-4rem)] bg-cover bg-center flex flex-col items-center justify-center text-white text-center px-6"
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-3xl"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            Bem-vindo à Igreja Batista Karismática
          </h1>
          <p className="text-lg md:text-xl mb-8">
            “Onde dois ou três estiverem reunidos em meu nome, aí estou eu no meio deles.” — Mateus 18:20
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => navigate("/events")}
              className="hover:scale-105 transition-transform"
            >
              Participe Conosco <MoveRight className="ml-2" />
            </Button>

          </div>
        </motion.div>
      </section>

      {/* === SOBRE === */}
      <section className="py-20 bg-zinc-100 text-zinc-900 text-center px-6">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          <h2 className="text-4xl font-bold mb-4 text-primary">Sobre Nós</h2>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed">
            Somos uma comunidade comprometida com a adoração, a comunhão e o serviço ao próximo. 
            Buscamos viver o amor de Cristo e compartilhar sua palavra com todos.
          </p>
          <Button asChild variant="link" className="mt-4 text-primary">
            <Link to="/about">Ler mais →</Link>
          </Button>
        </motion.div>
      </section>

      {/* === EVENTOS === */}
      <section className="py-20 bg-accent-foreground text-white text-center relative px-6">
        <h2 className="text-4xl font-bold mb-6">Próximos Eventos</h2>
        <Carousel opts={{ align: "start", loop: true }} className="relative max-w-4xl mx-auto">
          <CarouselContent>
            {["Evento 1", "Evento 2", "Evento 3"].map((title, i) => (
              <CarouselItem
                key={i}
                className="w-full md:w-1/2 lg:w-1/3 px-2"
              >
                <div className="bg-white/10 rounded-xl overflow-hidden shadow-lg">
                  <img
                    src={`https://placehold.co/600x400?text=${title}`}
                    alt={title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{title}</h3>
                    <p className="text-sm opacity-80 mb-4">
                      Um momento de louvor, comunhão e palavra. Venha participar!
                    </p>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => navigate("/events")}
                    >
                      Ver detalhes
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 bg-primary " />
          <CarouselNext className="absolute top-1/2 bg-primary " />
        </Carousel>
      </section>

      {/* === AO VIVO === */}
      <section className="py-20 bg-accent-foreground text-white text-center px-6">
        <h2 className="text-4xl font-bold mb-4">Cultos Ao Vivo</h2>
        <p className="max-w-2xl mx-auto mb-6 text-lg opacity-90">
          Acompanhe nossos cultos e eventos diretamente de sua casa.
        </p>
        <Button variant="secondary" size="lg" onClick={() => navigate("/live")}>
          Assistir Agora
        </Button>
      </section>

      {/* === CONTATO === */}
      <section className="py-20 bg-zinc-100 text-zinc-900 text-center px-6">
        <h2 className="text-4xl font-bold mb-4 text-primary">Entre em Contato</h2>
        <p className="max-w-2xl mx-auto mb-6 text-lg">
          Ficaremos felizes em receber sua visita ou mensagem. 
          Estamos aqui para acolher e orar com você.
        </p>
        <Button asChild variant="default" size="lg">
          <Link to="/contact">Fale Conosco</Link>
        </Button>
      </section>
    </div>
  );
};

export default Home;
