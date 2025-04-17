import "./App.css";
import React, { ElementType } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { AuthProvider } from "@/contexts/auth";
import { useAuth } from "@/hooks/useAuth";
import { Toaster } from "sonner";
//Pages
import Login from "@/pages/Login";
import Register from "@/pages/Register";
// Se estiver usando contexto (como AuthProvider), envolve dentro do Router
//
const Private = (Item: ElementType) => {
  const { signed } = useAuth();
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* element={<Private Item={Home} />} */}
          <Route path="*" element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Routes>
        <Toaster />
      </Router>
    </AuthProvider>
  );
};

export default App;
