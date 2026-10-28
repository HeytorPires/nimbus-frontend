import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";
import ParticlesBackground from "../background/ParticlesBackground";
import Footer from "./footer";
import FullPageLoader from "./full-page-loader";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth();
  const shouldShowSidebar =
    !loading &&
    ![
      "/",
      "/login",
      "/login/email",
      "/register",
      "/not-found",
      "/forgot-password",
      "/reset-password",
    ].includes(location.pathname) &&
    user;

  const shouldShowBackLink = !shouldShowSidebar && location.pathname !== "/";

  if (loading) {
    return <FullPageLoader />;
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
          {shouldShowBackLink && (
            <Link
              to="/"
              className="absolute left-4 top-4 z-20 inline-flex items-center gap-2 rounded-full border bg-background/80 px-3 py-1.5 text-sm font-semibold backdrop-blur transition-colors hover:bg-accent"
            >
              <ArrowLeft className="size-4" />
              Nimbus
            </Link>
          )}
          <div className="relative z-10 flex flex-1 flex-col">{children}</div>
          <Footer />
        </div>
      </main>
    </>
  );
};

export default AppLayout;
