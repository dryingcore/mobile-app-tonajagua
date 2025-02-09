import { useState } from "react";
import {
  Container,
  MenuItem,
  TextField,
  Typography,
  Paper,
} from "@mui/material";
import FormPessoaFisica from "../components/FormPessoaFisica";
import FormEstabelecimento from "../components/FormEstabelecimento";

type CadastroTipo = "Pessoa Física" | "Estabelecimento";

export default function RegisterPage() {
  const [type, setType] = useState<CadastroTipo>("Pessoa Física");

  const handleSubmit = (data: any) => {
    console.log("Dados enviados:", data);
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
          <FormEstabelecimento onSubmit={handleSubmit} />
        )}
      </Paper>
    </Container>
  );
}
