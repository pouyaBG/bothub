// src/routes/ProtectedRoutes.tsx
import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

const ProtectedRoutes = () => {
  // const { user, isLoading } = useAuth();

  if (false) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin w-12 h-12 border-4 border-primary-icon-rest border-t-transparent rounded-full" />
      </div>
    );
  }

  return true ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
