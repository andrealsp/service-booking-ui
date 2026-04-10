import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  validateToken,
  getToken,
  clearToken,
} from "../../../services/authService";

const ProtectedRoute = () => {
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const token = getToken();

        if (!token) {
          if (isMounted) setStatus("unauthenticated");
          return;
        }

        const isValid = await validateToken();

        if (!isMounted) return;

        if (isValid) {
          setStatus("authenticated");
        } else {
          clearToken();
          setStatus("unauthenticated");
        }
      } catch (error) {
        console.error("Auth validation error:", error);
        clearToken();
        if (isMounted) setStatus("unauthenticated");
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, []);

  if (status === "loading") {
    return <div style={{ padding: "20px" }}>Checking session...</div>;
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
