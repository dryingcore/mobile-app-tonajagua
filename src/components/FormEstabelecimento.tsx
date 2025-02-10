import { TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { estabelecimentoSchema } from "../utils/validationSchema";

interface EstabelecimentoFormData {
  nomeEstabelecimento: string;
  cnpj: string;
  cep: string;
  endereco: string;
  nomeDono: string;
  cpfDono: string;
  senhaAcesso: string;
  confirmarSenhaAcesso: string;
}

interface FormEstabelecimentoProps {
  onSubmit: (data: EstabelecimentoFormData) => void;
}

export default function FormEstabelecimento({
  onSubmit,
}: FormEstabelecimentoProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EstabelecimentoFormData>({
    resolver: yupResolver(estabelecimentoSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        label="Nome do Estabelecimento"
        {...register("nomeEstabelecimento")}
        fullWidth
        margin="normal"
        error={!!errors.nomeEstabelecimento}
        helperText={errors.nomeEstabelecimento?.message}
      />
      <TextField
        label="CNPJ"
        {...register("cnpj")}
        fullWidth
        margin="normal"
        error={!!errors.cnpj}
        helperText={errors.cnpj?.message}
      />
      <TextField
        label="CEP"
        {...register("cep")}
        fullWidth
        margin="normal"
        error={!!errors.cep}
        helperText={errors.cep?.message}
      />
      <TextField
        label="Endereço"
        {...register("endereco")}
        fullWidth
        margin="normal"
        error={!!errors.endereco}
        helperText={errors.endereco?.message}
      />
      <TextField
        label="Nome do Dono"
        {...register("nomeDono")}
        fullWidth
        margin="normal"
        error={!!errors.nomeDono}
        helperText={errors.nomeDono?.message}
      />
      <TextField
        label="CPF do Dono"
        {...register("cpfDono")}
        fullWidth
        margin="normal"
        error={!!errors.cpfDono}
        helperText={errors.cpfDono?.message}
      />
      <TextField
        label="Senha de acesso"
        {...register("senhaAcesso")}
        fullWidth
        margin="normal"
        error={!!errors.senhaAcesso}
        helperText={errors.senhaAcesso?.message}
      />
      <TextField
        label="Confirmar senha de acesso"
        {...register("confirmarSenhaAcesso")}
        fullWidth
        margin="normal"
        error={!!errors.confirmarSenhaAcesso}
        helperText={errors.confirmarSenhaAcesso?.message}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
      >
        Cadastrar
      </Button>
    </form>
  );
}
