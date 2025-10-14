import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Upload } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useLocation, useNavigate } from "react-router-dom";

const AddEvent = () => {
  const navigate = useNavigate()
     
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const {session} = useAuthStore()
  // Upload da imagem para o Supabase Storage
  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `event-images/${fileName}`;

    const { error } = await supabase.storage
      .from("event-images")
      .upload(filePath, file);

    if (error) {
      console.error(error);
      toast.error("Erro ao fazer upload da imagem");
      return null;
    }

    const { data } = supabase.storage
      .from("event-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !time) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    setLoading(true);
    let imageUrl = null;

    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
      if (!imageUrl) {
        setLoading(false);
        return;
      }
    }

    const { error } = await supabase.from("eventos").insert([
      {
        title,
        description,
        date,
        hour : time,
        img_path: imageUrl,
        address
      },
    ]);

    setLoading(false);

    if (error) {
      toast.error("Erro ao adicionar evento");
      console.error(error);
    } else {
      toast.success("Evento adicionado com sucesso!");
      setTitle("");
      setDescription("");
      setDate("");
      setTime("");
      setImageFile(null);
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
  };
  useEffect(() => {
    if( !session){
       navigate("/")  
    }
  }, [])
  
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
      className="min-h-screen bg-gradient-to-b from-zinc-900 via-black to-zinc-800 flex items-center justify-center p-6"
    >
      <motion.form
        variants={fadeInUp}
        onSubmit={handleSubmit}
        className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 w-full max-w-lg text-white"
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Adicionar Evento</h2>

        {/* Título */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Título *</label>
          <Input
            type="text"
            placeholder="Digite o título do evento"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-white/20 text-white border-0 placeholder-gray-300"
          />
        </div>

        {/* Descrição */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Descrição</label>
          <Textarea
            placeholder="Descrição do evento"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-white/20 text-white border-0 placeholder-gray-300"
          />
        </div>

        {/* Data e Hora */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-2 font-semibold">Data *</label>
            <Input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="bg-white/20 text-white border-0"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Hora *</label>
            <Input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="bg-white/20 text-white border-0"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold">Endereço *</label>
            <Input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-white/20 text-white border-0"
            />
          </div>
        </div>

        {/* Upload de imagem */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Imagem do evento</label>
          <div className="flex items-center gap-3">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="bg-white/20 text-white border-0 cursor-pointer"
            />
            {imageFile && (
              <span className="text-sm text-gray-300 truncate max-w-[150px]">
                {imageFile.name}
              </span>
            )}
          </div>
        </div>

        {/* Botão */}
        <Button
          type="submit"
          className="w-full bg-primary hover:bg-primary/90 text-white flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Salvando...
            </>
          ) : (
            <>
              <Upload className="w-5 h-5" /> Adicionar Evento
            </>
          )}
        </Button>
      </motion.form>
    </motion.div>
  );
};

export default AddEvent;
