import { Routes, Route, Link,useLocation } from "react-router-dom";
import { Button } from "./components/ui/button";
import { motion } from 'framer-motion';
import routes from "./routes";

export default function App() {
  const currentPageStyle = "border-b-2 border-white";
  const location = useLocation(); // 👈 Hook do Router

  return (
    <div className="flex flex-col min-h-screen"> 
    
      {/* Navbar simples */}
      <motion.nav
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 w-full z-50 bg-zinc-900 text-white p-4 flex justify-between items-center shadow-2xl"
      >
        <div className="sticky flex flex-row-reverse gap-2 items-center mr-8">
          <h1 className="text-2xl font-bold">Igreja Batista Karismática</h1>
          <img src="../public/icon-igreja.png" alt="Logo da Igreja" className="h-10 mt-2 mx-auto"/>
        </div>
        <div className="flex gap-5 items-center justify-center">
          <Link to="/" className={`hover:text-zinc-300 ${location.pathname === "/" ? currentPageStyle : ""}`}>Início</Link>
          <Link to="/about" className={`hover:text-zinc-300 ${location.pathname === "/about" ? currentPageStyle : ""}`}>Sobre</Link>
          <Link to="/events" className={`hover:text-zinc-300 ${location.pathname === "/events" ? currentPageStyle : ""}`}>Eventos</Link>
          <Link to="/contact" className={`hover:text-zinc-300 ${location.pathname === "/contact" ? currentPageStyle : ""}`}>Contato</Link>
          <Link to="/live" className={`hover:text-zinc-300 ${location.pathname === "/live" ? currentPageStyle : ""}`}>Ao Vivo</Link>
          <Link to="/account" className={`hover:text-zinc-300 ${location.pathname === "/account" ? currentPageStyle : ""}`}>Minha Conta</Link>
        </div>
      </motion.nav>

      {/* Conteúdo principal (rotas) */}
      {/* 2. Adicionei um padding superior para compensar a altura da navbar fixa */}
      <main className="flex-grow pt-[72px]"> {/* Ajuste 'pt-[72px]' conforme a altura real da sua nav */}
        <Routes>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Routes>
      </main>

      {/* Footer */}
      <footer className="bg-zinc-800 text-white text-center p-4">
        © {new Date().getFullYear()} Igreja Batista Karismática. Todos os direitos reservados.
      </footer>
    </div>
  );
}