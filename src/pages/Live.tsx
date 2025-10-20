import { motion } from 'framer-motion';
import { Youtube, Wifi, RotateCw } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';

// --- DADOS MOCKADOS ---
const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@BatistaKarismaticaoficia'; // Substitua pelo seu @nome
const IS_LIVE_NOW = false; // Simula o status: true se estiver ao vivo, false caso contrário.

// --- COMPONENTE PRINCIPAL ---

const Live = () => {
    const [liveLink, setliveLink] = useState<string | null>(null)
    const fadeInUp = {
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 },
    };
    useEffect(() => {
        const fetchLink = async () => {
            const { data } = await supabase.from("youtube_connection").select("*").single()
            setliveLink(data.link_live)
        }
        fetchLink()
    }, [])

    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
            className="pt-[72px] min-h-screen bg-white text-zinc-900"
        >
            {/* HEADER DA PÁGINA (Preto e Branco) */}
            <div className="bg-zinc-900 text-white p-12 text-center border-b border-black">
                <h1 className="text-5xl font-extrabold mb-2">Culto Ao Vivo</h1>
                <p className="text-xl text-zinc-300">A Palavra de Deus direto na sua casa.</p>
            </div>

            {/* 1. SEÇÃO DE STATUS E PLAYER (Fundo de contraste) */}
            <section className="bg-zinc-100 p-10 md:p-16 text-zinc-900 border-t border-b border-zinc-200">

                {/* BANNER DE STATUS DO AO VIVO */}
                <motion.div
                    variants={fadeInUp}
                    className={`max-w-4xl mx-auto p-4 text-center mb-10 border-4 ${IS_LIVE_NOW ? 'bg-red-600 text-white border-red-800' : 'bg-zinc-50 text-zinc-800 border-zinc-300'}`}
                >
                    <div className='flex items-center justify-center font-extrabold text-2xl'>
                        <Wifi className={`h-6 w-6 mr-3 ${IS_LIVE_NOW ? 'text-white' : 'text-red-600'}`} />
                        {IS_LIVE_NOW ? 'ESTAMOS AO VIVO AGORA!' : 'Atualmente Fora do Ar'}
                    </div>
                    {!IS_LIVE_NOW && (
                        <p className='text-sm mt-1 text-zinc-600'>A próxima transmissão ocorrerá no horário do culto. Verifique a agenda.</p>
                    )}
                </motion.div>

                {/* PLAYER DE VÍDEO (Embed do YouTube) */}
                <motion.div
                    variants={fadeInUp}
                    className="max-w-4xl mx-auto aspect-video bg-zinc-800 shadow-xl border-4 border-black"
                >
                    <iframe
                        width="100%"
                        height="100%"
                        src={liveLink ? liveLink.replace("watch?v=", "embed/") : ""}
                        title="YouTube video player"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>

                </motion.div>

                <p className="text-center text-zinc-600 mt-4 max-w-4xl mx-auto">
                    Este player mostra a transmissão atual (se disponível) ou o último culto realizado.
                </p>
            </section>

            {/* 2. SEÇÃO: MAIS VÍDEOS E INSCRIÇÃO */}
            <section className="p-10 md:p-16 max-w-5xl mx-auto text-center">
                <motion.h2
                    variants={fadeInUp}
                    className="text-4xl font-extrabold mb-12 text-center text-zinc-900"
                >
                    Não perca nenhum culto!
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* CTA 1: Ver Todos os Vídeos */}
                    <motion.div variants={fadeInUp} className='p-6 border border-zinc-300 bg-zinc-50 shadow-sm'>
                        <RotateCw className="h-8 w-8 mb-3 text-black mx-auto" />
                        <h3 className="text-2xl font-bold mb-3">Cultos Anteriores</h3>
                        <p className='text-zinc-700 mb-4'>Assista a todos os sermões, estudos e eventos que já transmitimos.</p>
                        <a href={`${YOUTUBE_CHANNEL_URL}/videos`} target="_blank" rel="noopener noreferrer">
                            <Button variant="outline" className="border-black text-black hover:bg-zinc-200">
                                Ir para a Playlist
                            </Button>
                        </a>
                    </motion.div>

                    {/* CTA 2: Inscrever-se no Canal */}
                    <motion.div variants={fadeInUp} className='p-6 border border-zinc-300 bg-zinc-50 shadow-sm'>
                        <Youtube className="h-8 w-8 mb-3 text-red-600 mx-auto" />
                        <h3 className="text-2xl font-bold mb-3">Inscreva-se</h3>
                        <p className='text-zinc-700 mb-4'>Ative o sino para ser notificado sempre que entrarmos Ao Vivo!</p>
                        <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
                            <Button className="bg-red-600 hover:bg-red-700 text-white">
                                <Youtube className="h-5 w-5 mr-2" />
                                Acessar Canal
                            </Button>
                        </a>
                    </motion.div>
                </div>
            </section>

        </motion.div>
    );
};

export default Live;