import { TaskCard } from "@/components/task";
import { Input } from "@/components/ui/input";

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

const Home = () => {
  return (
    <>
      <div className="flex flex-col h-screen max-w-screen relative overflow-hidden ">
        <div className="p-5">
          <Input placeholder="Search Task" type="search" className="z-30" />
          <div className="grid grid-cols-5 gap-2 justify-start items-start relative overflow-hidden min-h-screen w-full p-10 z-10">
            {tasks.map((task) => (
              <TaskCard
                key={task.name}
                name={task.name}
                description={task.description}
                category={task.category}
              />
            ))}{" "}
          </div>
        </div>{" "}
        {/* Adicionado relative e overflow-hidden */}
      </div>
    </>
  );
};

export default Home;
