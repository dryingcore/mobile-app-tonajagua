import { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, MenuItem } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { estabelecimentoSchema } from "../utils/validationSchema";

interface EstabelecimentoFormData {
  nomeEstabelecimento: string;
  cnpj: string;
  cep: string;
  endereco: string;
  tipoEstabelecimento: string;
  nomeDono: string;
  cpfDono: string;
  senhaAcesso: string;
  confirmarSenhaAcesso: string;
}

interface FormEstabelecimentoProps {
  onSubmit: (data: EstabelecimentoFormData) => void;
}

export function EstabelecimentoForm({ onSubmit }: FormEstabelecimentoProps) {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EstabelecimentoFormData>({
    resolver: yupResolver(estabelecimentoSchema),
  });

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {step === 1 && (
        <EstabelecimentoStep
          register={register}
          errors={errors}
          onNext={nextStep}
        />
      )}
      {step === 2 && (
        <ProprietarioStep
          register={register}
          errors={errors}
          onBack={prevStep}
        />
      )}
    </form>
  );
}

interface StepProps {
  register: any;
  errors: any;
  onNext?: () => void;
  onBack?: () => void;
}

function EstabelecimentoStep({ register, errors, onNext }: StepProps) {
  const [tipos, setTipos] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://s01.decodesoftware.tech/estabelecimentos/tipos")
      .then((res) => res.json())
      .then((data) => setTipos(data.data.map((tipo: any) => tipo.nome))) // Pegando apenas os nomes
      .catch((err) =>
        console.error("Erro ao buscar tipos de estabelecimento:", err)
      );
  }, []);

  return (
    <Box>
      <Typography variant="h6">Informações do Estabelecimento</Typography>
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
        select
        label="Tipo de Estabelecimento"
        {...register("tipoEstabelecimento")}
        fullWidth
        margin="normal"
        error={!!errors.tipoEstabelecimento}
        helperText={errors.tipoEstabelecimento?.message}
      >
        {tipos.map((tipo) => (
          <MenuItem key={tipo} value={tipo}>
            {tipo}
          </MenuItem>
        ))}
      </TextField>

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
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 2 }}
        onClick={onNext}
      >
        Próximo
      </Button>
    </Box>
  );
}

function ProprietarioStep({ register, errors, onBack }: StepProps) {
  return (
    <Box>
      <Typography variant="h6">Informações do Proprietário</Typography>
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
        type="password"
        {...register("senhaAcesso")}
        fullWidth
        margin="normal"
        error={!!errors.senhaAcesso}
        helperText={errors.senhaAcesso?.message}
      />
      <TextField
        label="Confirmar senha de acesso"
        type="password"
        {...register("confirmarSenhaAcesso")}
        fullWidth
        margin="normal"
        error={!!errors.confirmarSenhaAcesso}
        helperText={errors.confirmarSenhaAcesso?.message}
      />
      <Box display="flex" gap={2} mt={2}>
        <Button variant="outlined" color="primary" fullWidth onClick={onBack}>
          Voltar
        </Button>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Cadastrar
        </Button>
      </Box>
    </Box>
  );
}
