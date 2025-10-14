import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Upload } from "lucide-react";

const DIAS_SEMANA = [
  { value: 0, label: "Domingo" },
  { value: 1, label: "Segunda-feira" },
  { value: 2, label: "Terça-feira" },
  { value: 3, label: "Quarta-feira" },
  { value: 4, label: "Quinta-feira" },
  { value: 5, label: "Sexta-feira" },
  { value: 6, label: "Sábado" },
];

const AddCultoSemanal = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dayWeek, setDayWeek] = useState<number | "">("");
  const [hour, setHour] = useState("");
  const [isSpecial, setIsSpecial] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  // Upload da imagem para Supabase Storage
  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `culto-images/${fileName}`;

    const { error } = await supabase.storage
      .from("culto-images")
      .upload(filePath, file);

    if (error) {
      console.error(error);
      toast.error("Erro ao fazer upload da imagem");
      return null;
    }

    const { data } = supabase.storage
      .from("culto-images")
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  // Enviar para o banco
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || dayWeek === "" || !hour) {
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

    const { error } = await supabase.from("semanal").insert([
      {
        title,
        description,
        day_week: dayWeek,
        hour,
        isSpecial,
        img_path: imageUrl,
      },
    ]);

    setLoading(false);

    if (error) {
      console.error(error);
      toast.error("Erro ao adicionar culto");
    } else {
      toast.success("Culto adicionado com sucesso!");
      setTitle("");
      setDescription("");
      setDayWeek("");
      setHour("");
      setIsSpecial(false);
      setImageFile(null);
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
        <h2 className="text-3xl font-bold mb-6 text-center">Adicionar Culto Semanal</h2>

        {/* Título */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Título *</label>
          <Input
            type="text"
            placeholder="Título do culto"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-white/20 text-white border-0 placeholder-gray-300"
          />
        </div>

        {/* Descrição */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Descrição</label>
          <Textarea
            placeholder="Descrição do culto"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-white/20 text-white border-0 placeholder-gray-300"
          />
        </div>

        {/* Dia da semana */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Dia da Semana *</label>
          
          <select
            value={dayWeek}
            onChange={(e) => setDayWeek(Number(e.target.value))}
            className="w-full bg-white/20 text-white border-0 p-2 rounded-md focus:ring-2 focus:ring-primary"
          >
            <option value="">Selecione</option>
            {DIAS_SEMANA.map((d) => (
              <option key={d.value} value={d.value} className="text-black">
                {d.label}
              </option>
            ))}
          </select>
        </div>

        {/* Hora */}
        <div className="mb-4">
          <label className="block mb-2 font-semibold">Hora *</label>
          <Input
            type="time"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            className="bg-white/20 text-white border-0"
          />
        </div>

        {/* É especial */}
        <div className="mb-6 flex items-center gap-3">
          <input
            id="isSpecial"
            type="checkbox"
            checked={isSpecial}
            onChange={(e) => setIsSpecial(e.target.checked)}
            className="w-5 h-5 accent-primary"
          />
          <label htmlFor="isSpecial" className="font-semibold">
            Este culto é especial
          </label>
        </div>

        {/* Upload da imagem */}
        <div className="mb-6">
          <label className="block mb-2 font-semibold">Imagem do culto</label>
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
              <Upload className="w-5 h-5" /> Adicionar Culto
            </>
          )}
        </Button>
      </motion.form>
    </motion.div>
  );
};

export default AddCultoSemanal;
