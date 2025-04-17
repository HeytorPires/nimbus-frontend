import React, { createContext, useState, useEffect } from "react";
// Importa o serviço de autenticação, que provavelmente contém as chamadas para a API de autenticação (como cadastro, login, logout)
import { authService } from "../service/authService";
// Importa a instância configurada do cliente Supabase. Isso permite interagir com o banco de dados e os serviços do Supabase.
import { supabase } from "../lib/supabaseClient"; // Importe diretamente o supabase
// Importa os tipos `Session` e `User` da biblioteca do Supabase. Esses tipos definem a estrutura dos objetos que representam a sessão do usuário e as informações do usuário.
import { Session, User } from "@supabase/supabase-js";
// Define a interface `AuthContextType` que especifica os tipos dos valores que serão disponibilizados pelo Context de Autenticação.
interface AuthContextType {
  user: User | null; // Representa as informações do usuário autenticado. Pode ser um objeto `User` ou `null` caso o usuário não esteja autenticado.
  session: Session | null; // Representa a sessão atual do usuário, contendo tokens de acesso e outras informações relacionadas à autenticação. Pode ser um objeto `Session` ou `null`.
  loading: boolean; // Indica se uma operação assíncrona (como login, cadastro, verificação inicial) está em andamento. `true` durante a operação e `false` após a conclusão.
  error: string | null; // Armazena qualquer mensagem de erro que ocorra durante as operações de autenticação. É `null` se não houver erros.
  signUp: (email: string, password: string, name: string) => Promise<void>; // Função assíncrona para registrar um novo usuário. Recebe o email, a senha e o nome do usuário como argumentos e retorna uma Promise que resolve quando o registro é bem-sucedido.
  signIn: (email: string, password: string) => Promise<void>; // Função assíncrona para fazer login de um usuário existente. Recebe o email e a senha como argumentos e retorna uma Promise que resolve quando o login é bem-sucedido.
  signOut: () => Promise<void>; // Função assíncrona para fazer logout do usuário atual. Retorna uma Promise que resolve quando o logout é bem-sucedido.
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
}

// Cria um Contexto React chamado `AuthContext`. Este contexto irá armazenar e fornecer os valores definidos em `AuthContextType` para os componentes que o consumirem.
// O `<AuthContextType | undefined>` indica que o valor inicial do contexto pode ser `undefined`.
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// Cria um Componente Funcional React chamado `AuthProvider`. Este componente atuará como um "provedor" do Contexto de Autenticação.
// Ele envolve outros componentes (`children`) e disponibiliza os valores de autenticação para eles.
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data, error } = await authService.getUser();
      // Se houver dados de usuário, atualiza o estado `user`.
      if (data?.user) {
        setUser(data.user);
      }
      // Se houver um erro, armazena a mensagem de erro no estado `error`.
      setError(error?.message || null);
      // Define o estado de carregamento como `false` após a conclusão da chamada à API.
      setLoading(false);
    };

    // Chama a função `fetchUser` para buscar as informações do usuário na inicialização.
    fetchUser();

    // Configura um listener para eventos de mudança no estado de autenticação do Supabase.
    // `supabase.auth.onAuthStateChange` retorna um objeto com uma propriedade `data` que contém a subscription (assinatura) do evento.
    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        // Quando o estado de autenticação muda (login, logout, troca de sessão), atualiza o estado `session`.
        setSession(session);
        // Atualiza o estado `user` com as informações do usuário da nova sessão (ou `null` se não houver sessão).
        setUser(session?.user || null);
      }
    );

    // Retorna uma função de limpeza (cleanup function). Esta função será executada quando o componente for desmontado ou antes do próximo efeito ser executado.
    // Aqui, ela cancela a subscription do listener de `onAuthStateChange` para evitar vazamentos de memória.
    return () => subscription.subscription?.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    setLoading(true);
    setError(null);
    // Chama o serviço de autenticação para realizar o registro.
    const { data, error } = await authService.signUp(email, password, name);
    // Se o registro for bem-sucedido e houver dados de usuário, atualiza os estados `user` e `session` e navega para a página inicial (`/home`).
    if (data?.user) {
      setUser(data.user);
      setSession(data.session);
    } else if (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    setError(null);
    const { data, error } = await authService.signIn(email, password);
    // Se o login for bem-sucedido e houver dados de usuário, atualiza os estados `user` e `session` e navega para a página inicial (`/home`).
    if (data?.user) {
      setUser(data.user);
      setSession(data.session);
    } else if (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  const signOut = async () => {
    setLoading(true);
    setError(null);
    const error = await authService.signOut();
    if (!error) {
      setUser(null);
      setSession(null);
    } else {
      setError(error?.message || "Erro ao fazer logout."); // Garante que haja uma mensagem de erro.
    }
    setLoading(false);
  };

  // Cria um objeto `value` que contém todos os valores que serão fornecidos pelo Contexto de Autenticação.
  const value = {
    user,
    setUser,
    setSession,
    session,
    loading,
    error,
    signUp,
    signIn,
    signOut,
  };

  // Retorna o `AuthProvider`. O `AuthContext.Provider` envolve os `children` (os componentes que estão dentro do `AuthProvider` na árvore de componentes) e torna os valores definidos em `value` acessíveis a eles através do `AuthContext`.
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
