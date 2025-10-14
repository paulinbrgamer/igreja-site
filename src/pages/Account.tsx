import { useEffect } from "react";
import { motion } from "framer-motion";
import Auth from "@/components/Auth";
import { useAuthStore } from "@/store/authStore";
import { AdminDashboard } from "@/components/AdminDashboard";

const Account = () => {
  const { session, user, init, loading, logout } = useAuthStore();

  useEffect(() => {
    init();
  }, [init]);

  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-black text-white">
        Carregando...
      </div>
    );
  }
  
  // Define o estado de login
  const isAuthenticated = session && user;

  // 1. Classes do Contêiner Principal
  // Se logado: Usa min-h-screen (permite rolagem) e largura total (w-full).
  // Se deslogado: Usa h-screen e classes de centralização para o login.
  const containerClasses = isAuthenticated
    ? "relative w-full min-h-screen" 
    : "relative h-screen w-[100dvw] bg-cover bg-center flex items-center justify-center";

  // 2. Classes do Conteúdo Principal (dentro do overlay)
  // Se logado: Ocupa toda a largura, sem centralização forçada.
  // Se deslogado: Mantém a centralização.
  const contentClasses = isAuthenticated
    ? "relative z-10 w-full min-h-screen"
    : "relative z-10 flex items-center justify-center w-full";


  return (
    <motion.div
      className={containerClasses} // Aplica as classes dinâmicas
      style={!isAuthenticated ? { backgroundImage: "url('/background-login.jpg')" } : {}} // Aplica o BG apenas no login
    >
      {/* Overlay - Presente apenas no modo LOGIN */}
      {!isAuthenticated && <div className="absolute inset-0 bg-black/75 backdrop-blur-[1px] z-0" />}

      {/* Conteúdo (AdminDashboard ou Auth) */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className={contentClasses} // Aplica as classes dinâmicas
      >
        {isAuthenticated ? (
          // O AdminDashboard agora renderiza sem restrições de altura e centralização do pai
          <AdminDashboard  userEmail={user.email ?? "Usuário"} onLogout={logout} />
        ) : (
          <Auth />
        )}
      </motion.div>
    </motion.div>
  );
};

export default Account;