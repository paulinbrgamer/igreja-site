import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CalendarDays, Clock, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

// 🔹 Exemplo de dados — substitua depois por fetch da API/Supabase


export default function EventDetails() {
  const { id } = useParams();
  const [event, setevent] = useState<any>([])
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      const { data } = await supabase.from('eventos').select("*").eq('id', id).single()
      console.log(data);

      setevent(data)
    }
    fetchEvent()
  }, [])


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
          src={event.img_path ? event.img_path : `https://placehold.co/600x400?text=${event.title}`}
          alt={event.title}
          className="w-full h-140  lg : object-contain lg:object-cover"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        <div className="p-8 space-y-4">
          <h1 className="text-4xl font-bold text-primary">{event.title}</h1>

          <div className="flex flex-wrap items-center gap-4 text-zinc-600 text-sm">
            <span className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4 text-primary" />{" "}
              {new Date(`${event.date}T00:00:00`).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}


            </span>
            <span className="flex justify-center items-center gap-1">
              <Clock className="w-4 h-4 text-primary" />{" "}
              <p>{event.hour}</p>
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4 text-primary" /> {event.address}
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
