import { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const auth = async () => {
      setIsAuthenticated(true);
    };

    auth();
  }, []);

  if (isAuthenticated === null) {
    return <p>Carregando...</p>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
