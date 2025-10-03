import api from "../api/api";

export const authService = {
  // Cadastro
  signUp: async (email: string, password: string, name: string) => {
    try {
      const response = await api.post("/users", {
        email,
        password,
        name,
      });
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  // Login
  signIn: async (email: string, password: string) => {
    try {
      const response = await api.post("/sessions", {
        email,
        password,
      });
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  // Pegar usuário logado
  getUser: async (token: string) => {
    try {
      const response = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { data: response.data, error: null };
    } catch (error: any) {
      return { data: null, error: error.response?.data || error.message };
    }
  },

  // Sair da conta
  signOut: async () => {
    // Como o backend não tem endpoint de logout, apenas remova o token no frontend
    return null;
  },
};
