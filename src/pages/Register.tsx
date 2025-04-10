import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const toLogin = () => {
    navigate("/login");
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center items-center gap-4 p-4 w-96 ">
        <h1 className="text-8xl">Taskly</h1>
        <p>Sua tarefas de maneira mais fácil</p>
        <h2 className="text-5xl">Entre</h2>

        <Input type="text" placeholder="Escreva seu nome" />
        <Input type="email" placeholder="Escreva seu email" />
        <Input type="password" placeholder="Escreva sua senha" />
        <p className="text-[10px]">
          Já tem uma conta? Clique{" "}
          <span className="text-blue-700 underline" onClick={toLogin}>
            Aqui
          </span>
        </p>
        <Button type="submit">Cadastrar</Button>
      </div>
    </div>
  );
};

export default Register;
