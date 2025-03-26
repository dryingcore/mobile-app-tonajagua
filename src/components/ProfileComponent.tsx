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
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  User,
} from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function ProfileComponent() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    return () => unsubscribe();
  }, [auth]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!event.target.files || !event.target.files[0]) return;

    const file = event.target.files[0];
    setLoading(true);

    try {
      const photoURL = await uploadProfilePicture(file);
      if (photoURL) {
        setUser((prevUser) =>
          prevUser ? { ...prevUser, photoURL } : prevUser
        );
      }
    } catch (error) {
      console.error("Erro ao atualizar foto:", error);
    } finally {
      setLoading(false);
    }
  };

  const uploadProfilePicture = async (file: File) => {
    if (!user) return;

    const storage = getStorage();
    const storageRef = ref(storage, `profile_pictures/${user.uid}`);

    try {
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);

      await updateProfile(user, { photoURL });

      return photoURL;
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
      throw error;
    }
  };

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
            component="label"
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
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleFileChange}
            />
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
              disabled={loading}
            >
              {loading ? "Salvando..." : "Salvar Alterações"}
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
