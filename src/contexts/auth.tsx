import { IUser } from "@/interfaces/IUser";
import { useAuthService } from "@/services/useAuthService";
import { isTokenExpired } from "@/lib/tokenUtils";
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";
import api from "@/api/api";

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
  {} as AuthContextType,
);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const authService = useAuthService();
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);
  const interceptorId = useRef<number | null>(null);

  const setupInterceptor = useCallback((currentToken: string) => {
    if (interceptorId.current !== null) {
      api.interceptors.request.eject(interceptorId.current);
    }
    interceptorId.current = api.interceptors.request.use((config) => {
      if (currentToken && !isTokenExpired(currentToken)) {
        config.headers.Authorization = `Bearer ${currentToken}`;
      }
      return config;
    });
  }, []);

  const signOut = useCallback(() => {
    setToken(null);
    setUser(null);
    setIsAuth(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    if (interceptorId.current !== null) {
      api.interceptors.request.eject(interceptorId.current);
      interceptorId.current = null;
    }
  }, []);

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await authService.signIn(email, password);

        if (!response?.token || !response?.user) {
          throw new Error("Credenciais inválidas");
        }

        setToken(response.token);
        setUser(response.user);
        setIsAuth(true);
        setupInterceptor(response.token);
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
      } catch (error: any) {
        toast.error("Erro ao fazer login: " + error.message);
      }
    },
    [authService, setupInterceptor],
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      if (isTokenExpired(storedToken)) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      } else {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
        setIsAuth(true);
        setupInterceptor(storedToken);
      }
    }

    setLoading(false);
  }, [setupInterceptor]);

  useEffect(() => {
    const id = api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 401) {
          signOut();
          toast.error("Sua sessão expirou. Faça login novamente.");
        }
        return Promise.reject(error);
      },
    );

    return () => {
      api.interceptors.response.eject(id);
    };
  }, [signOut]);

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      token,
      loading,
      isAuthenticated: isAuth,
      signIn,
      signOut,
      setUser,
    }),
    [user, token, loading, isAuth, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
