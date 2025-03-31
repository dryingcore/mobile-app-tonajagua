import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import { useJsApiLoader } from "@react-google-maps/api";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import ProfilePage from "./pages/ProfilePage";
import colorSchema from "../color-schema.json";

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

function App() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey,
  });

  return (
    <Router>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: colorSchema.background["secondary-bg-color"],
        }}
      >
        {/* Pode renderizar o app mesmo se o Maps ainda não estiver carregado */}
        <Routes>
          <Route path="*" element={<LoginPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Rota protegida */}
          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<HomePage isMapLoaded={isLoaded} />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </Container>

      <div
        style={{
          position: "fixed",
          bottom: 0,
          width: "100%",
          textAlign: "center",
        }}
      >
        <Footer />
      </div>
    </Router>
  );
}

export default App;
