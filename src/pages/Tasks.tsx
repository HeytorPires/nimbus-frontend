import Particles from "@/components/background/particules";
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

const Tasks = () => {
  return (
    <div className="flex flex-wrap justify-start items-start relative overflow-hidden min-h-screen w-full gap-2 grid-cols-3 p-5">
      {" "}
      <div
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
        <Particles
          particleColors={["#000000", "#000000"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={false}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>
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
