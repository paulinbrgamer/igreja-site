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
import { MoveRight } from "lucide-react";

const fadeInUp = {
  initial: { y: 20, opacity: 0 },
  whileInView: { y: 0, opacity: 1 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col w-full">
      {/* === HERO === */}
      <section
        className="relative min-h-[calc(75vh-4rem)] bg-cover bg-center flex flex-col items-center justify-center text-white text-center px-6"
        style={{ backgroundImage: "url('/background.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80 backdrop-blur-[1px]" />
        {/*@ts-ignore */}
        <motion.div
          {...fadeInUp}
          className="relative z-10 max-w-3xl space-y-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight tracking-tight">
            Bem-vindo à <span className="text-accent">Igreja Batista Karismática</span>
          </h1>
          <p className="text-lg md:text-xl font-light opacity-90">
            “Onde dois ou três estiverem reunidos em meu nome, aí estou eu no meio deles.” — Mateus 18:20
          </p>
          <Button
            size="lg"
            variant="secondary"
            onClick={() => navigate("/events")}
            className="hover:scale-105 transition-transform font-medium"
          >
            Participe Conosco <MoveRight className="ml-2 w-4 h-4" />
          </Button>
        </motion.div>
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

      {/* === EVENTOS === */}
      <section className="py-24 bg-primary text-white text-center relative px-6">
        {/*@ts-ignore */}
        <motion.div {...fadeInUp}>
          <h2 className="text-4xl font-bold mb-8">Próximos Eventos</h2>
        </motion.div>

        <Carousel opts={{ align: "start", loop: true }} className="relative max-w-5xl mx-auto">
          <CarouselContent>
            {["Culto da Família", "Noite de Louvor", "Retiro Espiritual"].map((title, i) => (
              <CarouselItem key={i} className="md:basis-1/2 lg:basis-1/3 px-3">
                <motion.div
                  {...fadeInUp}
                  transition={{ delay: i * 0.2 }}
                  className="bg-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <img
                    src={`https://placehold.co/600x400?text=${title}`}
                    alt={title}
                    className="w-full h-56 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{title}</h3>
                    <p className="text-sm opacity-90 mb-4">
                      Um momento de louvor, comunhão e palavra. Venha participar!
                    </p>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => navigate("/events")}
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
