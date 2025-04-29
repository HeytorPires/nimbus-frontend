import { TaskCard } from "@/components/task";
import { taskService } from "@/service/taskService";
import { Task } from "@/types/Task";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Tasks = () => {
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
      <div className="flex flex-row border p-5">
        <div className="flex flex-wrap gap-8 justify-start items-start relative overflow-hidden min-h-screen w-full z-10 m-2">
          {tasks.map((task) => (
            <TaskCard
              id={task.id}
              name={task.title}
              description={task.description}
              category={task.tags}
              type=""
            />
          ))}{" "}
        </div>
      </div>
    </>
  );
};

export default Tasks;
