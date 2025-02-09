import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Avatar,
} from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";

export default function LoginComponent() {
  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{
          paddingTop: 4,
          paddingBottom: 4,
        }}
      >
        {/* Logo */}
        <Avatar
          alt="Logo"
          src="/logo.png"
          sx={{ width: 100, height: 100, marginBottom: 2 }}
        />

        {/* Título */}
        <Typography variant="h5" component="h1" gutterBottom>
          Faça seu login
        </Typography>

        {/* Formulário de Login */}
        <Box
          component="form"
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
          }}
        >
          {/* Campo de Email */}
          <TextField label="E-mail" variant="outlined" fullWidth required />

          {/* Campo de Senha */}
          <TextField
            label="Senha"
            type="password"
            variant="outlined"
            fullWidth
            required
          />

          {/* Botão de Login */}
          <Button variant="contained" color="primary" fullWidth>
            Entrar
          </Button>

          {/* Separador entre login tradicional e Google */}
          <Box sx={{ display: "flex", alignItems: "center", marginY: 2 }}>
            <Box
              sx={{ flexGrow: 1, height: 1, borderBottom: "1px solid #ccc" }}
            />
            <Typography variant="body2" sx={{ marginX: 1 }}>
              ou
            </Typography>
            <Box
              sx={{ flexGrow: 1, height: 1, borderBottom: "1px solid #ccc" }}
            />
          </Box>

          {/* Botão do Google */}
          <Button
            variant="outlined"
            color="secondary"
            fullWidth
            startIcon={<GoogleIcon />}
          >
            Entrar com Google
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
