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
import ForgotPassword from "@/pages/password/ForgotPassword";
import ResetPassword from "@/pages/password/ResetPassword";
import About from "@/pages/about/About";
import FullPageLoader from "@/components/layout/full-page-loader";

const Private = ({ children }: { children: JSX.Element }) => {
  const auth = useContext(AuthContext);
  if (auth?.loading) return <FullPageLoader />;
  if (!auth?.isAuthenticated) return <Navigate to="/login" />;

  return children;
};

export const AppRoutes: React.FC = () => {
  const auth = useContext(AuthContext);

  if (auth?.loading) return <FullPageLoader />;

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login/email" element={<LoginEmail />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/about" element={<About />} />

      {/* Redirect / to /home if authenticated, otherwise /login */}
      <Route
        path="/"
        element={
          auth?.isAuthenticated ? (
            <Navigate to="/home" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Protected routes */}
      <Route
        path="/home"
        element={
          <Private>
            <Home />
          </Private>
        }
      />
      <Route
        path="/project"
        element={
          <Private>
            <TasksCreate />
          </Private>
        }
      />
      <Route
        path="/project/:id"
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

      {/* 404 route */}
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/not-found" />} />
    </Routes>
  );
};
