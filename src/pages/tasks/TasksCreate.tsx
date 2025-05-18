import { ComboBox } from "@/components/combox";
import { Separator } from "@/components/Separator";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { tagService } from "@/service/tagService";
import { taskService } from "@/service/taskService";
import { Tag } from "@/types/Tag";
import { Task } from "@/types/Task";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const TasksCreate = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [tags, setTags] = useState<Tag[]>([]);
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    repository: "",
    var_env: "",
    tag_id: "",
    created_by: user?.id || "",
  });

  const fetchTags = async () => {
    const userId = user?.id;
    try {
      if (userId) {
        const data = await tagService.getAllByIdUser(userId);
        setTags(data ?? []);
      }
    } catch (err) {
      console.error("Erro ao buscar tags:", err);
      setTags([]);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const taskCreated: Task = await taskService.create(task);
      navigate(-1);
      console.log(taskCreated);
    } catch (error: any) {
      toast.error(error);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, [user]);

  return (
    <div className="p-10">
      <Typography as="h1">Create new Env Project</Typography>
      <Separator className="my-5" />

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Typography as="p">Project Name</Typography>
          <Input
            type="text"
            id="projectName"
            name="title"
            placeholder="My awesome project"
            required
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
            required
            value={task.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <Typography as="p">Repository URL</Typography>
          <Input
            type="url"
            id="repository"
            name="repository"
            placeholder="https://github.com/user/repo"
            value={task.repository}
            onChange={handleChange}
          />
        </div>

        <div className="w-min">
          <Typography as="p">Markers</Typography>
          <ComboBox
            options={tags}
            value={task.tag_id}
            onChange={(value) => setTask({ ...task, tag_id: value })}
            placeholder="Selecione uma tag"
          />
        </div>

        <div>
          <Typography as="p">Environment Variables</Typography>
          <Textarea
            placeholder="VAR1=value1\nVAR2=value2"
            id="var_env"
            name="var_env"
            className="h-48"
            required
            value={task.var_env}
            onChange={handleChange}
          />
        </div>

        <div className="mt-5 flex justify-between">
          <Button type="submit" variant="default">
            Create
          </Button>
          <Button type="button" onClick={() => navigate(-1)}>
            Exit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TasksCreate;
