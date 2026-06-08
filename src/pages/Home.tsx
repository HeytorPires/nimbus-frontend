import { IProjectCard } from "@/components/TaskCard";
import { Input } from "@/components/ui/input";
import { useProjectService } from "@/services/useProjectService";
import { Plus } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../components/theme-provider";
import { toast } from "sonner";
import { IProject } from "@/interfaces/IProject";

const Home = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { getAll } = useProjectService();
  const [projects, setProjects] = useState<IProject[] | null>([]);
  const [perPage] = useState(20);
  const [currentPage] = useState(1);
  const [filter, setFilter] = useState("");

  const listallProjects = useCallback(async () => {
    const url = `perPage=${perPage}&currentPage=${currentPage}`;
    getAll(url)
      .then((Response) => {
        const dataProject = Response.data;
        setProjects(dataProject);
      })
      .catch((error) => {
        toast.error(error.message || error);
      });
  }, [getAll, perPage, currentPage]);

  useEffect(() => {
    listallProjects();
  }, [setFilter, filter]);

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
              onClick={() => navigate("/project")}
            >
              <Plus size={48} />
            </button>

            {projects?.map((project) => (
              <IProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                repository={project.repository}
                variablesEnvironment={project.variablesEnvironment}
                updated_at={project.updated_at}
                created_at={project.created_at}
                tag_id={project.tag_id}
                user_id=""
                type="home"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
