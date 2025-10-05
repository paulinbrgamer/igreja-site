import { motion } from 'framer-motion';
import { Lightbulb, Users, Heart, BookOpen, Clock, Calendar } from 'lucide-react';

// --- DADOS MOCKADOS (Valores da Igreja) ---
const VALORES_CENTRAIS = [
  { icon: Heart, title: 'Amor ao Próximo', description: 'Servimos e acolhemos a todos com a compaixão de Cristo, valorizando cada pessoa.' },
  { icon: BookOpen, title: 'Ensino da Palavra', description: 'Priorizamos o estudo profundo e prático da Bíblia como única regra de fé e conduta.' },
  { icon: Users, title: 'Comunhão Genuína', description: 'Incentivamos relacionamentos autênticos e transparentes em Pequenos Grupos (PGs).' },
  { icon: Lightbulb, title: 'Excelência e Serviço', description: 'Buscamos fazer tudo com excelência, dedicando nossos dons e talentos ao Reino.' },
];

// --- COMPONENTE PRINCIPAL ---

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
      {/* HEADER DA PÁGINA (Preto e Branco com Borda Suave) */}
      <div className="bg-zinc-900 text-white p-12 text-center border-b border-zinc-700">
        <h1 className="text-5xl font-extrabold mb-2">Conheça a Nossa História</h1>
        <p className="text-xl text-zinc-300">Nossa missão, visão e os pilares que nos sustentam.</p>
      </div>

      {/* 1. SEÇÃO: NOSSA HISTÓRIA E ORIGEM (Fundo Branco) */}
      <section className="p-10 md:p-16 max-w-5xl mx-auto">
        <motion.h2 
            variants={fadeInUp} 
            // Título simples, sem sublinhado ou bordas
            className="text-4xl font-extrabold mb-12 text-center text-zinc-900" 
        >
            Nossa Jornada de Fé
        </motion.h2>
        
        <div className="flex flex-col md:flex-row gap-10 items-start">
            {/* Linha do Tempo Fictícia - Linha de separação mais suave */}
            <motion.div variants={fadeInUp} className="md:w-1/3 p-4 border-r border-zinc-300">
                <p className="text-sm text-zinc-600 mb-2 font-semibold">Fundada em:</p>
                <p className="text-3xl font-extrabold text-black mb-6">2010</p>
                <p className="text-sm text-zinc-600 mb-2 font-semibold">Marcos:</p>
                <ul className="list-none space-y-2 text-sm text-zinc-700">
                    <li className="flex items-center"><Calendar className="w-4 h-4 mr-2 text-zinc-500"/> 2012: Início dos Pequenos Grupos.</li>
                    <li className="flex items-center"><Clock className="w-4 h-4 mr-2 text-zinc-500"/> 2015: Compra do Auditório Principal.</li>
                    <li className="flex items-center"><BookOpen className="w-4 h-4 mr-2 text-zinc-500"/> 2020: Lançamento do Projeto Missionário Global.</li>
                </ul>
            </motion.div>

            {/* Texto da História */}
            <motion.div variants={fadeInUp} className="md:w-2/3">
                <p className="text-lg mb-4 leading-relaxed text-zinc-700">
                    A Igreja Batista Karismática nasceu de um sonho no coração de três famílias com o desejo simples: ser uma luz na comunidade. Em 2010, começamos nos reunindo em uma pequena sala alugada.
                </p>
                <p className="text-lg mb-4 leading-relaxed font-semibold text-zinc-800 border-l-2 border-zinc-900 pl-4"> 
                    {/* Borda lateral mais fina */}
                    Com o crescimento impulsionado pela paixão por missões e pelo ensino sólido da Bíblia, rapidamente nos tornamos um ponto de encontro para aqueles que buscavam uma fé autêntica e vibrante.
                </p>
                <p className="text-base leading-relaxed text-zinc-600">
                    Hoje, continuamos fiéis à nossa origem, focados em alcançar nossa cidade e o mundo com a mensagem transformadora de Jesus, mantendo a comunhão como nosso alicerce.
                </p>
            </motion.div>
        </div>
      </section>

      {/* 2. SEÇÃO: MISSÃO E VISÃO (Fundo de contraste suave) */}
      <section className="bg-zinc-100 p-10 md:p-16 text-zinc-900 border-t border-b border-zinc-200"> 
        <motion.h2 
            variants={fadeInUp} 
            className="text-4xl font-extrabold mb-10 text-center text-zinc-900"
        >
            Missão e Visão
        </motion.h2>

        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* MISSÃO */}
            <motion.div variants={fadeInUp} className="p-6 border border-zinc-300 bg-white shadow-sm">
                <h3 className="text-3xl font-bold mb-3 border-b border-zinc-300 pb-2">Nossa Missão</h3>
                <p className="text-xl italic text-zinc-700">
                    "Existimos para glorificar a Deus, transformando vidas através do evangelho, amando a Deus, amando o próximo e fazendo discípulos."
                </p>
            </motion.div>

            {/* VISÃO */}
            <motion.div variants={fadeInUp} className="p-6 border border-zinc-300 bg-white shadow-sm">
                <h3 className="text-3xl font-bold mb-3 border-b border-zinc-300 pb-2">Nossa Visão</h3>
                <p className="text-xl italic text-zinc-700">
                    "Ser uma igreja relevante e multiplicadora, que impacta a cidade e envia missionários, para que ninguém viva longe da verdade."
                </p>
            </motion.div>
        </div>
      </section>

      {/* 3. SEÇÃO: VALORES CENTRAIS (Fundo Branco) */}
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
                    // Card com sombra e ícone em destaque, sem borda grossa
                    className="flex flex-col items-center text-center p-6 bg-white transition-shadow shadow-md hover:shadow-lg border-t-2 border-zinc-900"
                >
                    <valor.icon className="h-10 w-10 mb-3 text-zinc-900" />
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