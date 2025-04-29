import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

const Tasks = () => {
  return (
    <>
      <div className="grid grid-cols-5 gap-2 justify-start items-start relative overflow-hidden min-h-screen w-full p-10 z-10">
        <Card className=" flex flex-col">
          {/* <CardHeader className="flex justify-center items-center">
            Add Task
          </CardHeader> */}
          <CardContent className=" flex flex-row justify-center items-center">
            <button className="cursor-pointer">
              <Plus size={100} />
            </button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default Tasks;
