import api from "@/api/api";
import { IUser } from "@/interfaces/IUser";
import {
  clearAuthCookies,
  getUserCookie,
  setUserCookie,
} from "@/lib/cookieUtils";
import { useAuthService } from "@/services/useAuthService";
import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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

  const setupInterceptor = useCallback(() => {
    if (interceptorId.current !== null) {
      api.interceptors.request.eject(interceptorId.current);
    }
    // Com cookies HttpOnly, o navegador envia automaticamente
    // Não precisamos adicionar o token ao header Authorization
    interceptorId.current = api.interceptors.request.use((config) => {
      return config;
    });
  }, []);

  const signOut = useCallback(async () => {
    await authService.signOut();
    setToken(null);
    setUser(null);
    setIsAuth(false);
    clearAuthCookies();

    if (interceptorId.current !== null) {
      api.interceptors.request.eject(interceptorId.current);
      interceptorId.current = null;
    }
  }, [authService]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await authService.signIn(email, password);

        if (!response?.user) {
          throw new Error("Invalid credentials");
        }

        // O token HttpOnly é gerenciado automaticamente pelo navegador
        // Apenas armazenamos o usuário e marcamos como autenticado
        setToken("authenticated"); // Marcador de autenticação
        setUser(response.user);
        setIsAuth(true);
        setupInterceptor();
        setUserCookie(response.user);
      } catch (error: any) {
        toast.error("Login error: " + error.message);
      }
    },
    [authService, setupInterceptor],
  );

  useEffect(() => {
    const storedUser = getUserCookie();

    if (storedUser) {
      // Se tem usuário armazenado, o token HttpOnly também deve estar presente
      setToken("authenticated");
      setUser(storedUser);
      setIsAuth(true);
      setupInterceptor();
    }

    setLoading(false);
  }, [setupInterceptor]);

  useEffect(() => {
    const id = api.interceptors.response.use(
      (response) => response,
      (error) => {
        const requestUrl = error?.config?.url || "";
        const isLoginRequest = requestUrl.includes("/sessions");

        if (error?.response?.status === 401 && !isLoginRequest) {
          signOut();
          toast.error("Your session has expired. Please log in again.");
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
