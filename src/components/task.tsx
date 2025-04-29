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
import { Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";

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

  const handleEdit = () => {
    navigate(`/task/${id}`);
  };
  const handleRemove = async () => {
    // navigate(`/task/${id}`);
    // const dataTask = await taskService.getAll();
    // console.log(dataTask);
  };

  return (
    <Card className="w-[300px]" key={id}>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{category} - </CardDescription>
      </CardHeader>
      <CardContent>
        <LimitedText text={description} />
      </CardContent>
      <CardFooter className="flex justify-between">
        {type === "home" ? (
          <>
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
          </>
        ) : (
          <>
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
              onClick={handleRemove}
            >
              <Trash />
              Remove Task
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
