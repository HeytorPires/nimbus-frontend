import { TaskCard } from "@/components/task";
import { Input } from "@/components/ui/input";
import { taskService } from "@/service/taskService";
import { Task } from "@/types/Task";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Home = () => {
  const navigate = useNavigate();

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
          <div className="flex flex-col">
            <button
              className="w-[300px] h-[290px] m-2 border rounded-lg flex items-center justify-center shadow-md hover:bg-gray-100 transition cursor-pointer"
              aria-label="Adicionar nova tarefa"
              onClick={() => navigate("/tasks/create")}
            >
              <Plus size={48} />
            </button>
            <div className=" flex flex-wrap gap-8 m-2 justify-start items-start relative overflow-hidden min-h-screen w-full z-10">
              {tasks.map((task) => (
                <TaskCard
                  id={task.id}
                  title={task.title}
                  description={task.description}
                  repository={task.repository}
                  var_env={task.var_env}
                  created_at={task.created_at}
                  created_by="eu"
                  type="home"
                />
              ))}{" "}
            </div>
          </div>{" "}
        </div>
        {/* Adicionado relative e overflow-hidden */}
      </div>
    </>
  );
};

export default Home;
