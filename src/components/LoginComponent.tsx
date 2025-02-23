import { useState } from "react";
import { Box, TextField, Button, Typography, Alert } from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as yup from "yup";

interface LoginFormInputs {
  email: string;
  senha: string;
}

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email("E-mail inválido")
    .required("O e-mail é obrigatório"),
  senha: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("A senha é obrigatória"),
});

export default function LoginComponent() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormInputs) => {
    setErrorMessage(null);
    setLoading(true);

    try {
      const response = await axios.post(
        "https://s01.decodesoftware.tech:5771/login",
        {
          email: data.email,
          password: data.senha,
        },
        { withCredentials: true } // 🔹 Permite que os cookies sejam enviados e armazenados
      );

      const { accessToken } = response.data;

      // Salva o token no localStorage
      localStorage.setItem("accessToken", accessToken);

      // Redireciona o usuário para a página protegida
      navigate("/home");
    } catch (error: any) {
      setErrorMessage(error.response?.data?.error || "Erro ao fazer login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}
    >
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <TextField
        label="E-mail"
        variant="outlined"
        fullWidth
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        required
      />
      <TextField
        label="Senha"
        type="password"
        variant="outlined"
        fullWidth
        {...register("senha")}
        error={!!errors.senha}
        helperText={errors.senha?.message}
        required
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={loading}
      >
        {loading ? "Entrando..." : "Entrar"}
      </Button>

      <Box sx={{ display: "flex", alignItems: "center", marginY: 2 }}>
        <Box sx={{ flexGrow: 1, height: 1, borderBottom: "1px solid #ccc" }} />
        <Typography variant="body2" sx={{ marginX: 1 }}>
          ou
        </Typography>
        <Box sx={{ flexGrow: 1, height: 1, borderBottom: "1px solid #ccc" }} />
      </Box>

      <Button
        variant="outlined"
        color="secondary"
        fullWidth
        startIcon={<GoogleIcon />}
      >
        Entrar com Google
      </Button>

      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 2 }}>
        <Typography variant="body2">
          Não tem uma conta?{" "}
          <Link
            to="/register"
            style={{ textDecoration: "none", color: "#1976d2" }}
          >
            Registre-se
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}
