import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  // Kalau belum login, redirect ke /login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Kalau sudah login, render children (halaman yang dilindungi)
  return children;
};

export default ProtectedRoute;
