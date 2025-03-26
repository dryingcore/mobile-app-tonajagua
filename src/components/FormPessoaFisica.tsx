import { useState } from "react";
import { TextField, Button, Alert } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { pessoaFisicaSchema } from "../utils/validationSchema";
import { useAuth } from "../hooks/useAuth"; // 🔹 Importa o hook de autenticação

interface PessoaFisicaFormData {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

export default function FormPessoaFisica() {
  const navigate = useNavigate();
  const { signUp } = useAuth(); // 🔹 Usa a função de cadastro do Firebase
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PessoaFisicaFormData>({
    resolver: yupResolver(pessoaFisicaSchema),
  });

  const onSubmit = async (data: PessoaFisicaFormData) => {
    setErrorMessage(null);
    setLoading(true);

    try {
      await signUp(data.nome, data.email, data.senha); // 🔹 Registra o usuário no Firebase

      // Redireciona para a tela de login após o cadastro bem-sucedido
      navigate("/home");
    } catch (error: any) {
      setErrorMessage(error.message || "Erro ao cadastrar usuário.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

      <TextField
        label="Nome"
        {...register("nome")}
        fullWidth
        margin="normal"
        error={!!errors.nome}
        helperText={errors.nome?.message}
      />
      <TextField
        label="E-mail"
        {...register("email")}
        type="email"
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        label="Senha"
        {...register("senha")}
        type="password"
        fullWidth
        margin="normal"
        error={!!errors.senha}
        helperText={errors.senha?.message}
      />
      <TextField
        label="Confirmar Senha"
        {...register("confirmarSenha")}
        type="password"
        fullWidth
        margin="normal"
        error={!!errors.confirmarSenha}
        helperText={errors.confirmarSenha?.message}
      />

      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        disabled={loading}
      >
        {loading ? "Cadastrando..." : "Cadastrar"}
      </Button>
    </form>
  );
}
