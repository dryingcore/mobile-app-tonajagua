import { Box, Container, Typography, Avatar } from "@mui/material";
import LoginComponent from "../components/LoginComponent";

export default function LoginPage() {
  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ paddingTop: 4, paddingBottom: 4 }}
      >
        <Avatar
          alt="Logo"
          src="/logo.png"
          sx={{ width: 100, height: 100, marginBottom: 2 }}
        />
        <Typography variant="h5" component="h1" gutterBottom>
          Faça seu login
        </Typography>
        <LoginComponent />
      </Box>
    </Container>
  );
}
