import { Separator } from "@/components/Separator";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { taskService } from "@/service/taskService";
import { Task } from "@/types/Task";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const TasksEdit = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [name, setName] = useState();
  const [description, setDescription] = useState();
  const [repository, setRepository] = useState();
  const [envs, setEnvs] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataTask: Task[] = await taskService.getAll();
        setTasks(dataTask);
        console.log(dataTask); // Corrigido
      } catch (error: any) {
        toast.error("Erro ao buscar tasks");
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-10">
      <Typography as="h1">Create new Env Project</Typography>
      <Separator className="my-5" />

      <form className="space-y-4">
        <div>
          <Typography as="p">Project Name</Typography>
          <Input
            type="text"
            id="projectName"
            placeholder="My awesome project"
            required
          />
        </div>

        <div>
          <Typography as="p">Description</Typography>
          <Input
            type="text"
            id="description"
            placeholder="Short description of the project"
            required
          />
        </div>

        <div>
          <Typography as="p">Repository URL</Typography>
          <Input
            type="url"
            id="repoUrl"
            placeholder="https://github.com/user/repo"
          />
        </div>

        <div>
          <Typography as="p">Environment Variables</Typography>
          <Textarea
            placeholder="VAR1=value1\nVAR2=value2"
            className="h-48"
            required
          />
        </div>

        <div className="mt-5">
          <Button type="submit" variant="default">
            Create
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TasksEdit;
