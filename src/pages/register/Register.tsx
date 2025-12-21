import DecryptedText from "@/components/framer/framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthService } from "@/services/useAuthService";
import { toast } from "sonner";

const Register = () => {
  const { signUp } = useAuthService();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email || !password || !name) {
      toast.error("Fill in all the data");
      return;
    }

    await signUp(email, password, name)
      .then((response) => {
        if (response instanceof Error) {
          toast.error("Error to register: " + response.message);
          throw response;
        }
        toast("Success");
        toast("You can now log in");
        navigate("/login");
        return;
      })
      .catch((error) => {
        toast.error("Error to register: " + error.message);
      });
  };
  return (
    <>
      <div className="flex justify-center items-center min-h-screen relative overflow-hidden w-full">
        <div className="flex flex-col justify-center items-center gap-4 p-4 w-[410px] z-10">
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
              useOriginalCharsOnly={false}
              sequential={true}
            />
            <Input
              type="text"
              placeholder="Write your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <Input
              type="email"
              placeholder="Write your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Write your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="text-[10px]">
              You already have an account? Click{" "}
              <span
                className="text-blue-700 underline cursor-pointer"
                onClick={() => navigate(-1)}
              >
                here
              </span>
            </p>
            <Button className="cursor-pointer w-full" type="submit">
              Register
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
