import { Container } from "@mui/material";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <LoginPage />
    </Container>
  );
}

export default App;
