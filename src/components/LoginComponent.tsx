import { Box, TextField, Button, Typography } from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
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

interface LoginComponentProps {
  onSubmit: (data: LoginFormInputs) => void;
}

export default function LoginComponent({ onSubmit }: LoginComponentProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: yupResolver(loginSchema),
  });

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2 }}
    >
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
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Entrar
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
    </Box>
  );
}
