import Particles from "@/components/background/particules";
import DecryptedText from "@/components/framer/framer-motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/lib/supabaseClient";
import { ArrowRight, Github } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const Auth = useAuth();
  const session = Auth.session;
  const user = session?.user;

  const signInWithGitHub = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });
    if (error) {
      console.log("error ao fazer login", error.message);
    }
  };
  //trocar de aba
  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  return (
    <>
      <div className="flex justify-center items-center min-h-screen w-full relative overflow-hidden border ">
        <div className="flex flex-col justify-center items-center gap-4 p-4 w-96 z-10">
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
          <div className="flex flex-col justify-around w-full gap-2">
            <Button
              className="cursor-pointer"
              variant="outline"
              onClick={() => navigate("email")}
            >
              Continue with Email <ArrowRight />
            </Button>
            <Button
              className="cursor-pointer"
              color="#00000"
              onClick={signInWithGitHub}
            >
              <Github />
              Login with GitHub
            </Button>
            <div className="flex justify-center">
              <p className="text-[10px]">
                Don't have an account? Click{" "}
                <span
                  className="text-blue-700 underline cursor-pointer"
                  onClick={() => navigate("/register")}
                >
                  here
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
