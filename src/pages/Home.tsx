import { TaskCard } from "@/components/task";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { taskService } from "@/service/taskService";
import { Task } from "@/types/Task";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [tasks, setTasks] = useState<Task[] | null>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataTask: Task[] | null = await taskService.getByIdUser(user?.id);
        console.log(dataTask);
        setTasks(dataTask);
        console.log(tasks);
      } catch (error: any) {
        toast.error(error);
        console.log(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <div className="flex flex-wrap gap-4 m-2 justify-start items-start relative min-h-screen w-full">
        <div className="flex flex-col w-full mx-6">
          <div className="flex flex-col">
            <Input placeholder="Search Task" type="search" className="" />
          </div>

          <div className="flex flex-wrap gap-3 mt-5 justify-start items-start relative overflow-hidden w-full">
            <button
              className="w-[290px] h-[290px] border rounded-lg flex items-center justify-center shadow-md hover:bg-gray-100 transition cursor-pointer"
              aria-label="Adicionar nova tarefa"
              onClick={() => navigate("/tasks/create")}
            >
              <Plus size={48} />
            </button>

            {tasks?.map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                repository={task.repository}
                var_env={task.var_env}
                created_at={task.created_at}
                created_by="eu"
                type="home"
              />
            ))}
          </div>
        </div>{" "}
      </div>
      {/* Adicionado relative e overflow-hidden */}
    </>
  );
};

export default Home;
