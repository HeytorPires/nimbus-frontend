import Particles from "@/components/background/particules";
import DecryptedText from "@/components/framer/framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const { user, signIn, error } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // previne o comportamento padrão
    if (!email || !password) {
      toast.error("Preencha todos os dados");
    }
    try {
      await signIn(email, password);
      if (error) {
        toast.error(error);
        return;
      }
      toast("Success");
      navigate("/home");
    } catch (err: any) {
      toast.error(err);
    }
  };
  //trocar de aba
  const toRegister = () => {
    navigate("/register");
  };

  //caso estiver logado, ir para o home direto
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);
  return (
    <>
      <div className="flex justify-center items-center min-h-screen relative overflow-hidden ">
        {" "}
        {/* Adicionado relative e overflow-hidden */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 0,
          }}
        >
          {" "}
          <Particles
            particleColors={["#000000 ", "#000000 "]}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={false}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-4 p-4 w-96 z-10">
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
    </>
  );
};

export default Login;
