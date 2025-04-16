import DecryptedText from "@/components/framer/framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authService } from "@/service/authService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // previne o comportamento padrão
    if (!email || !password) {
      toast.error("Preencha todos os dados");
    }
    try {
      const { data, error } = await authService.signUp(email, password);
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
  const toLogin = () => {
    navigate("/login");
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center items-center gap-4 p-4 w-96 ">
        <form
          className="flex flex-col justify-center items-center gap-4 p-4 w-96 "
          onSubmit={handleSubmit}
        >
          <h1 className="text-8xl">Taskly</h1>
          <DecryptedText
            text="Suas tarefas de maneira mais fácil"
            speed={75}
            animateOn="view"
          />
          <h2 className="text-3xl">Cadastre-se</h2>
          <Input
            type="text"
            placeholder="Escreva seu nome"
            value={name}
            onChange={(e) => setName(e.target.value)} // também atualiza
            required
          />
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
            já tem conta cadastrada? Clique{" "}
            <span
              className="text-blue-700 underline cursor-pointer"
              onClick={toLogin}
            >
              Aqui
            </span>
          </p>
          <Button className="cursor-pointer" type="submit">
            Cadastrar-se
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
