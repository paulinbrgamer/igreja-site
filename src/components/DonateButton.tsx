import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bird, Copy, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import QR_CODE_URL from "../../public/qrcode-donate.jpeg"
const PIX_KEY = "ibkcora@gmail.com"; // sua chave PIX

export default function DonateButton() {
  const [open, setOpen] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(PIX_KEY);
    toast.success("Chave PIX copiada!");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Botão principal */}
      <motion.div whileHover={{ scale: 1.05 }}>
        <Button
          size="lg"
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-full shadow-xl bg-primary hover:bg-primary/90 text-white flex items-center gap-2"
        >
          <Bird className="w-5 h-5" />
          Doar
        </Button>
      </motion.div>

      {/* Painel de expansão */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="mt-3 bg-slate-400 backdrop-blur-lg border border-white/20 rounded-2xl shadow-2xl p-4 w-72 text-center text-white"
          >
            {/* Botão de fechar */}
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 text-white/70 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-lg font-semibold mb-3">Ajude nossa missão 💖</h3>

            {/* QR Code */}
            <img
              src={QR_CODE_URL}
              alt="QR Code PIX"
              className="w-40 h-40 mx-auto rounded-lg border border-white/20 mb-4"
            />

            {/* Chave PIX */}
            <div className="bg-white/20 rounded-lg p-2 flex items-center justify-between gap-2 text-sm">
              <span className="truncate">{PIX_KEY}</span>
              <Button
                variant="secondary"
                size="icon"
                onClick={handleCopy}
                className="bg-white/30 hover:bg-white/40"
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
