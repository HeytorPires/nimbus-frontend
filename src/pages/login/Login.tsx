import Particles from "@/components/background/particules";
import DecryptedText from "@/components/framer/framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/service/authService";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setSession, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // previne o comportamento padrão
    if (!email || !password) {
      toast.error("Preencha todos os dados");
      return;
    }
    // console.log(error);
    try {
      const { data, error } = await authService.signIn(email, password);
      if (error !== null) {
        toast.error(error.message);
        return;
      }
      setUser(data.user);
      setSession(data.session);
      toast("Success");
      setTimeout(() => {
        navigate("/home");
      }, 5);
    } catch (err: any) {
      toast.error(err);
    }
  };
  //trocar de aba
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  });

  return (
    <>
      <div className="flex justify-center items-center min-h-screen w-full relative overflow-hidden border ">
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
            <Input
              type="email"
              placeholder="Write your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // atualiza o state
              // required
            />
            <Input
              type="password"
              placeholder="Write your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // também atualiza
              // required
            />
            <p className="text-[10px]">
              Don't have an account? Click{" "}
              <span
                className="text-blue-700 underline cursor-pointer"
                onClick={() => navigate("/register")}
              >
                here
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
