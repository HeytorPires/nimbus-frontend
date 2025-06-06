import { TaskCard } from "@/components/TaskCard";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { taskService } from "@/service/taskService";
import { Task } from "@/types/Task";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../components/theme-provider";
import { toast } from "sonner";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { theme } = useTheme();
  const [tasks, setTasks] = useState<Task[] | null>([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log(theme);

        const dataTask: Task[] | null =
          filter !== ""
            ? await taskService.getByName(user?.id, filter)
            : await taskService.getByIdUser(user?.id);

        setTasks(dataTask);
      } catch (error: any) {
        toast.error(error.message || error);
        console.error(error);
      }
    };

    fetchData();
  }, [filter, user?.id]);
  return (
    <>
      <div className="flex flex-wrap gap-4  justify-start items-start relative h-screen w-full ">
        <div className="flex flex-col w-full mx-6">
          <div className="flex flex-col">
            <Input
              className="my-2"
              placeholder="Search Task"
              type="search"
              name="search"
              onChange={(e) => setFilter(e.target.value)}
              autoComplete="off"
            />
          </div>

          <div className="flex flex-wrap gap-3 mt-5 justify-start items-start relative overflow-hidden w-full">
            <button
              className={
                theme === "dark"
                  ? "w-[290px] h-[290px] border border-gray-300 rounded-lg flex items-center justify-center shadow-md hover:bg-stone-900 transition cursor-pointer"
                  : "w-[290px] h-[290px] border rounded-lg flex items-center justify-center shadow-md  hover:bg-gray-100 transition cursor-pointer"
              }
              aria-label="Adicionar nova tarefa"
              onClick={() => navigate("/task")}
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
                updated_at={task.updated_at}
                created_at={task.created_at}
                tag_id={task.tag_id}
                created_by=""
                type="home"
              />
            ))}
          </div>
        </div>{" "}
      </div>
    </>
  );
};

export default Home;
