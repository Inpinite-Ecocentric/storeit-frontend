import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./AuthContext";

interface ProtectedRouteProps {
  requiredRole?: "admin" | "supervisor" | "worker";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRole }) => {
  const { isAuthenticated, isAdmin, isSupervisor, isWorker, loading } =
    useAuth();

  // Show loading state or spinner while checking authentication
  if (loading) {
    return <div>Loading...</div>; // You can replace this with a spinner component
  }

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check role-based access
  if (requiredRole) {
    if (
      (requiredRole === "admin" && !isAdmin) ||
      (requiredRole === "supervisor" && !isSupervisor) ||
      (requiredRole === "worker" && !isWorker)
    ) {
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // User is authenticated and has the required role (if any)
  return <Outlet />;
};

export default ProtectedRoute;
