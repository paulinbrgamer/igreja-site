import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, MessageCircle, InstagramIcon,  LucideYoutube } from 'lucide-react';
import { Button } from "@/components/ui/button";

// --- DADOS REAIS DO CARTAZ ---
const CONTACT_DATA = {
    address: 'RUA CORONEL RAIMUNDO LEÃO N° 1518 - BRASÍLIA, *ANTIGO MILÊNIO - CAMETÁ/PA',
    phones: [
        { label: 'Vivo', numbers: ['(91) 99356-0582', '(91) 99356-0592', '(91) 99356-6765'] },
        { label: 'Claro', numbers: ['(91) 98583-9909', '(91) 98547-0959', '(91) 98547-0961'] },
    ],
    whatsapp: '(91) 99353-9594',
    prayerCenter: 'A qualquer hora do dia, da noite, ou da madrugada, alguém preparado para te atender, te ouvir, e orar forte por você!',
    social: [
        { name: 'Instagram', icon: InstagramIcon, url: 'https://www.instagram.com/suaigreja/' },
        { name: 'YouTube', icon: LucideYoutube, url: 'https://www.youtube.com/suaigreja' },
        // Adicione outras mídias se necessário, como Facebook, etc.
    ]
};

// --- COMPONENTE PRINCIPAL ---

const Contact = () => {
  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  const whatsappLink = `https://wa.me/55${CONTACT_DATA.whatsapp.replace(/\D/g, '')}`;

  return (
    <motion.div 
        initial="initial"
        animate="animate"
        variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
        className="pt-[72px] min-h-screen bg-white text-zinc-900" 
    >
      {/* HEADER DA PÁGINA (Preto e Branco para Alto Contraste) */}
      <div className="bg-zinc-900 text-white p-12 text-center border-b border-black">
        <h1 className="text-5xl font-extrabold mb-2">Fale Conosco</h1>
        <p className="text-xl text-zinc-300">Todas as formas de contato e endereço estão aqui.</p>
      </div>

      {/* 1. SEÇÃO: CENTRAL DE ORAÇÃO (Destaque Principal) */}
      <section className="bg-zinc-100 p-10 md:p-16 text-zinc-900 border-t border-b border-zinc-200"> 
        <motion.div variants={fadeInUp} className="max-w-4xl mx-auto text-center p-8 bg-white shadow-xl border-t-4 border-black">
            <Clock className="h-10 w-10 mx-auto mb-4 text-black" />
            <h2 className="text-4xl font-extrabold mb-4 text-zinc-900">CENTRAL DE ORAÇÃO</h2>
            <p className="text-xl italic text-zinc-700 leading-relaxed max-w-2xl mx-auto">
                {CONTACT_DATA.prayerCenter}
            </p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="mt-6 inline-block">
                <Button size="lg" className="bg-black hover:bg-zinc-700 text-white shadow-md">
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Chamar no WhatsApp Agora
                </Button>
            </a>
        </motion.div>
      </section>
      
      {/* 2. SEÇÃO: TELEFONES E ENDEREÇO */}
      <section className="p-10 md:p-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Endereço */}
        <motion.div variants={fadeInUp} className="lg:col-span-1 p-6 border border-zinc-300 bg-zinc-50 shadow-sm">
            <MapPin className="h-8 w-8 mb-3 text-black" />
            <h3 className="text-2xl font-bold mb-2 border-b pb-1 border-zinc-300">Nosso Endereço</h3>
            <p className="text-lg font-semibold mb-2">Igreja Batista Karismática</p>
            <p className="text-base text-zinc-700 leading-relaxed">{CONTACT_DATA.address}</p>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT_DATA.address)}`} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="mt-4 border-black text-black hover:bg-zinc-200">Ver no Mapa</Button>
            </a>
        </motion.div>

        {/* Telefones */}
        <motion.div variants={fadeInUp} className="lg:col-span-2 p-6 border border-zinc-300 bg-zinc-50 shadow-sm">
            <Phone className="h-8 w-8 mb-3 text-black" />
            <h3 className="text-2xl font-bold mb-4 border-b pb-1 border-zinc-300">Telefones para Contato</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {CONTACT_DATA.phones.map((carrier, index) => (
                    <div key={index} className="border-l-4 border-black pl-4">
                        <p className="text-xl font-extrabold mb-2 text-black">{carrier.label}:</p>
                        <ul className="space-y-1">
                            {carrier.numbers.map((number, idx) => (
                                <li key={idx} className="text-lg text-zinc-700">
                                    <a href={`tel:${number.replace(/\D/g, '')}`} className="hover:underline">
                                        {number}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            
            {/* WhatsApp */}
            <div className="mt-8 pt-4 border-t border-zinc-300">
                <h4 className="text-xl font-extrabold mb-1 text-black flex items-center">
                    <MessageCircle className="w-6 h-6 mr-2 text-black"/> WhatsApp (Dúvidas/Geral)
                </h4>
                <p className="text-2xl font-extrabold text-green-600">
                    {CONTACT_DATA.whatsapp}
                </p>
                <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
                    <Button className="mt-3 bg-green-600 hover:bg-green-700 text-white">Chamar Agora</Button>
                </a>
            </div>
        </motion.div>
      </section>

      {/* 3. SEÇÃO: MÍDIAS SOCIAIS */}
      <section className="p-10 md:p-16 max-w-7xl mx-auto text-center">
        <motion.h2 
            variants={fadeInUp} 
            className="text-4xl font-extrabold mb-12 text-center text-zinc-900 border-b-2 border-zinc-300 inline-block px-4 pb-2"
        >
            Siga-nos nas Redes
        </motion.h2>

        <div className="flex justify-center gap-12">
            {CONTACT_DATA.social.map((media, index) => (
                <motion.a 
                    key={index}
                    variants={fadeInUp}
                    href={media.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center group transition transform hover:scale-105"
                >
                    <media.icon className="h-16 w-16 mb-2 text-black group-hover:text-zinc-600 transition" />
                    <span className="text-lg font-semibold text-zinc-700">{media.name}</span>
                </motion.a>
            ))}
        </div>
      </section>

    </motion.div>
  );
};

export default Contact;