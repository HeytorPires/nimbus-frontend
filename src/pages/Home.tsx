import Particles from "@/components/background/particules";

const Home = () => {
  return (
    <div className="flex  h-screen max-w-screen relative overflow-hidden ">
      {" "}
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
  );
};

export default Home;
