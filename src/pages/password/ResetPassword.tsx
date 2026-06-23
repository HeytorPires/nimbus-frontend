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
      toast.error("Preencha todos os campos");
      return;
    }

    if (password !== passwordConfirmation) {
      toast.error("As senhas não coincidem");
      return;
    }

    if (!token) {
      toast.error("Token inválido");
      return;
    }

    setLoading(true);
    try {
      await resetPassword(password, passwordConfirmation, token);
      toast.success("Senha redefinida com sucesso!");
      navigate("/login/email");
    } catch (error: any) {
      toast.error(error.message || "Erro ao redefinir senha");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen w-full relative overflow-hidden border">
      <div className="flex flex-col justify-center items-center gap-4 p-4 w-[410px] z-10">
        <form
          className="flex flex-col justify-center items-center gap-4 p-4 w-full"
          onSubmit={handleSubmit}
        >
          <h1 className="text-3xl font-semibold">Redefinir Senha</h1>
          <p className="text-sm text-muted-foreground text-center">
            Digite sua nova senha abaixo.
          </p>
          <Input
            type="password"
            placeholder="Nova senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Confirme a nova senha"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
          />
          <Button
            className="cursor-pointer w-full"
            type="submit"
            disabled={loading}
          >
            {loading ? "Redefinindo..." : "Redefinir Senha"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
