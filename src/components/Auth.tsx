import { motion, AnimatePresence } from "framer-motion"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/authStore"
import { useState } from "react"

export default function Auth() {
  const { login } = useAuthStore();
  const [loginFail, setloginFail] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;
    try {
      await login(email, password);

    } catch (err) {
      if ((err as {code : string, message : string}).code === "invalid_credentials") {
        setloginFail("Senha ou email errados...");
      }
    }
  }
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        <Card className="mx-auto max-w-sm w-[360px]  backdrop-blur-md bg-white/90 shadow-xl border border-zinc-200">
          <CardHeader className="space-y-1 pt-2 text-start">
            <img src="/public/icone-igreja-white.png" title="icone-igreja" className="w-40 m-auto mb-6" />
            <CardTitle className="text-2xl font-bold text-zinc-800">
              Entrar
            </CardTitle>
            <CardDescription className="text-zinc-500">
              Acesse sua conta com email e senha
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="voce@email.com" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <Input id="password" type="password" placeholder="••••••••" required />
              </div>
              <span className="text-red-500 ">{loginFail}</span>
              <Button type="submit" className="w-full mt-6 cursor-pointer">
                Entrar
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}
