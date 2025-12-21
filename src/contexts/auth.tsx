import { IUser } from "@/interfaces/IUser";
import { useAuthService } from "@/services/useAuthService";
import React, { createContext, useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

interface AuthContextType {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => void;
  setUser: (user: IUser | null) => void;
}

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const authService = useAuthService();
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  const signIn = async (email: string, password: string) => {
    try {
      const response = await authService.signIn(email, password);

      if (!response?.token || !response?.user) {
        throw new Error("Credenciais inválidas");
      }

      setToken(response.token);
      setUser(response.user);
      setIsAuth(true);
      localStorage.setItem("token", response.token);
      localStorage.setItem("user", JSON.stringify(response.user));
    } catch (error: any) {
      toast.error("Erro ao fazer login: " + error.message);
    }
  };

  const signOut = useCallback(() => {
    setToken(null);
    setUser(null);
    setIsAuth(false);

    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }, []);
  const bootstrapAuth = async () => {
    setLoading(true);
    try {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setIsAuth(true);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    bootstrapAuth();
  }, []);
  const isAuthenticated = isAuth;

  const value: AuthContextType = {
    user,
    token,
    loading,
    isAuthenticated,
    signIn,
    signOut,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
