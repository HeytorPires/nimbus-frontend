import React from "react";
import Particles from "./particules"; // ou "./particles" se for typo corrigido
import { useTheme } from "../theme-provider";

type ParticlesWrapperProps = {
  children: React.ReactNode;
};

const ParticlesWrapper: React.FC<ParticlesWrapperProps> = ({ children }) => {
  const { theme } = useTheme();

  if (!theme) return null;

  const isLightTheme = theme === "light";
  const particleColors = isLightTheme ? "#000000" : "#FFFFFF";

  return (
    <div className="relative w-full h-full">
      {/* Fundo com partículas */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles
          particleColors={[particleColors, particleColors]}
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
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default ParticlesWrapper;
