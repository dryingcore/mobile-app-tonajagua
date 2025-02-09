import { TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { pessoaFisicaSchema } from "../utils/validationSchema";

interface PessoaFisicaFormData {
  nome: string;
  email: string;
  senha: string;
  confirmarSenha: string;
}

interface FormPessoaFisicaProps {
  onSubmit: (data: PessoaFisicaFormData) => void;
}

export default function FormPessoaFisica({ onSubmit }: FormPessoaFisicaProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PessoaFisicaFormData>({
    resolver: yupResolver(pessoaFisicaSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
        Cadastrar
      </Button>
    </form>
  );
}
