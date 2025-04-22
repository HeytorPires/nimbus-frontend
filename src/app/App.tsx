import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "@/contexts/auth";
import { useAuth } from "@/hooks/useAuth";
import { Toaster } from "sonner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

// Pages
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";
import Tasks from "@/pages/Tasks";
import NotFound from "@/pages/NotFound";

interface PrivateProps {
  Item: React.ElementType;
}

const Private: React.FC<PrivateProps> = ({ Item }) => {
  const { user } = useAuth();
  return user ? <Item /> : <Navigate to="/login" replace />;
};

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const shouldShowSidebar = !["/login", "/register", "/not-found"].includes(
    location.pathname
  );

  return (
    <>
      {shouldShowSidebar && <AppSidebar />}
      <main
        className={`w-full min-h-screen flex ${
          shouldShowSidebar ? "" : "justify-center items-center"
        }`}
      >
        {shouldShowSidebar && <header>{<SidebarTrigger />}</header>}
        <div className={`flex-grow ${shouldShowSidebar ? "ml-..." : ""}`}>
          {children}
        </div>
      </main>
    </>
  );
};

// Esse componente agora apenas define as rotas dentro do layout apropriado
const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Private Item={Home} />} />
      <Route path="/tasks" element={<Private Item={Tasks} />} />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" replace />} />{" "}
      {/* Redireciona rotas não encontradas para /not-found */}
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <SidebarProvider>
          <AppLayout>
            <AppRoutes />
          </AppLayout>
          <Toaster />
        </SidebarProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
