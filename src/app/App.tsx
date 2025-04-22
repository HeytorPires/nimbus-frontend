import "./App.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { AuthProvider } from "@/contexts/auth";
import { useAuth } from "@/hooks/useAuth";
import { Toaster } from "sonner";
import { SidebarProvider } from "@/components/ui/sidebar";

// Pages
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";
import Tasks from "@/pages/Tasks";
import NotFound from "@/pages/NotFound";
import AppLayout from "@/components/layout/layout";

interface PrivateProps {
  Item: React.ElementType;
}

const Private: React.FC<PrivateProps> = ({ Item }) => {
  const { user } = useAuth();
  return user ? <Item /> : <Navigate to="/login" replace />;
};

// Esse componente agora apenas define as rotas dentro do layout apropriado
const AppRoutes: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div></div>; // Ou um componente de loading mais elaborado
  }
  return (
    <Routes>
      {user ? (
        <>
          <Route path="/home" element={<Private Item={Home} />} />
          <Route path="/tasks" element={<Private Item={Tasks} />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/not-found" replace />} />{" "}
          {/* Redireciona rotas não encontradas para /not-found */}
        </>
      ) : (
        <>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/not-found" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/login" replace />} />{" "}
        </>
      )}
    </Routes>
  );
};

const App: React.FC = () => (
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

export default App;
