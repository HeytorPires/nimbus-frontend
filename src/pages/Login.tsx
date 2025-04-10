import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const toRegister = () => {
    navigate("/register");
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col justify-center items-center gap-4 p-4 w-96 ">
        <h1 className="text-8xl">Taskly</h1>
        <p>Sua tarefas de maneira mais fácil</p>
        <h2 className="text-3xl">Entre</h2>
        <Input type="email" placeholder="Escreva seu email" />
        <Input type="password" placeholder="Escreva sua senha" />
        <p className="text-[10px]">
          Não tem conta cadastrada? Clique{" "}
          <span
            className="text-blue-700 underline cursor-pointer"
            onClick={toRegister}
          >
            Aqui
          </span>
        </p>
        <Button className="cursor-pointer">Entrar</Button>
      </div>
    </div>
  );
};

export default Login;
