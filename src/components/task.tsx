import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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

export function TaskCard({ name, description, category }: Task) {
  return (
    <Card className="w-[300px]">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{category} - </CardDescription>
      </CardHeader>
      <CardContent>
        <LimitedText text={description} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button className="cursor-pointer" type="button">
          See more
        </Button>
      </CardFooter>
    </Card>
  );
}
