import { TaskCard } from "@/components/task";
import { Input } from "@/components/ui/input";
import { taskService } from "@/service/taskService";
import { Task } from "@/types/Task";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Home = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataTask: Task[] = await taskService.getAll();
        setTasks(dataTask);
        console.log(tasks);
      } catch (error: any) {
        toast.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="flex flex-col h-screen max-w-screen relative overflow-hidden ">
        <div className="p-5">
          <Input placeholder="Search Task" type="search" className="z-30" />
          <div className=" flex flex-wrap gap-8 mt-5 justify-start items-start relative overflow-hidden min-h-screen w-full z-10">
            {tasks.map((task) => (
              <TaskCard
                id={task.id}
                name={task.title}
                description={task.description}
                category={task.tags}
                type="home"
              />
            ))}{" "}
          </div>
        </div>{" "}
        {/* Adicionado relative e overflow-hidden */}
      </div>
    </>
  );
};

export default Home;
