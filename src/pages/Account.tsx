import Login from '@/components/Login'
import { motion } from 'framer-motion'
motion
const Account = () => {
  const fadeInUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 },
  };
  return (
    <motion.div
      className="relative h-screen w-[100dvw] bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: "url('/background-login.jpg')" }}
    >
      {/* Overlay corrigido */}
      <div className="absolute inset-0 bg-black/75 backdrop-blur-[1px] z-0" />

      {/* Conteúdo (Login) centralizado e acima do overlay */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeInUp}
        className="relative z-10 flex items-center justify-center w-full">
        <Login />
      </motion.div>
    </motion.div>
  )
}

export default Account
