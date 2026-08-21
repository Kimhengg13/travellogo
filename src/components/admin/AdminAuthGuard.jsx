import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useData } from "../../context/DataContext";

const AdminAuthGuard = ({ children }) => {
  const { adminAuth } = useData();
  const location = useLocation();

  if (!adminAuth.isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

export default AdminAuthGuard;
