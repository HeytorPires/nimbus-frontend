import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Layers2, Link2 as LinkIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Task } from "@/types/Task";
import { toast } from "sonner";

const LimitedText = ({
  text,
  maxLength = 100,
}: {
  text: string;
  maxLength?: number;
}) => {
  const displayText =
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  return <p>{displayText}</p>;
};

export function TaskCard({
  id,
  title,
  description,
  repository,
  var_env,
  created_at,
}: Task & { type?: "home" | "default" }) {
  const navigate = useNavigate();

  const handleCopy = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setTimeout(() => 2000); // Volta ao normal depois de 2s
      toast.success("Env copied successfully");
    } catch (err) {
      console.error("Erro ao copiar: ", err);
    }
  };

  const handleEdit = () => {
    console.log(id);
    navigate(`/tasks/${id}`);
  };

  return (
    <>
      <Card
        className="flex flex-col w-[300px] h-[290px] cursor-pointer"
        key={id}
      >
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{created_at?.toString()}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <LimitedText text={description} />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Dialog>
            <DialogTrigger asChild>
              <Button type="button">See More</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader className="m-5">
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
                <DialogDescription>
                  <Link
                    to={repository}
                    target="_blank"
                    className="text-black flex flex-row items-center underline"
                  >
                    Repository
                  </Link>
                </DialogDescription>
                <br />
                {var_env !== "" ? (
                  <>
                    <DialogDescription
                      style={{
                        wordBreak: "break-word",
                        whiteSpace: "pre-wrap",
                      }}
                      className="max-h-48 w-full overflow-y-auto whitespace-pre-wrap break-words select-none border p-2 rounded bg-gray-100 text-sm"
                    >
                      {var_env}
                    </DialogDescription>
                    <br />
                    <Button
                      className="w-min"
                      onClick={() => handleCopy(var_env)}
                    >
                      {" "}
                      <Layers2 />
                      Copy
                    </Button>
                  </>
                ) : null}
              </DialogHeader>
            </DialogContent>
          </Dialog>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={handleEdit}
          >
            Edit Task
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
