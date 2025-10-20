import { motion } from 'framer-motion';
import { Lightbulb, Users, Heart, BookOpen, Clock, Calendar } from 'lucide-react';

// --- DADOS MOCKADOS (Valores da Igreja) ---
const VALORES_CENTRAIS = [
  { icon: Heart, title: 'Amor ao Próximo', description: 'Servimos e acolhemos a todos com a compaixão de Cristo, valorizando cada pessoa.' },
  { icon: BookOpen, title: 'Ensino da Palavra', description: 'Priorizamos o estudo profundo e prático da Bíblia como única regra de fé e conduta.' },
  { icon: Users, title: 'Comunhão Genuína', description: 'Incentivamos relacionamentos autênticos e transparentes em Pequenos Grupos (PGs).' },
  { icon: Lightbulb, title: 'Excelência e Serviço', description: 'Buscamos fazer tudo com excelência, dedicando nossos dons e talentos ao Reino.' },
];

const About = () => {
  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
      className="pt-[72px] min-h-screen bg-white text-zinc-900"
    >
      {/* HEADER */}
      <header className="bg-zinc-950 text-white py-16 px-6 text-center border-b border-zinc-800">
        <h1 className="text-5xl font-extrabold mb-3 tracking-tight">Conheça a Nossa História</h1>
        <p className="text-lg text-zinc-400 max-w-2xl mx-auto">
          Nossa missão, visão e os pilares que nos sustentam na caminhada da fé.
        </p>
      </header>

      {/* HISTÓRIA */}
      <section className="p-10 md:p-16 max-w-6xl mx-auto">
        <motion.h2
          variants={fadeInUp}
          className="text-4xl font-extrabold mb-12 text-center text-zinc-900"
        >
          Nossa Jornada de Fé
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-10 items-start">
          {/* Linha do Tempo */}
          <motion.div
            variants={fadeInUp}
            className="md:w-1/3 p-5 rounded-lg bg-zinc-50 border border-zinc-200"
          >
            <p className="text-sm text-zinc-600 mb-1 font-semibold uppercase">Fundada em</p>
            <p className="text-4xl font-bold text-black mb-8">2010</p>

            <p className="text-sm text-zinc-600 mb-2 font-semibold uppercase">Marcos</p>
            <ul className="space-y-2 text-sm text-zinc-700">
              <li className="flex items-center">
                <Calendar className="w-4 h-4 mr-2 text-zinc-500" /> 2012 — Início dos Pequenos Grupos
              </li>
              <li className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-zinc-500" /> 2015 — Compra do Auditório Principal
              </li>
              <li className="flex items-center">
                <BookOpen className="w-4 h-4 mr-2 text-zinc-500" /> 2020 — Projeto Missionário Global
              </li>
            </ul>
          </motion.div>

          {/* Texto da História */}
          <motion.div variants={fadeInUp} className="md:w-2/3 space-y-5">
            <p className="text-lg leading-relaxed text-zinc-700">
              A Igreja Batista Karismática nasceu do sonho de três famílias que desejavam ser uma luz
              em meio à comunidade. Em 2010, começamos com encontros simples em uma pequena sala alugada.
            </p>
            <p className="text-lg font-semibold leading-relaxed border-l-2 border-zinc-900 pl-4 text-zinc-900">
              Com o crescimento impulsionado pela paixão por missões e pelo ensino sólido da Palavra,
              tornamo-nos um ponto de encontro para aqueles que buscam uma fé autêntica e vibrante.
            </p>
            <p className="text-base leading-relaxed text-zinc-600">
              Hoje seguimos firmes, comprometidos em alcançar nossa cidade e o mundo com a mensagem
              transformadora de Jesus Cristo.
            </p>
          </motion.div>
        </div>
      </section>

      {/* MISSÃO E VISÃO */}
      <section className="bg-zinc-50 py-16 px-10 border-t border-b border-zinc-200">
        <motion.h2
          variants={fadeInUp}
          className="text-4xl font-extrabold mb-12 text-center text-zinc-900"
        >
          Missão e Visão
        </motion.h2>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <motion.div
            variants={fadeInUp}
            className="p-8 bg-white border border-zinc-200 rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <h3 className="text-3xl font-bold mb-3 text-zinc-900">Nossa Missão</h3>
            <p className="text-lg italic text-zinc-700 leading-relaxed">
              “Existimos para glorificar a Deus, transformando vidas através do evangelho, amando a Deus,
              amando o próximo e fazendo discípulos.”
            </p>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="p-8 bg-white border border-zinc-200 rounded-xl shadow-sm hover:shadow-md transition-all"
          >
            <h3 className="text-3xl font-bold mb-3 text-zinc-900">Nossa Visão</h3>
            <p className="text-lg italic text-zinc-700 leading-relaxed">
              “Ser uma igreja relevante e multiplicadora, que impacta a cidade e envia missionários,
              para que ninguém viva longe da verdade.”
            </p>
          </motion.div>
        </div>
      </section>

      {/* VALORES CENTRAIS */}
      <section className="p-10 md:p-16 max-w-7xl mx-auto">
        <motion.h2
          variants={fadeInUp}
          className="text-4xl font-extrabold mb-12 text-center text-zinc-900"
        >
          Nossos Valores Centrais
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {VALORES_CENTRAIS.map((valor, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              whileHover={{ y: -3 }}
              className="flex flex-col items-center text-center p-8 bg-white border border-zinc-200 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              <valor.icon className="h-10 w-10 mb-3 text-zinc-800" />
              <h3 className="text-xl font-bold mb-2 text-zinc-900">{valor.title}</h3>
              <p className="text-sm text-zinc-600">{valor.description}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default About;
