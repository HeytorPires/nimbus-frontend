import React from "react";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "../routes/routes"; // Caminho ajustado se estiver na mesma pasta de `pages`

// Se estiver usando contexto (como AuthProvider), envolve dentro do Router

const App: React.FC = () => {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
};

export default App;
