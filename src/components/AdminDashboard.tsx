import { type FC, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Clock, Link, Trash2, Plus } from "lucide-react"; // Adicionei ícones úteis
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"; // Importado Card
import { Input } from "@/components/ui/input"; // Importado Input
import { Separator } from "@/components/ui/separator"; // Importado Separator
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { supabase } from "@/lib/supabaseClient";
import { useNavigate } from "react-router-dom";
import { intParaDiaSemana } from "@/pages/Events";
import { toast } from "sonner";

// --- INTERFACES (Mantidas) ---
interface agendaSemanal {
  id: number,
  day_week: number,
  title: string,
  description: string,
  hour: string,
  isSpecial: boolean
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

interface AdminDashboardProps {
  userEmail: string;
  onLogout: () => void;
}

export const AdminDashboard: FC<AdminDashboardProps> = ({ userEmail, onLogout }) => {
  const navigate = useNavigate()
  const [Agenda, setAgenda] = useState<agendaSemanal[]>([]);
  const [eventos, setEventos] = useState<eventosSpeciais[]>();
  const [users, setUsers] = useState<string[]>(["joao@example.com", "maria@example.com"]);

  const fadeInUp = { initial: { y: 20, opacity: 0 }, animate: { y: 0, opacity: 1 } };
  const handleSetLinkLive = async(link:string)=>{
    const {error} = await supabase.from('youtube_connection').update({link_live : link}).eq('id',0)
    //@ts-ignore
    if (error) return toast("Erro",error.message)
    toast("Live adicionada")
  }
  // --- FUNÇÕES DE ADMIN ---
  const handleAddUser = () => {
    const email = prompt("Digite o e-mail do novo usuário:");
    if (email) setUsers(prev => [...prev, email]);
  };

  const handleRemoveUser = (email: string) => {
    if (confirm(`Remover o usuário ${email}?`)) setUsers(prev => prev.filter(u => u !== email));
  };


  const handleRemoveCulto = async (id: number) => {
    await supabase.from("semanal").delete().eq('id', id)
    const newAgenda = Agenda.filter((a) => a.id != id)
    setAgenda(newAgenda)
  }
  const handleRemoveEvento = async (id: number) => {
    await supabase.from("eventos").delete().eq('id', id)
    const newEventos = eventos!!.filter((a) => a.id != id)
    setEventos(newEventos)
  }

  useEffect(() => {
    const fetchAgenda = async () => {
      const { data, error } = await supabase.from('semanal').select("*").order("day_week");
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
    // O ideal é buscar eventos especiais aqui também
  }, []);

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
      // Fundo branco limpo com texto preto/cinza
      className="pt-[72px] min-h-screen bg-white text-zinc-900"
    >

      {/* HEADER MONOCROMÁTICO E LIMPO */}
      <div className="bg-zinc-900 text-white p-12 text-center shadow-lg border-b-4 border-black">
        <h1 className="text-4xl lg:text-5xl font-extrabold mb-1 tracking-tight">Painel de Controle</h1>
        <p className="text-lg text-zinc-300 max-w-2xl mx-auto border-t border-zinc-700 pt-2 mt-2">Logado como: {userEmail}</p>
        <Button
          className="mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold"
          onClick={onLogout}
        >
          🚪 Sair
        </Button>
      </div>

      <div className="p-10 md:p-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">

        {/* COLUNA 1: LINK LIVE YOUTUBE E LOGOUT */}
        <div className="lg:col-span-1 space-y-8">

          {/* CARD 1: LINK LIVE YOUTUBE */}
          <motion.div variants={fadeInUp}>
            <Card className="border-2 border-black">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">🎥 Link Live YouTube</CardTitle>
                <CardDescription>Atualize o link que aparece na página "Ao Vivo".</CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <Input
                  type="url"
                  placeholder="Cole o link da live/vídeo aqui"
                  className="border-zinc-400 focus:border-black"
                  id="input-link"
                />
                <Button
                  className="bg-zinc-900 hover:bg-zinc-700"
                  onClick={() => handleSetLinkLive(((document.getElementById('input-link') as HTMLInputElement)?.value) || "")}
                >
                  <Link className="w-5 h-5 mr-2" /> Salvar Link
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* CARD 2: GERENCIAR USUÁRIOS */}
          <motion.div variants={fadeInUp}>
            <Card className="border-2 border-black">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">👥 Gerenciar Usuários</CardTitle>
                <CardDescription>Adicione ou remova e-mails que têm acesso a este painel.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {users.map((u, i) => (
                  <div key={i} className="flex justify-between items-center p-3 border border-zinc-200 bg-zinc-50">
                    <span className="font-medium text-zinc-700">{u}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-600 hover:bg-red-50"
                      onClick={() => handleRemoveUser(u)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-black hover:bg-zinc-700" onClick={handleAddUser}>
                  <Plus className="w-5 h-5 mr-2" /> Adicionar Novo
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
          <Button className="text-xl text-center w-full" onClick={() => navigate("/addCultoSemanal")}>
            <Plus />
            <p>Adicionar Culto Semanal</p>
          </Button>
        </div>

        {/* COLUNA 2: AGENDA SEMANAL */}
        <motion.div variants={fadeInUp} className="lg:col-span-2 space-y-8">
          <Card className="border-2 border-black">
            <CardHeader>
              <CardTitle className="text-3xl border-b border-black pb-2">📅 Agenda Semanal</CardTitle>
              <CardDescription>Edite os cultos e reuniões fixos que aparecem na agenda do site.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Agenda.map((e, i) => (
                <motion.div key={i} className="bg-zinc-50 p-4 border-l-4 border-zinc-500 hover:shadow-md transition-all">
                  <h3 className="text-xl font-bold mb-1">{e.title}</h3>
                  <div className="flex items-center text-zinc-700 text-sm font-medium mb-2">
                    <Clock className="w-4 h-4 mr-2 text-black" />
                    {intParaDiaSemana(e.day_week)} — {e.hour}
                  </div>
                  <p className="text-xs text-zinc-600 truncate">{e.description}</p>
                  {/* Botão de Edição (Adicionado para UX) */}
                  <Button onClick={() => navigate(`/EditCulto/${e.id}`)} variant="link" className="h-auto p-0 text-black hover:text-zinc-600 mt-2">Editar</Button>
                  <Button onClick={() => handleRemoveCulto(e.id)} variant="link" className="ml-5 h-auto p-0 text-red-500 hover:text-zinc-600 mt-2">Remover</Button>

                </motion.div>
              ))}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Separator className="bg-zinc-300 max-w-7xl mx-auto" />

      {/* SEÇÃO EVENTOS ESPECIAIS (CARROSSEL COM SHADCN) */}
      <section className="py-16 bg-white">
        <motion.h2 variants={fadeInUp} className="text-4xl font-bold mb-10 text-center border-b-2 border-zinc-300 inline-block pb-2">
          🌟 Eventos Especiais (Datas Únicas)
        </motion.h2>
        <Button className="text-xl mx-14" onClick={() => navigate("/addEvent")}>
          <Plus />
          Adicionar Evento
        </Button>
        <Carousel opts={{ align: "start", loop: true }} className="relative max-w-5xl mx-auto">
          <CarouselContent>
            {eventos && eventos.map((event) => (
              <CarouselItem key={event.id} className="md:basis-1/3 lg:basis-1/3 px-3">
                <motion.div
                  {...fadeInUp}
                  transition={{ delay: event.id * 0.2 }}
                  className="bg-white/10 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <img
                    src={event.img_path ? event.img_path : `https://placehold.co/600x400?text=${event.title}`}
                    alt={event.title}
                    className="w-full h-80 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-sm opacity-90 mb-4">
                      {event.description}
                    </p>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => navigate(`/EditEvent/${event.id}`)}
                      className="hover:scale-105 transition-transform"
                    >
                      Editar
                    </Button>
                    <Button
                      variant="link"
                      size="sm"
                      onClick={() => handleRemoveEvento(event.id)}
                      className="hover:scale-105 text-red-500 transition-transform"
                    >
                      Remover
                    </Button>
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute top-1/2 bg-primary hover:bg-white/30 text-white border-0" />
          <CarouselNext className="absolute top-1/2 bg-primary hover:bg-white/30 text-white border-0" />
        </Carousel>
      </section>

    </motion.div>
  );
};