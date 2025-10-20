import { motion } from 'framer-motion';
import { Phone, MapPin, Clock, MessageCircle, InstagramIcon, LucideYoutube } from 'lucide-react';
import { Button } from "@/components/ui/button";

const CONTACT_DATA = {
  address: 'Travessa Dom Pedro I, 290 Brasília, Cametá-PA',
  phones: [
    { label: 'Vivo', numbers: ['(91) 99356-0582', '(91) 99356-0592', '(91) 99356-6765'] },
    { label: 'Claro', numbers: ['(91) 98583-9909', '(91) 98547-0959', '(91) 98547-0961'] },
  ],
  whatsapp: '(91) 99353-9594',
  prayerCenter: 'A qualquer hora do dia, da noite, ou da madrugada, alguém preparado para te atender, te ouvir e orar forte por você!',
  social: [
    { name: 'Instagram', icon: InstagramIcon, url: 'https://www.instagram.com/batista_karismatica_oficial/' },
    { name: 'YouTube', icon: LucideYoutube, url: 'https://www.youtube.com/@BatistaKarismaticaoficia' },
  ],
};

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
      {/* HEADER */}
      <header className="bg-zinc-950 text-white py-16 px-6 text-center border-b border-zinc-800">
        <h1 className="text-5xl font-extrabold mb-3 tracking-tight">Fale Conosco</h1>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          Todas as formas de contato e endereço estão aqui.
        </p>
      </header>

      {/* CENTRAL DE ORAÇÃO */}
      <section className="bg-zinc-50 py-16 px-10 border-b border-zinc-200">
        <motion.div
          variants={fadeInUp}
          className="max-w-4xl mx-auto text-center bg-white border border-zinc-200 rounded-2xl shadow-sm p-10 hover:shadow-md transition"
        >
          <Clock className="h-10 w-10 mx-auto mb-4 text-zinc-800" />
          <h2 className="text-4xl font-extrabold mb-4 text-zinc-900">Central de Oração</h2>
          <p className="text-lg text-zinc-700 leading-relaxed max-w-2xl mx-auto">
            {CONTACT_DATA.prayerCenter}
          </p>
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="mt-6 bg-zinc-900 hover:bg-zinc-800 text-white shadow-sm">
              <MessageCircle className="w-5 h-5 mr-2" />
              Chamar no WhatsApp Agora
            </Button>
          </a>
        </motion.div>
      </section>

      {/* ENDEREÇO E TELEFONES */}
      <section className="py-16 px-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* ENDEREÇO */}
        <motion.div
          variants={fadeInUp}
          className="p-8 bg-white border border-zinc-200 rounded-xl shadow-sm hover:shadow-md transition"
        >
          <MapPin className="h-8 w-8 mb-3 text-zinc-800" />
          <h3 className="text-2xl font-bold mb-3 text-zinc-900">Nosso Endereço</h3>
          <p className="text-lg font-semibold mb-2 text-zinc-800">Igreja Batista Karismática</p>
          <p className="text-base text-zinc-600 leading-relaxed">{CONTACT_DATA.address}</p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONTACT_DATA.address)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" className="mt-5 border-zinc-800 text-zinc-900 hover:bg-zinc-100">
              Ver no Mapa
            </Button>
          </a>
        </motion.div>

        {/* TELEFONES */}
        <motion.div
          variants={fadeInUp}
          className="lg:col-span-2 p-8 bg-white border border-zinc-200 rounded-xl shadow-sm hover:shadow-md transition"
        >
          <Phone className="h-8 w-8 mb-3 text-zinc-800" />
          <h3 className="text-2xl font-bold mb-6 text-zinc-900">Telefones para Contato</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {CONTACT_DATA.phones.map((carrier, index) => (
              <div key={index} className="border-l-2 border-zinc-800 pl-4">
                <p className="text-xl font-bold mb-2 text-zinc-900">{carrier.label}</p>
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

          {/* WHATSAPP */}
          <div className="mt-10 pt-6 border-t border-zinc-200">
            <h4 className="text-xl font-bold mb-2 text-zinc-900 flex items-center">
              <MessageCircle className="w-5 h-5 mr-2 text-green-600" /> WhatsApp (Dúvidas/Geral)
            </h4>
            <p className="text-2xl font-extrabold text-green-600">{CONTACT_DATA.whatsapp}</p>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <Button className="mt-3 bg-green-600 hover:bg-green-700 text-white shadow-sm">
                Chamar Agora
              </Button>
            </a>
          </div>
        </motion.div>
      </section>

      {/* REDES SOCIAIS */}
      <section className="py-16 px-10 bg-zinc-50 border-t border-zinc-200">
        <motion.h2
          variants={fadeInUp}
          className="text-4xl font-extrabold mb-10 text-center text-zinc-900"
        >
          Siga-nos nas Redes
        </motion.h2>

        <div className="flex justify-center gap-16 flex-wrap">
          {CONTACT_DATA.social.map((media, index) => (
            <motion.a
              key={index}
              variants={fadeInUp}
              href={media.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center group transition-transform hover:scale-105"
            >
              <media.icon className="h-14 w-14 mb-3 text-zinc-800 group-hover:text-zinc-600 transition" />
              <span className="text-lg font-semibold text-zinc-700">{media.name}</span>
            </motion.a>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
