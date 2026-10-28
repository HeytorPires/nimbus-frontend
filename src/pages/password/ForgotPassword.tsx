import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { usePasswordService } from "@/services/usePasswordService";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const { forgotPassword } = usePasswordService();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    setLoading(true);
    try {
      await forgotPassword(email);
      setSent(true);
      toast.success("Recovery email sent!");
    } catch (error: any) {
      toast.error(error.message || "Error sending recovery email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center flex-1 w-full relative overflow-hidden border">
      <div className="flex flex-col justify-center items-center gap-4 p-4 w-[410px] z-10">
        {sent ? (
          <div className="flex flex-col items-center gap-4 text-center">
            <h1 className="text-3xl font-semibold">Email sent!</h1>
            <p className="text-muted-foreground">
              Check your inbox to reset your password.
            </p>
            <Button
              className="cursor-pointer w-full"
              onClick={() => navigate("/login/email")}
            >
              Back to Login
            </Button>
          </div>
        ) : (
          <form
            className="flex flex-col justify-center items-center gap-4 p-4 w-full"
            onSubmit={handleSubmit}
          >
            <h1 className="text-3xl font-semibold">Recover Password</h1>
            <p className="text-sm text-muted-foreground text-center">
              Enter your email and we will send you a link to reset your
              password.
            </p>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              className="cursor-pointer w-full"
              type="submit"
              loading={loading}
            >
              {loading ? "Sending..." : "Send Recovery Email"}
            </Button>
            <p className="text-[10px] flex items-center justify-center gap-1">
              <ArrowLeft size={15} className="text-blue-700" />
              <span
                className="text-blue-700 cursor-pointer"
                onClick={() => navigate("/login/email")}
              >
                Back to Login
              </span>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
