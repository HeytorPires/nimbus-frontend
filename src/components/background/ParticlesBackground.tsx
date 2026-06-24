import React from "react";
import Particles from "./particules";
import { useTheme } from "../theme-provider";

const ParticlesBackground: React.FC = React.memo(() => {
  const { theme } = useTheme();

  if (!theme) return null;

  const isLightTheme = theme === "light";
  const particleColors = isLightTheme ? "#000000" : "#FFFFFF";

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Particles
        particleColors={[particleColors, particleColors]}
        particleCount={200}
        particleSpread={10}
        speed={0.1}
        particleBaseSize={100}
        moveParticlesOnHover={false}
        alphaParticles={false}
        disableRotation={false}
      />
    </div>
  );
});

ParticlesBackground.displayName = "ParticlesBackground";

export default ParticlesBackground;
