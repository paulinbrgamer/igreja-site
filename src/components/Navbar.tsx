import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import icone_igreja from "../../public/icon-igreja.png"
const currentPageStyle = "border-b-2 border-white font-bold"; 

// Lista de links para evitar repetição de código
const NAV_LINKS = [
    { path: "/", label: "Início" },
    { path: "/about", label: "Sobre" },
    { path: "/events", label: "Eventos" },
    { path: "/contact", label: "Contato" },
    { path: "/live", label: "Ao Vivo" },
    { path: "/account", label: "Minha Conta" }
];

const Navbar = () => {
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false); 
    const navigate = useNavigate()
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <motion.nav
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="fixed top-0 left-0 w-full z-50 bg-zinc-900 text-white p-4 flex justify-between items-center shadow-2xl"
            >
                {/* Logo e Título */}
                <div className="flex items-center cursor-pointer" onClick={()=>navigate("/")}>
                    <img src={icone_igreja}alt="Logo da Igreja" className="h-10 mx-auto mr-2"/>
                    <h1 className="text-xl lg:text-2xl font-bold whitespace-nowrap">
                        Igreja Batista Karismática
                    </h1>
                </div>

                {/* 1. Menu DESKTOP (Mostrado em telas grandes: lg:flex) */}
                <div className="hidden lg:flex gap-5 items-center justify-center">
                    {NAV_LINKS.map((item) => (
                         <Link 
                            key={item.path} 
                            to={item.path} 
                            className={`hover:text-zinc-300 ${location.pathname === item.path ? currentPageStyle : ""}`}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                {/* 2. Botão HAMBURGER (Mostrado em mobile/tablet: lg:hidden) */}
                <button 
                    onClick={toggleMenu} 
                    className="lg:hidden p-2 focus:outline-none"
                    aria-label="Abrir Menu"
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </motion.nav>

            {/* 3. Menu MOBILE (Dropdown) - CORRIGIDO */}
            <motion.div
                initial={false}
                animate={isOpen ? "open" : "closed"}
                variants={{
                    open: { opacity: 1, height: "auto" },
                    closed: { opacity: 0, height: 0, transition: { duration: 0.3 } }
                }}
                // Aplicamos lg:hidden aqui também
                className="fixed top-[72px] w-full bg-zinc-800 text-white z-40 lg:hidden overflow-hidden shadow-lg"
            >
                <div className="flex flex-col items-start p-4 space-y-3">
                    {NAV_LINKS.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            onClick={toggleMenu} // Fecha o menu ao navegar
                            className={`w-full text-left py-2 px-2 transition duration-150 
                                        ${location.pathname === item.path 
                                            ? 'bg-zinc-700 font-bold border-l-4 border-white' 
                                            : 'hover:bg-zinc-700'}`
                                        }
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </motion.div>
        </>
    );
};

export default Navbar;