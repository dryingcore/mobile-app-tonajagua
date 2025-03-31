import { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, MenuItem } from "@mui/material";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { estabelecimentoSchema } from "../../utils/validationSchema";

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

  const methods = useForm<EstabelecimentoFormData>({
    resolver: yupResolver(estabelecimentoSchema),
    defaultValues: {
      nomeEstabelecimento: "",
      cnpj: "",
      cep: "",
      endereco: "",
      tipoEstabelecimento: "", // Garante que nunca seja undefined
      nomeDono: "",
      cpfDono: "",
      senhaAcesso: "",
      confirmarSenhaAcesso: "",
    },
  });

  const nextStep = () => setStep(2);
  const prevStep = () => setStep(1);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {step === 1 && <EstabelecimentoStep onNext={nextStep} />}
        {step === 2 && <ProprietarioStep onBack={prevStep} />}
      </form>
    </FormProvider>
  );
}

interface StepProps {
  onNext?: () => void;
  onBack?: () => void;
}

function EstabelecimentoStep({ onNext }: StepProps) {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<EstabelecimentoFormData>();
  const [tipos, setTipos] = useState<string[]>([]);

  useEffect(() => {
    fetch("https://s01.decodesoftware.tech/estabelecimentos/tipos")
      .then((res) => res.json())
      .then((data) => setTipos(data.data.map((tipo: any) => tipo.nome))) // Pegando apenas os nomes
      .catch((err) =>
        console.error("Erro ao buscar tipos de estabelecimento:", err)
      );
  }, []);

  const tipoEstabelecimento = watch("tipoEstabelecimento");

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
        value={tipoEstabelecimento || ""} // Garantindo valor inicial válido
        fullWidth
        margin="normal"
        error={!!errors.tipoEstabelecimento}
        helperText={errors.tipoEstabelecimento?.message}
        onChange={(event) =>
          setValue("tipoEstabelecimento", event.target.value)
        } // Corrigindo manipulação do select
      >
        <MenuItem value="">Selecione</MenuItem>
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

function ProprietarioStep({ onBack }: StepProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<EstabelecimentoFormData>();

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
