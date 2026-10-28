import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ParticlesBackground from "../background/ParticlesBackground";
import Footer from "./footer";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  const shouldShowSidebar =
    !loading &&
    ![
      "/login",
      "/login/email",
      "/register",
      "/not-found",
      "/forgot-password",
      "/reset-password",
    ].includes(location.pathname) &&
    user;

  if (loading) {
    return <div></div>;
  }

  return (
    <>
      {shouldShowSidebar && <AppSidebar />}
      <main
        className={`w-full min-h-screen flex ${
          shouldShowSidebar ? "" : "justify-center items-center"
        }`}
      >
        {shouldShowSidebar && (
          <header className="z-20">{<SidebarTrigger />}</header>
        )}
        <div
          className={`flex-grow relative flex flex-col min-h-screen ${
            shouldShowSidebar ? "ml-..." : ""
          }`}
        >
          <ParticlesBackground />
          <div className="relative z-10 flex flex-1 flex-col">{children}</div>
          <Footer />
        </div>
      </main>
    </>
  );
};

export default AppLayout;
