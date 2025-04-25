import Particles from "@/components/background/particules";
import { Input } from "@/components/ui/input";

const Home = () => {
  return (
    <>
      <div className="flex flex-col h-screen max-w-screen relative overflow-hidden ">
        <div className="p-5">
          <Input placeholder="Search Task" type="search" className="z-30" />
        </div>{" "}
        {/* Adicionado relative e overflow-hidden */}
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
      </div>
    </>
  );
};

export default Home;
