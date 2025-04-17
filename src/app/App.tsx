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

interface PrivateProps {
  Item: React.ElementType;
}

const Private: React.FC<PrivateProps> = ({ Item }) => {
  const { user } = useAuth();
  return user ? <Item /> : <Login />;
};

// Esse componente pode usar useLocation, pois está dentro do <Router>
const AppRoutes: React.FC = () => {
  const location = useLocation();
  const shouldShowSidebar = !["/login", "/register"].includes(
    location.pathname
  );

  return (
    <AuthProvider>
      <SidebarProvider>
        {shouldShowSidebar && <AppSidebar />}
        <main className="w-full min-h-screen flex ">
          <header>{shouldShowSidebar && <SidebarTrigger />}</header>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/home" element={<Private Item={Home} />} />
            <Route path="*" element={<Login />} />
          </Routes>
        </main>
        <Toaster />
      </SidebarProvider>
    </AuthProvider>
  );
};

// Aqui o <Router> envolve o componente que usa useLocation
const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
