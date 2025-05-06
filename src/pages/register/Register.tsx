import Particles from "@/components/background/particules";
import DecryptedText from "@/components/framer/framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/service/authService";
import { toast } from "sonner";

const Register = () => {
  const { user, setUser, setSession } = useAuth();
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // previne o comportamento padrão
    if (!email || !password || !name) {
      toast.error("Preencha todos os dados");
      return;
    }
    try {
      const { data, error } = await authService.signUp(email, password, name);
      if (error) {
        toast.error(error.message);
        return;
      }
      setUser(data.user);
      setSession(data.session);
      toast("Success");
      navigate("/home");
    } catch (err: any) {
      toast.error(err || "Erro ao registrar");
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);
  return (
    <>
      <div className="flex justify-center items-center min-h-screen relative overflow-hidden w-full">
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
              text="Your tasks made easier"
              speed={50}
              maxIterations={50}
              animateOn="view"
              revealDirection="start"
              useOriginalCharsOnly={false}
              sequential={true}
            />
            {/* <h2 className="text-3xl">Cadastre-se</h2> */}
            <Input
              type="text"
              placeholder="Write your name"
              value={name}
              onChange={(e) => setName(e.target.value)} // também atualiza
              required
            />
            <Input
              type="email"
              placeholder="Write your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // atualiza o state
              required
            />
            <Input
              type="password"
              placeholder="Write your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // também atualiza
              required
            />
            <p className="text-[10px]">
              You already have an account? Click{" "}
              <span
                className="text-blue-700 underline cursor-pointer"
                onClick={() => navigate("/login")}
              >
                here
              </span>
            </p>
            <Button className="cursor-pointer" type="submit">
              Cadastrar-se
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
