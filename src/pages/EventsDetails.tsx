import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarDays, MapPin } from "lucide-react";

// 🔹 Exemplo de dados — substitua depois por fetch da API/Supabase
const eventsData = [
  {
    id: "1",
    title: "Culto da Família",
    date: "2025-10-20",
    location: "Igreja Batista Karismática - Auditório Principal",
    image: "https://placehold.co/800x400?text=Culto+da+Família",
    description:
      "Um culto especial dedicado à família, com louvores, mensagens edificantes e momentos de comunhão. Venha celebrar conosco e fortalecer os laços familiares na presença de Deus.",
  },
  {
    id: "2",
    title: "Noite de Louvor",
    date: "2025-11-05",
    location: "Igreja Batista Karismática - Salão Central",
    image: "https://placehold.co/800x400?text=Noite+de+Louvor",
    description:
      "Uma noite de adoração e entrega total. Louvores inspiradores, ministração poderosa e presença marcante do Espírito Santo.",
  },
  {
    id: "3",
    title: "Retiro Espiritual 2025",
    date: "2025-12-10",
    location: "Sítio Esperança - Serra Verde",
    image: "https://placehold.co/800x400?text=Retiro+Espiritual",
    description:
      "Um fim de semana de renovação espiritual, comunhão e crescimento pessoal. Reserve seu lugar e viva dias de transformação.",
  },
];

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = eventsData.find((e) => e.id === id);

  if (!event) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-3xl font-bold text-primary mb-2">Evento não encontrado</h2>
        <p className="text-zinc-600 mb-6">
          O evento que você procura pode ter sido removido ou não existe.
        </p>
        <Button onClick={() => navigate("/events")}>Voltar para eventos</Button>
      </div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="max-w-5xl mx-auto py-16 px-6 text-zinc-900"
    >
      <Button
        variant="ghost"
        size="sm"
        className="mb-6 flex items-center gap-2 text-zinc-700 hover:text-primary"
        asChild
      >
        <Link to="/events">
          <ArrowLeft className="w-4 h-4" /> Voltar
        </Link>
      </Button>

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <motion.img
          src={event.image}
          alt={event.title}
          className="w-full h-[400px] object-cover"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        <div className="p-8 space-y-4">
          <h1 className="text-4xl font-bold text-primary">{event.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-zinc-600 text-sm">
            <span className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4 text-primary" />{" "}
              {new Date(event.date).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-primary" /> {event.location}
            </span>
          </div>

          <p className="text-lg leading-relaxed text-zinc-700 pt-4">
            {event.description}
          </p>

          <div className="pt-6">
            <Button size="lg" onClick={() => navigate("/contact")} className="hover:scale-105 transition-transform">
              Quero Participar
            </Button>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
