import "./App.css";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "@/contexts/auth";
import { useAuth } from "@/hooks/useAuth";
import { Toaster } from "sonner";
//Pages
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Home from "@/pages/Home";
// Se estiver usando contexto (como AuthProvider), envolve dentro do Router
interface PrivateProps {
  Item: React.ElementType;
}

const Private: React.FC<PrivateProps> = ({ Item }) => {
  const { user } = useAuth();
  // if (loading) return <div>Carregando...</div>;
  return user ? <Item /> : <Login />;
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          {/* element={<Private Item={Home} />} */}
          <Route path="*" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="home" element={<Private Item={Home} />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  );
};

export default App;
