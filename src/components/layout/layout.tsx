import React from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth"; // Importe o useAuth aqui
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { user, loading } = useAuth(); // Obtenha loading do useAuth
  const shouldShowSidebar =
    !loading &&
    !["/login", "/register", "/not-found"].includes(location.pathname) &&
    user;

  if (loading) {
    return <div></div>; // Ou seu componente de loading
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
        <div className={`flex-grow ${shouldShowSidebar ? "ml-..." : ""}`}>
          {children}
        </div>
      </main>
    </>
  );
};

export default AppLayout;
