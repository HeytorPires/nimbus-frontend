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

type TaskCardProps = {
  id: string;
  name: string;
  description: string;
  category: string;
  type: string;
};

export function TaskCard({
  id,
  name,
  description,
  category,
  type,
}: TaskCardProps) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    navigate(`/tasks/${id}`);
  };

  const handleRemove = async () => {
    // lógica de remoção
  };

  if (type === "home") {
    return (
      <>
        <Card className="w-[300px] h-[200px]" key={id}>
          <CardHeader>
            <CardTitle>{name}</CardTitle>
            <CardDescription>{category}</CardDescription>
          </CardHeader>
          <CardContent>
            <LimitedText text={description} />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Dialog>
              <DialogTrigger asChild>
                <Button type="button">See More</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader className="m-5">
                  <DialogTitle>{name}</DialogTitle>
                  <DialogDescription>{description}</DialogDescription>
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
        className="w-[300px] h-[200px] cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>{category}</CardDescription>
        </CardHeader>
        <CardContent>
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
            <DialogTitle>{name}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}
