import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Save, Trash} from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const EditEvent = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { session } = useAuthStore();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [address, setAddress] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [currentImage, setCurrentImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // --- Carrega o evento existente ---
  useEffect(() => {
    if (!session) navigate("/");

    const fetchEvent = async () => {
      const { data, error } = await supabase
        .from("eventos")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        toast.error("Erro ao carregar o evento");
        navigate("/Account");
        return;
      }

      setTitle(data.title);
      setDescription(data.description || "");
      setDate(data.date);
      setTime(data.hour);
      setAddress(data.address || "");
      setCurrentImage(data.img_path || null);
    };

    fetchEvent();
  }, [id, navigate, session]);

  // --- Upload da imagem ---
  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `event-images/${fileName}`;

    const { error } = await supabase.storage.from("event-images").upload(filePath, file);

    if (error) {
      console.error(error);
      toast.error("Erro ao enviar a imagem");
      return null;
    }

    const { data } = supabase.storage.from("event-images").getPublicUrl(filePath);
    return data.publicUrl;
  };

  // --- Remover imagem atual ---
  const handleRemoveImage = async () => {
    if (!currentImage) return;

    try {
      const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

      // Extrai apenas o caminho do arquivo dentro do bucket
      let filePath = currentImage.replace(`${supabaseUrl}/storage/v1/object/public/event-images/`, "");
      if (filePath.startsWith("event-images/")) filePath = filePath.replace(/^event-images\//, "");

      const { error } = await supabase.storage.from("event-images").remove([`event-images/${filePath}`]);
      if (error) {
        console.error(error);
        toast.error("Erro ao remover a imagem");
        return;
      }

      setCurrentImage(null);
      toast.success("Imagem removida com sucesso!");
    } catch (err) {
      console.error("Erro inesperado ao remover imagem:", err);
      toast.error("Erro inesperado ao remover a imagem");
    }
  };

  // --- Atualizar evento ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !time) {
      toast.error("Preencha todos os campos obrigatórios");
      return;
    }

    setLoading(true);
    let imageUrl = currentImage;

    if (imageFile) {
      imageUrl = await uploadImage(imageFile);
      if (!imageUrl) {
        setLoading(false);
        return;
      }
    }

    const { error } = await supabase
      .from("eventos")
      .update({
        title,
        description,
        date,
        hour: time,
        address,
        img_path: imageUrl,
      })
      .eq("id", id);

    setLoading(false);

    if (error) {
      console.error(error);
      toast.error("Erro ao atualizar evento");
    } else {
      toast.success("Evento atualizado com sucesso!");
      navigate("/events");
    }
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 15 },
    animate: { opacity: 1, y: 0 },
  };

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
        <h2 className="text-3xl font-bold mb-6 text-center">Editar Evento</h2>

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

        {/* Data, Hora e Endereço */}
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
          <div className="col-span-2">
            <label className="block mb-2 font-semibold">Endereço</label>
            <Input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="bg-white/20 text-white border-0"
            />
          </div>
        </div>

        {/* Imagem */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Imagem do evento</label>
          {currentImage ? (
            <div className="flex flex-col items-center gap-3">
              <img src={currentImage} alt="Imagem atual" className="w-full rounded-lg shadow-md" />
              <Button type="button" variant="destructive" size="sm" onClick={(e)=>{
                e.preventDefault()
                handleRemoveImage()
              }} className="bg-red-600 hover:bg-red-700 text-white">
                <Trash className="w-4 h-4 mr-2" /> Remover imagem
              </Button>
            </div>
          ) : (
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              className="bg-white/20 text-white border-0 cursor-pointer"
            />
          )}
        </div>

        {/* Botão de salvar */}
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
              <Save className="w-5 h-5" /> Atualizar Evento
            </>
          )}
        </Button>
      </motion.form>
    </motion.div>
  );
};

export default EditEvent;
