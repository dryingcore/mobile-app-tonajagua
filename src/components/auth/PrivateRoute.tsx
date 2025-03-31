import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function PrivateRoute() {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Carregando...</p>; // Pode ser um Spinner ou outra UI de carregamento
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
