import { Separator } from "@/components/Separator";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { taskService } from "@/service/taskService";
import { Task } from "@/types/Task";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const TasksEdit = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { id } = params;
      if (!id) {
        toast.error("ID da task não encontrado.");
        return;
      }

      try {
        const dataTask: Task | null = await taskService.getById(id);
        if (dataTask) {
          setTask(dataTask);
        } else {
          toast.error("Task não encontrada.");
        }
      } catch (error: any) {
        toast.error("Erro ao buscar task");
      }
    };
    fetchData();
  }, [params]);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (task) {
        await taskService.update(task.id, task);
        toast.success("Task atualizada com sucesso!");
        navigate("/");
      }
    } catch (error: any) {
      toast.error("Erro ao atualizar a task");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTask((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  return (
    <div className="p-10">
      <Typography as="h1">Update Env Project</Typography>
      <Separator className="my-5" />

      {task ? (
        <form className="space-y-4" onSubmit={handleUpdate}>
          <div>
            <Typography as="p">Project Name</Typography>
            <Input
              type="text"
              id="projectName"
              name="title"
              placeholder="My awesome project"
              value={task.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <Typography as="p">Description</Typography>
            <Input
              type="text"
              id="description"
              name="description"
              placeholder="Short description of the project"
              value={task.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <Typography as="p">Repository URL</Typography>
            <Input
              type="url"
              id="repoUrl"
              name="repository"
              placeholder="https://github.com/user/repo"
              value={task.repository}
              onChange={handleChange}
            />
          </div>

          <div>
            <Typography as="p">Environment Variables</Typography>
            <Textarea
              name="var_env"
              placeholder="VAR1=value1\nVAR2=value2"
              className="h-48"
              value={task.var_env}
              onChange={handleChange}
            />
          </div>

          <div className="mt-5 flex justify-between">
            <Button type="submit" variant="default">
              Update
            </Button>

            <Button type="button" onClick={() => navigate("/")}>
              Exit
            </Button>
          </div>
        </form>
      ) : (
        <Typography as="p">Carregando dados da tarefa...</Typography>
      )}
    </div>
  );
};

export default TasksEdit;
