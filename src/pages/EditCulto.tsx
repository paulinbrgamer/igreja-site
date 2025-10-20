import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "@/lib/supabaseClient";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Save, Trash } from "lucide-react";

const EditCulto = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dayWeek, setDayWeek] = useState(0);
    const [hour, setHour] = useState("");
    const [isSpecial, setIsSpecial] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [currentImage, setCurrentImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // --- Carrega o culto existente ---
    useEffect(() => {
        const fetchCulto = async () => {
            const { data, error } = await supabase
                .from("semanal")
                .select("*")
                .eq("id", id)
                .single();

            if (error || !data) {
                toast.error("Erro ao carregar o culto");
                navigate("/semanal");
                return;
            }

            setTitle(data.title);
            setDescription(data.description || "");
            setDayWeek(data.day_week);
            setHour(data.hour);
            setIsSpecial(data.isSpecial);
            setCurrentImage(data.img_path || null);
        };

        fetchCulto();
    }, [id, navigate]);

    // --- Upload da imagem ---
    const uploadImage = async (file: File): Promise<string | null> => {
        const fileExt = file.name.split(".").pop();
        const fileName = `${Date.now()}.${fileExt}`;
        const filePath = `culto-images/${fileName}`;

        const { error } = await supabase.storage
            .from("culto-images")
            .upload(filePath, file);

        if (error) {
            console.error(error);
            toast.error("Erro ao enviar a imagem");
            return null;
        }

        const { data } = supabase.storage
            .from("culto-images")
            .getPublicUrl(filePath);

        return data.publicUrl;
    };

    // --- Remover imagem atual ---
    const handleRemoveImage = async () => {
  if (!currentImage) return;

  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;

    // Remove a parte inicial da URL pública para obter apenas o caminho relativo no bucket
    let filePath = currentImage.replace(
      `${supabaseUrl}/storage/v1/object/public/culto-images/`,
      ""
    );

    // Garante que não haja duplicação "culto-images/culto-images/"
    if (filePath.startsWith("culto-images/")) {
      filePath = filePath.replace(/^culto-images\//, "");
    }

    // Remove o arquivo do bucket
    const { error } = await supabase.storage
      .from("culto-images")
      .remove([`culto-images/${filePath}`]);

    if (error) {
      console.error("Erro ao remover imagem:", error);
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






    // --- Atualizar o culto ---
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !hour) {
            toast.error("Preencha os campos obrigatórios");
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
            .from("semanal")
            .update({
                title,
                description,
                day_week: Number(dayWeek),
                hour,
                isSpecial,
                img_path: imageUrl,
            })
            .eq("id", id);

        setLoading(false);

        if (error) {
            console.error(error);
            toast.error("Erro ao atualizar o culto");
        } else {
            toast.success("Culto atualizado com sucesso!");
            navigate("/Account");
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
                <h2 className="text-3xl font-bold mb-6 text-center">
                    Editar Culto Semanal
                </h2>

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

                {/* Dia da semana e Hora */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label className="block mb-2 font-semibold">Dia da Semana</label>
                        <select
                            value={dayWeek}
                            onChange={(e) => setDayWeek(Number(e.target.value))}
                            className="bg-white/20 text-white border-0 w-full rounded-md p-2"
                        >
                            <option value={0}>Domingo</option>
                            <option value={1}>Segunda</option>
                            <option value={2}>Terça</option>
                            <option value={3}>Quarta</option>
                            <option value={4}>Quinta</option>
                            <option value={5}>Sexta</option>
                            <option value={6}>Sábado</option>
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 font-semibold">Hora *</label>
                        <Input
                            type="time"
                            value={hour}
                            onChange={(e) => setHour(e.target.value)}
                            className="bg-white/20 text-white border-0"
                        />
                    </div>
                </div>

                {/* Culto especial */}
                <div className="mb-6 flex items-center gap-2">
                    <input
                        type="checkbox"
                        checked={isSpecial}
                        onChange={(e) => setIsSpecial(e.target.checked)}
                    />
                    <label className="font-semibold">Culto especial</label>
                </div>

                {/* Imagem */}
                <div className="mb-6">
                    <label className="block mb-2 font-semibold">Imagem</label>

                    {currentImage ? (
                        <div className="flex flex-col items-center gap-3">
                            <img
                                src={currentImage}
                                alt="Imagem atual"
                                className="w-full rounded-lg shadow-md"
                            />
                            <Button
                                variant="destructive"
                                size="sm"
                                type="button"
                                onClick={(e) => {
                                    e.preventDefault(); // previne submit do form
                                    handleRemoveImage();
                                }}
                                className="bg-red-600 hover:bg-red-700 text-white"
                            >
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
                            <Save className="w-5 h-5" /> Atualizar Culto
                        </>
                    )}
                </Button>
            </motion.form>
        </motion.div>
    );
};

export default EditCulto;
