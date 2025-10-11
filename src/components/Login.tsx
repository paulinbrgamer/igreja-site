import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function Auth() {
  const [mode, setMode] = useState("login") // "login" | "register"

  const toggleMode = () => setMode(mode === "login" ? "register" : "login")

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={mode}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Card className="mx-auto max-w-sm w-[360px]  p-2 backdrop-blur-md bg-white/90 shadow-xl border border-zinc-200">
          <CardHeader className="space-y-1 pt-2 text-start">
            <CardTitle className="text-2xl font-bold text-zinc-800">
              {mode === "login" ? "Entrar" : "Criar conta"}
            </CardTitle>
            <CardDescription className="text-zinc-500">
              {mode === "login"
                ? "Acesse sua conta com email e senha"
                : "Preencha os dados para se registrar"}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form className="space-y-4">
              {/* Campo Nome (somente no modo registrar) */}
              {mode === "register" && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  <Label htmlFor="name">Nome completo</Label>
                  <Input id="name" type="text" placeholder="João Silva" required />
                </motion.div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="voce@email.com" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" placeholder="••••••••" required />
              </div>

              {/* Confirmar senha (somente no modo registrar) */}
              {mode === "register" && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2"
                >
                  <Label htmlFor="confirmPassword">Confirmar senha</Label>
                  <Input id="confirmPassword" type="password" placeholder="••••••••" required />
                </motion.div>
              )}

              <Button type="submit" className="w-full mt-4">
                {mode === "login" ? "Entrar" : "Registrar"}
              </Button>
            </form>

            {/* Alternar modo */}
            <div className="text-center mt-4 text-sm text-zinc-600">
              {mode === "login" ? (
                <>
                  Não tem uma conta?{" "}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Registrar
                  </button>
                </>
              ) : (
                <>
                  Já tem uma conta?{" "}
                  <button
                    type="button"
                    onClick={toggleMode}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Entrar
                  </button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
