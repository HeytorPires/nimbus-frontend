import { TaskCard } from "@/components/task";

const tasks = [
  {
    name: "Fazer trabalho",
    category: "Trabalho",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti labore minima modi voluptatibus at accusantium aperiam excepturi architecto, nobis nihil eius odit, voluptates reprehenderit minus veritatis voluptas tempore commodi. Dicta.",
    date: 28092005,
  },
  {
    name: "Fazer trabalho",
    category: "Trabalho",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti labore minima modi voluptatibus at accusantium aperiam excepturi architecto, nobis nihil eius odit, voluptates reprehenderit minus veritatis voluptas tempore commodi. Dicta.",
    date: 28092005,
  },
  {
    name: "Fazer trabalho",
    category: "Trabalho",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti labore minima modi voluptatibus at accusantium aperiam excepturi architecto, nobis nihil eius odit, voluptates reprehenderit minus veritatis voluptas tempore commodi. Dicta.",
    date: 28092005,
  },
  {
    name: "Fazer trabalho",
    category: "Trabalho",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti labore minima modi voluptatibus at accusantium aperiam excepturi architecto, nobis nihil eius odit, voluptates reprehenderit minus veritatis voluptas tempore commodi. Dicta.",
    date: 28092005,
  },
];

const Tasks = () => {
  return (
    <div className="flex flex-wrap justify-start items-start relative overflow-hidden min-h-screen w-full gap-4 grid-cols-3 p-">
      {" "}
      {/* Adicionado relative e overflow-hidden */}
      {/* <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      >
        {" "}
      </div> */}
      {tasks.map((task) => (
        <TaskCard
          name={task.name}
          description={task.description}
          category={task.category}
        />
      ))}{" "}
    </div>
  );
};

export default Tasks;
