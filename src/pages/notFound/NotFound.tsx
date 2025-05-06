import Particles from "@/components/background/particules";
import DecryptedText from "@/components/framer/framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const NotFound = () => {
  const { isAuthenticated } = useAuth();
  return (
    <>
      <div className="flex justify-center items-center min-h-screen w-full relative overflow-hidden border ">
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
            particleColors={["#000000 ", "#000000 "]}
            particleCount={200}
            particleSpread={10}
            speed={0.1}
            particleBaseSize={100}
            moveParticlesOnHover={false}
            alphaParticles={false}
            disableRotation={false}
          />
        </div>
        <div className="flex flex-col justify-center items-center gap-4 p-4 w-96 z-10">
          <h1 className="text-8xl">Nimbus</h1>
          <DecryptedText
            text="Your tasks made easier"
            speed={50}
            maxIterations={50}
            animateOn="view"
            revealDirection="start"
            useOriginalCharsOnly={false}
            sequential={true}
          />

          <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-lg text-gray-600 mb-2">Page not found</p>
          <p className="text-sm text-gray-500">
            The URL you tried to access does not exist.
          </p>
          {isAuthenticated ? (
            <Link to="/home">Back to home page</Link>
          ) : (
            <Link to="/login">Back to Login</Link>
          )}
        </div>
      </div>
    </>
  );
};

export default NotFound;
