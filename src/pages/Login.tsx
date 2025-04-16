import DecryptedText from "@/components/framer/framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/service/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // previne o comportamento padrão
    if (!email || !password) {
      toast.error("Preencha todos os dados");
    }
    try {
      const { data, error } = await authService.signIn(email, password);
      if (error) {
        toast.error(error.message);
        return;
      }
      console.log("Usuário logado com sucesso:", data);
      navigate("/home");
    } catch (err: any) {
      toast.error(err);
    }
  };
  const toRegister = () => {
    navigate("/register");
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center items-center gap-4 p-4 w-96">
        <form
          className="flex flex-col justify-center items-center gap-4 p-4 w-full"
          onSubmit={handleSubmit}
        >
          <h1 className="text-8xl">Taskly</h1>
          <DecryptedText
            text="Suas tarefas de maneira mais fácil"
            speed={50}
            maxIterations={50}
            animateOn="view"
            revealDirection="start"
            useOriginalCharsOnly={false}
            sequential={true}
          />
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
    </div>
  );
};

export default Login;
