/* eslint-disable no-console */
// services/authService.ts
import { supabase } from "../lib/supabaseClient";

export const authService = {
  // Cadastro
  signUp: async (email: string, password: string, name: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: name,
        },
      },
    });
    console.log("SignUp Response:", data);
    console.error("SignUp Error:", error);
    return { data, error };
  },

  // Login
  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    console.log("SignIn Response:", data);
    console.error("SignIn Error:", error);
    console.log(error);
    return { data, error };
  },

  // Pegar usuário logado
  getUser: async () => {
    const { data, error } = await supabase.auth.getUser();
    console.log("GetUser:", data);
    return { data, error };
  },

  // Sair da conta
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("SignOut Error:", error);
    } else {
      console.log("User signed out!");
    }
    return error;
  },
};
