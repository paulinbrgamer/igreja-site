// src/App.jsx

import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.tsx"; // 👈 IMPORTAR O NOVO COMPONENTE
import routes from "./routes"; // Assume que este arquivo lista suas páginas
import ScrollToTop from "./components/ScrollToTop.tsx";

export default function App() {
  // Removido: const location = useLocation();
  // Removido: Toda a lógica da Navbar

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden"> 
      
      {/* 1. Renderiza a Navbar (que usa useLocation internamente) */}
      <Navbar /> 
      {/* 2. Conteúdo principal (rotas) */}
      <main className="flex-grow pt-[72px]">
      <ScrollToTop/>
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