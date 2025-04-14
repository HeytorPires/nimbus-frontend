import { createContext, useEffect, useState, ReactNode } from "react";

// Interfaces e Tipos
interface User {
  email: string;
  password?: string;
}

interface AuthContextData {
  user: User | null;
  signed: boolean;
  signin: (email: string, password: string) => string | void;
  signup: (email: string, password: string) => string | void;
  signout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext<AuthContextData>({
  user: null,
  signed: false,
  signin: () => {},
  signup: () => {},
  signout: () => {},
});

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Carrega o usuário do localStorage ao montar o componente
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const signin = (email: string, password: string): string | void => {
    // Busca os usuários cadastrados no localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Procura por um usuário com o email fornecido
    const foundUser = users.find((u: User) => u.email === email);

    if (foundUser) {
      // Verifica se a senha está correta
      if (foundUser.password === password) {
        // Salva o usuário no localStorage e define o estado do usuário
        localStorage.setItem("user", JSON.stringify({ email }));
        setUser({ email });
      } else {
        return "Senha incorreta.";
      }
    } else {
      return "Usuário não encontrado.";
    }
  };

  const signup = (email: string, password: string): string | void => {
    // Busca os usuários cadastrados no localStorage
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // Verifica se já existe um usuário com o email fornecido
    if (users.find((u: User) => u.email === email)) {
      return "Email já cadastrado.";
    }

    // Adiciona o novo usuário à lista de usuários
    users.push({ email, password });

    // Salva a lista de usuários no localStorage
    localStorage.setItem("users", JSON.stringify(users));
  };

  const signout = () => {
    // Remove o usuário do localStorage e define o estado do usuário como nulo
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, signed: !!user, signin, signup, signout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
