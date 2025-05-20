import React from "react";
import Particles from "./particules"; // seu componente customizado de partículas

type ParticlesWrapperProps = {
  children: React.ReactNode;
};

const ParticlesWrapper: React.FC<ParticlesWrapperProps> = ({ children }) => {
  return (
    <div className="relative w-full h-full">
      {/* Fundo com partículas */}
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
        <Particles
          particleColors={["#000000", "#000000"]}
          particleCount={200}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* Conteúdo do React por cima */}
      <div style={{ position: "relative", zIndex: 1 }}>{children}</div>
    </div>
  );
};

export default ParticlesWrapper;
