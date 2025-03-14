import {
  Avatar,
  Box,
  Button,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";

export default function ProfileComponent() {
  const [user, setUser] = useState<User | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        padding: 3,
      }}
    >
      <Box
        sx={{
          width: "90%",
          maxWidth: 400,
          bgcolor: "white",
          borderRadius: "20px",
          padding: 3,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Box sx={{ position: "relative", display: "inline-block" }}>
          <Avatar
            src={user?.photoURL || "https://via.placeholder.com/150"}
            sx={{ width: 100, height: 100, margin: "0 auto" }}
          />
          <IconButton
            sx={{
              position: "absolute",
              bottom: 0,
              right: "25%",
              bgcolor: "#3f51b5",
              color: "white",
              width: 30,
              height: 30,
              boxShadow: 2,
            }}
          >
            <EditIcon fontSize="small" />
          </IconButton>
        </Box>

        <Typography variant="h6" fontWeight="bold" sx={{ marginTop: 1 }}>
          Editar Perfil
        </Typography>

        {user ? (
          <Box component="form" sx={{ mt: 2 }}>
            <TextField
              label="Nome"
              variant="outlined"
              fullWidth
              margin="normal"
              defaultValue={user.displayName || ""}
            />
            <TextField
              label="E-mail"
              variant="outlined"
              fullWidth
              margin="normal"
              defaultValue={user.email || ""}
              disabled
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: 2 }}
            >
              Salvar Alterações
            </Button>
          </Box>
        ) : (
          <Typography variant="body1" color="textSecondary" sx={{ mt: 2 }}>
            Nenhum usuário logado.
          </Typography>
        )}
      </Box>
    </Box>
  );
}
