import "./App.css";
import React, { JSX, useContext } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { AuthContext } from "@/contexts/auth";

// Pages
import Login from "@/pages/login/Login";
import Register from "@/pages/register/Register";
import Home from "@/pages/Home";
import NotFound from "@/pages/notFound/NotFound";
import TasksEdit from "@/pages/tasks/TasksEdit";
import TasksCreate from "@/pages/tasks/TasksCreate";
import LoginEmail from "@/pages/login/LoginEmail";
import Account from "@/pages/account/Account";

// interface PrivateProps {
//   Item: React.ElementType;
// }

const Private = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext);

  if (auth?.loading) return <div>Carregando...</div>;
  if (!auth?.isAuthenticated) return <Navigate to="/login" />;

  return children;
};

// Esse componente agora apenas define as rotas dentro do layout apropriado
export const AppRoutes: React.FC = () => {
  const auth = useContext(AuthContext);

  if (auth?.loading) return <div>Carregando rotas...</div>;
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/login/email" element={<LoginEmail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Rotas protegidas */}
      <Route
        path="/home"
        element={
          <Private>
            <Home />
          </Private>
        }
      />
      <Route
        path="/task"
        element={
          <Private>
            <TasksCreate />
          </Private>
        }
      />
      <Route
        path="/task/:id"
        element={
          <Private>
            <TasksEdit />
          </Private>
        }
      />
      <Route
        path="/account"
        element={
          <Private>
            <Account />
          </Private>
        }
      />

      {/* Redirecionamentos e NotFound */}
      <Route path="/not-found" element={<NotFound />} />
      <Route
        path="/"
        element={
          auth?.isAuthenticated ? (
            <Navigate to="/home" />
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};
