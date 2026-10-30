import { IProjectCard } from "@/components/TaskCard";
import { ProjectCardSkeleton } from "@/components/ProjectCardSkeleton";
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
  const [loading, setLoading] = useState(true);

  const listallProjects = useCallback(async () => {
    const url = `perPage=${perPage}&currentPage=${currentPage}`;
    getAll(url)
      .then((Response) => {
        const dataProject = Response.data;
        setProjects(dataProject);
      })
      .catch((error) => {
        toast.error(error.message || error);
      })
      .finally(() => setLoading(false));
  }, [getAll, perPage, currentPage]);

  useEffect(() => {
    listallProjects();
  }, [setFilter, filter]);

  return (
    <>
      <div className="flex flex-wrap gap-4  justify-start items-start relative flex-1 w-full ">
        <div className="flex flex-col w-full mx-6 pb-6 md:pb-0">
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
              aria-label="Add new task"
              onClick={() => navigate("/project")}
            >
              <Plus size={48} />
            </button>

            {loading &&
              Array.from({ length: 6 }).map((_, index) => (
                <ProjectCardSkeleton key={index} />
              ))}

            {!loading && projects?.length === 0 && (
              <p className="self-center text-muted-foreground">
                No projects yet. Click + to create your first one.
              </p>
            )}

            {!loading && projects?.map((project) => (
              <IProjectCard
                key={project.id}
                id={project.id}
                title={project.title}
                description={project.description}
                variablesEnvironment={project.variablesEnvironment}
                updatedAt={project.updatedAt}
                createdAt={project.createdAt}
                tagId={project.tagId}
                userId=""
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
