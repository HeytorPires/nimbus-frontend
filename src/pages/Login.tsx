import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/service/authService";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

type ErrorRequest = { AuthApiError: string; Error: boolean };

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | undefined>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // previne o comportamento padrão
    if (!email || !password) {
      setError("Preencha todos os dados");
    }
    try {
      const { data, error } = await authService.signIn(email, password);
      console.log(data);
      console.log(error);
      setError(error?.message);
      console.log(error);
    } catch (err: any) {
      setError(err);
    }
  };
  const toRegister = () => {
    navigate("/register");
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      {error !== "" && (
        <Alert variant="destructive" className="absolute w-48">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Erro</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <form
        className="flex flex-col justify-center items-center gap-4 p-4 w-96 "
        onSubmit={handleSubmit}
      >
        <h1 className="text-8xl">Taskly</h1>
        <p>Suas tarefas de maneira mais fácil</p>
        <h2 className="text-3xl">Entre</h2>
        <Input
          type="email"
          placeholder="Escreva seu email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} // atualiza o state
          required
        />
        <Input
          type="password"
          placeholder="Escreva sua senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // também atualiza
          required
        />
        <p className="text-[10px]">
          Não tem conta cadastrada? Clique{" "}
          <span
            className="text-blue-700 underline cursor-pointer"
            onClick={toRegister}
          >
            Aqui
          </span>
        </p>
        <Button className="cursor-pointer" type="submit">
          Entrar
        </Button>
      </form>
    </div>
  );
};

export default Login;
