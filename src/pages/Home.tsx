import { TaskCard } from "@/components/task";
import { Input } from "@/components/ui/input";

const tasks = [
  {
    id: "1",
    name: "Fazer trabalho",
    category: "Trabalho",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti labore minima modi voluptatibus at accusantium aperiam excepturi architecto, nobis nihil eius odit, voluptates reprehenderit minus veritatis voluptas tempore commodi. Dicta.",
    date: 28092005,
  },
  {
    id: "2",
    name: "Fazer trabalho",
    category: "Trabalho",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti labore minima modi voluptatibus at accusantium aperiam excepturi architecto, nobis nihil eius odit, voluptates reprehenderit minus veritatis voluptas tempore commodi. Dicta.",
    date: 28092005,
  },
  {
    id: "3",
    name: "Fazer trabalho",
    category: "Trabalho",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti labore minima modi voluptatibus at accusantium aperiam excepturi architecto, nobis nihil eius odit, voluptates reprehenderit minus veritatis voluptas tempore commodi. Dicta.",
    date: 28092005,
  },
  {
    id: "4",
    name: "Fazer trabalho",
    category: "Trabalho",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti labore minima modi voluptatibus at accusantium aperiam excepturi architecto, nobis nihil eius odit, voluptates reprehenderit minus veritatis voluptas tempore commodi. Dicta.",
    date: 28092005,
  },
  {
    id: "5",
    name: "Fazer trabalho",
    category: "Trabalho",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti labore minima modi voluptatibus at accusantium aperiam excepturi architecto, nobis nihil eius odit, voluptates reprehenderit minus veritatis voluptas tempore commodi. Dicta.",
    date: 28092005,
  },
  {
    id: "6",
    name: "Fazer trabalho",
    category: "Trabalho",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti labore minima modi voluptatibus at accusantium aperiam excepturi architecto, nobis nihil eius odit, voluptates reprehenderit minus veritatis voluptas tempore commodi. Dicta.",
    date: 28092005,
  },
  {
    id: "7",
    name: "Fazer trabalho",
    category: "Trabalho",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti labore minima modi voluptatibus at accusantium aperiam excepturi architecto, nobis nihil eius odit, voluptates reprehenderit minus veritatis voluptas tempore commodi. Dicta.",
    date: 28092005,
  },
  {
    id: "8",
    name: "Fazer trabalho",
    category: "Trabalho",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti labore minima modi voluptatibus at accusantium aperiam excepturi architecto, nobis nihil eius odit, voluptates reprehenderit minus veritatis voluptas tempore commodi. Dicta.",
    date: 28092005,
  },
  {
    id: "9",
    name: "Fazer trabalho",
    category: "Trabalho",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti labore minima modi voluptatibus at accusantium aperiam excepturi architecto, nobis nihil eius odit, voluptates reprehenderit minus veritatis voluptas tempore commodi. Dicta.",
    date: 28092005,
  },
  {
    id: "10",
    name: "Fazer trabalho",
    category: "Trabalho",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti labore minima modi voluptatibus at accusantium aperiam excepturi architecto, nobis nihil eius odit, voluptates reprehenderit minus veritatis voluptas tempore commodi. Dicta.",
    date: 28092005,
  },
  {
    id: "11",
    name: "Fazer trabalho",
    category: "Trabalho",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti labore minima modi voluptatibus at accusantium aperiam excepturi architecto, nobis nihil eius odit, voluptates reprehenderit minus veritatis voluptas tempore commodi. Dicta.",
    date: 28092005,
  },
  {
    id: "12",
    name: "Fazer trabalho",
    category: "Trabalho",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti labore minima modi voluptatibus at accusantium aperiam excepturi architecto, nobis nihil eius odit, voluptates reprehenderit minus veritatis voluptas tempore commodi. Dicta.",
    date: 28092005,
  },
  {
    id: "13",
    name: "Fazer trabalho",
    category: "Trabalho",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti labore minima modi voluptatibus at accusantium aperiam excepturi architecto, nobis nihil eius odit, voluptates reprehenderit minus veritatis voluptas tempore commodi. Dicta.",
    date: 28092005,
  },
  {
    id: "14",
    name: "Fazer trabalho",
    category: "Trabalho",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti labore minima modi voluptatibus at accusantium aperiam excepturi architecto, nobis nihil eius odit, voluptates reprehenderit minus veritatis voluptas tempore commodi. Dicta.",
    date: 28092005,
  },
  {
    id: "15",
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
          <div className=" flex flex-wrap gap-8 mt-5 justify-start items-start relative overflow-hidden min-h-screen w-full z-10">
            {tasks.map((task) => (
              <TaskCard
                id={task.id}
                name={task.name}
                description={task.description}
                category={task.category}
                type="home"
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
