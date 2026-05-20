import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  validateToken,
  getToken,
  clearToken,
} from "@/services/authService";
import {
  getUserFromToken,
  isTokenExpired,
} from "@/services/tokenService";
import Spinner from "../../feedback/Spinner/Spinner";

const ProtectedRoute = () => {
  const [status, setStatus] = useState("loading");
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const token = getToken();
        if (!token) {
          if (isMounted) setStatus("unauthenticated");
          return;
        }

        if (isTokenExpired()) {
          clearToken();
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
    return (
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "48px 20px",
          gap: 12,
          color: "var(--color-text-muted)",
          fontSize: 14,
        }}
      >
        <Spinner size="lg" />
        <span>Checking your session…</span>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <Navigate to="/login" replace />;
  }

  // If the JWT signals a forced password rotation, the user can only access
  // the change-password screen until they comply.
  const me = getUserFromToken();
  if (
    me?.passwordChangeRequired &&
    location.pathname !== "/change-password"
  ) {
    return <Navigate to="/change-password" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
