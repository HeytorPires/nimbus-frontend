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
import { Layers2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { IProject } from "@/interfaces/IProject";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import { useTagService } from "@/services/useTagService";
import { useEffect, useState } from "react";
import { ITag } from "@/interfaces/ITag";

const LimitedText = ({
  text,
  maxLength = 100,
}: {
  text: string;
  maxLength?: number;
}) => {
  const displayText =
    text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  return <p title={text}>{displayText}</p>;
};

export function IProjectCard({
  id,
  title,
  description,
  repository,
  variablesEnvironment,
  updated_at,
  tag_id,
}: IProject & { type?: "home" | "default" }) {
  const { getById } = useTagService();
  const navigate = useNavigate();
  const [tag, setTag] = useState<ITag>();

  const handleCopy = async (textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.success("Env copied successfully");
    } catch (err) {
      console.error("Erro ao copiar: ", err);
    }
  };

  useEffect(() => {
    const fetchTag = async () => {
      if (tag_id) {
        try {
          const data = await getById(tag_id);
          setTag(data ?? undefined);
        } catch (err) {
          console.error("Erro ao buscar tag:", err);
        }
      }
    };

    fetchTag();
  }, [tag_id]);

  const handleEdit = () => {
    navigate(`/Project/${id}`);
  };

  return (
    <Card className="flex flex-col w-[290px] h-[290px]" key={id}>
      <CardHeader>
        <div className="flex flex-row items-center justify-between">
          <CardTitle>{title}</CardTitle>
          {tag_id === null ? null : (
            <Badge variant="outline">{tag?.name}</Badge>
          )}
        </div>
        <CardDescription>{updated_at?.toString()}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <LimitedText text={description} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" className="cursor-pointer">
              See More
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader className="m-5">
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
              <DialogDescription>
                Updated at {updated_at?.toString()}
              </DialogDescription>
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
              {variablesEnvironment !== "" ? (
                <>
                  <DialogDescription
                    style={{
                      wordBreak: "break-word",
                      whiteSpace: "pre-wrap",
                    }}
                    className="max-h-48 w-full overflow-y-auto whitespace-pre-wrap break-words select-none border p-2 rounded bg-gray-100 text-sm"
                  >
                    {variablesEnvironment}
                  </DialogDescription>
                  <br />
                  <Button
                    className="w-min cursor-pointer"
                    onClick={() => handleCopy(variablesEnvironment)}
                  >
                    <Layers2 className="mr-2" />
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
          Edit Project
        </Button>
      </CardFooter>
    </Card>
  );
}
