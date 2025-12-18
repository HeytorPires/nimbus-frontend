import { ComboBox } from "@/components/combox";
import { Separator } from "@/components/Separator";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/useAuth";
import { useTagService } from "@/services/useTagService";
import { useProjectService } from "@/services/useProjectService";
import { IProject } from "@/interfaces/IProject";
import { ITag } from "@/interfaces/ITag";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const TasksEdit = () => {
  const { user } = useAuth();
  const params = useParams();
  const { getAll } = useTagService();
  const { getById, update, remove } = useProjectService();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [project, setProject] = useState<IProject | null>(null);
  const [tags, setTags] = useState<ITag[]>([]);

  const fetchTags = async () => {
    const userId = user?.id;
    try {
      if (userId) {
        const data = await getAll();
        setTags(data ?? []);
      }
    } catch (err) {
      console.error("Error to search tags:", err);
      setTags([]);
    }
  };

  const fetchData = async () => {
    const { id } = params;
    if (!id) {
      toast.error("ID task not found.");
      return;
    }

    try {
      const dataProject: IProject | null = await getById(id);
      if (dataProject) {
        setProject(dataProject);
      } else {
        toast.error("IProject not found.");
      }
    } catch (error: any) {
      toast.error("Error to search tags:");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchTags();
  }, []);

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const id = project?.id;
      if (id) {
        await update(id, project);
        toast.success("IProject updated successfully!");
        navigate("/");
      }
    } catch (error: any) {
      toast.error("Error to update project");
      console.error(error);
    }
  };

  const handleDelete = async () => {
    try {
      const id = project?.id;
      if (id) {
        await remove(id);
        toast.success("IProject deleted successfully!");
        navigate(-1);
      }
    } catch (error: any) {
      toast.error("Error to delete project");
      console.error(error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProject((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleTagChange = (value: string | undefined) => {
    setProject((prev) => ({
      ...prev!,
      tag_id: value,
    }));
  };

  return (
    <div className="p-10">
      <div className="flex flex-row items-center justify-between">
        <Typography as="h1">Update Env IProject</Typography>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="destructive">
              <Trash />
              Remove
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader className="m-5">
              <DialogTitle>Do you want to remove this task?</DialogTitle>
              <DialogDescription className="flex flex-row justify-between mt-3">
                <Button
                  type="button"
                  variant="destructive"
                  size="lg"
                  onClick={handleDelete}
                >
                  <Trash />
                  Yes
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setOpen(false)}
                >
                  No
                </Button>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <Separator className="my-5" />

      {project ? (
        <form className="space-y-4" onSubmit={handleUpdate}>
          <div>
            <Typography as="p">IProject Name</Typography>
            <Input
              type="text"
              name="title"
              placeholder="My awesome project"
              value={project.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <Typography as="p">Description</Typography>
            <Input
              type="text"
              name="description"
              placeholder="Short description of the project"
              value={project.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <Typography as="p">Repository URL</Typography>
            <Input
              type="url"
              name="repository"
              placeholder="https://github.com/user/repo"
              value={project.repository}
              onChange={handleChange}
            />
          </div>

          <div className="w-min">
            <Typography as="p">Markers</Typography>
            <ComboBox
              options={tags}
              value={project.tag_id ?? null}
              onChange={handleTagChange}
              placeholder="Selecione uma tag"
            />
          </div>

          <div>
            <Typography as="p">Environment Variables</Typography>
            <Textarea
              name="variablesEnvironment"
              placeholder="VAR1=value1\nVAR2=value2"
              className="h-48"
              value={project.variablesEnvironment}
              onChange={handleChange}
            />
          </div>

          <div className="mt-5 flex justify-between">
            <Button type="submit" variant="default">
              Update
            </Button>
            <Button type="button" onClick={() => navigate(-1)}>
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
