import { create } from "zustand";
import { persist } from "zustand/middleware";
import { supabase } from "../lib/supabaseClient";
import type { Session, User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  init: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      session: null,
      loading: true,

      // Inicializa sessão
      init: async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        set({ session, user: session?.user ?? null, loading: false });

        // Escuta mudanças (login/logout)
        supabase.auth.onAuthStateChange((_event, session) => {
          set({ session, user: session?.user ?? null });
        });
      },

      // Login
      login: async (email, password) => {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        set({ user: data.user, session: data.session });
      },

      // Cadastro
      signup: async (email, password) => {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        set({ user: data.user, session: data.session });
      },

      // Logout
      logout: async () => {
        await supabase.auth.signOut();
        set({ user: null, session: null });
      },
    }),
    {
      name: "auth-storage", // salva no localStorage
      partialize: (state) => ({
        user: state.user,
        session: state.session,
      }),
    }
  )
);
