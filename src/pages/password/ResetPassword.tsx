import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { usePasswordService } from "@/services/usePasswordService";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [loading, setLoading] = useState(false);
  const { resetPassword } = usePasswordService();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!password || !passwordConfirmation) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password !== passwordConfirmation) {
      toast.error("Passwords do not match");
      return;
    }

    if (!token) {
      toast.error("Invalid token");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(password, passwordConfirmation, token);
      toast.success("Password reset successfully!");
      navigate("/login/email");
    } catch (error: any) {
      toast.error(error.message || "Error resetting password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center flex-1 w-full relative overflow-hidden border">
      <div className="flex flex-col justify-center items-center gap-4 p-4 w-[410px] z-10">
        <form
          className="flex flex-col justify-center items-center gap-4 p-4 w-full"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl font-semibold">Reset Password</h1>
          <p className="text-sm text-muted-foreground text-center">
            Enter your new password below.
          </p>
          <Input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirm new password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <Button
            className="cursor-pointer w-full"
            type="submit"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
