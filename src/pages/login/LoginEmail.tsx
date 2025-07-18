import DecryptedText from "@/components/framer/framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { authService } from "@/service/authService";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const LoginEmail = () => {
  const navigate = useNavigate();
  const { setUser, setSession, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password) {
      toast.error("Preencha todos os dados");
      return;
    }
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
        <div className="flex flex-col justify-center items-center gap-4 p-4 w-[410] z-10">
          <form
            className="flex flex-col justify-center items-center gap-4 p-4 w-full"
            onSubmit={handleSubmit}
          >
            <h1 className="text-8xl">Nimbus</h1>
            <DecryptedText
              text="Manage your environment powerfully and easily"
              speed={50}
              maxIterations={50}
              animateOn="view"
              revealDirection="start"
              useOriginalCharsOnly={true}
              sequential={true}
            />
            <Input
              type="email"
              placeholder="Write your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              // required
            />
            <Input
              type="password"
              placeholder="Write your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button className="cursor-pointer w-full" type="submit">
              Entrar
            </Button>
            <p className="text-[10px] flex items-center justify-center gap-1">
              <ArrowLeft size={15} className="text-blue-700" />

              <span
                className="text-blue-700 cursor-pointer"
                onClick={() => navigate(-1)}
              >
                Other Login options
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginEmail;
