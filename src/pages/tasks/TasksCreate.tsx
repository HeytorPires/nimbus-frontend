import { ComboBox } from "@/components/combox";
import { Separator } from "@/components/Separator";
import { Typography } from "@/components/typography";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTagService } from "@/services/useTagService";
import { useProjectService } from "@/services/useProjectService";
import { IProject } from "@/interfaces/IProject";
import { ITag } from "@/interfaces/ITag";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const TasksCreate = () => {
  const { getAll } = useTagService();
  const { create } = useProjectService();
  const navigate = useNavigate();

  const [tags, setTags] = useState<ITag[]>([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [variablesEnvironment, setVariablesEnvironment] = useState("");
  const [tagId, setTagId] = useState("");

  const fetchTags = async () => {
    const query = `perPage=100&currentPage=1`;
    const response = await getAll(query);
    setTags(response?.data ?? []);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const project: IProject = {
      title,
      description,
      variablesEnvironment,
      tag_id: tagId,
    };

    try {
      await create(project);
      navigate(-1);
    } catch (error: any) {
      toast.error(error);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTags();
  }, []);

  return (
    <div className="p-10">
      <Typography as="h1">Create new Env IProject</Typography>
      <Separator className="my-5" />

      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <Typography as="p">IProject Name</Typography>
          <Input
            type="text"
            placeholder="My awesome project"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-white"
          />
        </div>

        <div>
          <Typography as="p">Description</Typography>
          <Input
            type="text"
            placeholder="Short description of the project"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-white"
          />
        </div>

        <div className="w-min">
          <Typography as="p">Markers</Typography>
          <ComboBox
            options={tags}
            value={tagId}
            onChange={(value) => setTagId(value!)}
            placeholder="Selecione uma tag"
          />
        </div>

        <div>
          <Typography as="p">Environment Variables</Typography>
          <Textarea
            placeholder="VAR1=value1\nVAR2=value2"
            className="h-48 bg-white"
            required
            value={variablesEnvironment}
            onChange={(e) => setVariablesEnvironment(e.target.value)}
          />
        </div>

        <div className="mt-5 flex justify-between">
          <Button type="submit">Create</Button>
          <Button type="button" onClick={() => navigate(-1)}>
            Exit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TasksCreate;
