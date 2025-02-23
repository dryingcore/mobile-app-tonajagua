import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    fetch("https://s01.decodesoftware.tech:5771/validate-token", {
      method: "GET",
      credentials: "include", // 🔹 Permite envio de cookies
    })
      .then((res) => res.json())
      .then((data) => setIsAuthenticated(data.valid))
      .catch(() => setIsAuthenticated(false));
  }, []);

  if (isAuthenticated === null) {
    return <p>Carregando...</p>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
