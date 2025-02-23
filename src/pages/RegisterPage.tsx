import { useState } from "react";
import {
  Container,
  MenuItem,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import FormPessoaFisica from "../components/FormPessoaFisica";
import { EstabelecimentoForm } from "../components/FormEstabelecimento";
import { useNavigate } from "react-router-dom";

type CadastroTipo = "Pessoa Física" | "Estabelecimento";

export default function RegisterPage() {
  const [type, setType] = useState<CadastroTipo>("Pessoa Física");
  const navigate = useNavigate();

  const handleSubmit = (data: any) => {
    console.log("Dados enviados:", data);
    navigate("/home"); // it must have auth before (just4development)
  };

  const handleEstabelecimentoSubmit = async (data: any) => {
    console.log("Dados enviados:", data);

    try {
      const response = await fetch(
        "https://s01.decodesoftware.tech/estabelecimentos",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome: data.nomeEstabelecimento,
            cnpj: data.cnpj,
            endereco: data.endereco,
            senha_acesso: data.senhaAcesso,
            tipo_estabelecimento: data.tipoEstabelecimento,
            aberto: false,
            website: "",
            promocao_rolando: false,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao cadastrar estabelecimento");
      }

      alert("Estabelecimento cadastrado com sucesso!");
      navigate("/home"); // Redireciona para /home após o sucesso
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Falha ao cadastrar estabelecimento");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Cadastro
        </Typography>

        <TextField
          select
          fullWidth
          label="Tipo de Cadastro"
          value={type}
          onChange={(e) => setType(e.target.value as CadastroTipo)}
          sx={{ mb: 2 }}
        >
          <MenuItem value="Pessoa Física">Pessoa Física</MenuItem>
          <MenuItem value="Estabelecimento">Estabelecimento</MenuItem>
        </TextField>

        {type === "Pessoa Física" ? (
          <FormPessoaFisica onSubmit={handleSubmit} />
        ) : (
          <EstabelecimentoForm onSubmit={handleEstabelecimentoSubmit} />
        )}
      </Paper>
    </Container>
  );
}
