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
import { Pencil, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Task } from "@/types/Task";

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
  type,
}: Task & { type?: "home" | "default" }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    console.log(id);
    navigate(`/tasks/${id}`);
  };

  const handleRemove = async () => {
    // lógica de remoção
  };

  if (type === "home") {
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
                  <br />
                  {/* <DialogDescription>{var_env}</DialogDescription> */}
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

  return (
    <>
      <Card
        className=" flex flex-col w-[300px] h-[250px] cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{repository}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <LimitedText text={description} />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={(e) => {
              e.stopPropagation();
              handleEdit();
            }}
          >
            <Pencil />
            Edit
          </Button>
          <Button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleRemove();
            }}
          >
            <Trash />
            Remove
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader className="m-5">
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>{var_env}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
