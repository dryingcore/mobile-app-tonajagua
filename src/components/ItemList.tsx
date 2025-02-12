import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Container,
} from "@mui/material";
import Header from "./Header";

interface Item {
  id: number;
  nome: string;
  endereco: string;
  tipo_estabelecimento: {
    id: number;
    nome: string;
  };
}

const ItemList = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://s01.decodesoftware.tech/estabelecimentos"
        );
        if (!response.ok) throw new Error("Failed to fetch data");

        const responseData = await response.json();
        const data: Item[] = responseData.data;

        setItems(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress color="primary" />
      </Box>
    );

  if (error)
    return (
      <Typography color="error" textAlign="center" mt={10}>
        {error}
      </Typography>
    );

  return (
    <Box display="flex" flexDirection="column" height="100vh" width="100%">
      {/* Header fixo */}
      <Header />

      {/* Lista com scroll interno */}
      <Container sx={{ flex: 1, overflowY: "auto", mt: 2, pb: 2 }}>
        {items.map((item) => (
          <Card
            key={item.id}
            sx={{
              mb: 2,
              p: 1.5,
              borderRadius: "12px",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s ease-in-out",
              "&:hover": { transform: "scale(1.02)" },
            }}
          >
            <CardContent>
              <Typography variant="h6" fontWeight="bold">
                {item.nome}
              </Typography>
              {item.tipo_estabelecimento?.nome && (
                <Typography variant="body2" color="text.secondary">
                  {item.tipo_estabelecimento.nome}
                </Typography>
              )}
              {item.endereco && (
                <Typography variant="body2" color="text.secondary">
                  {item.endereco}
                </Typography>
              )}
            </CardContent>
          </Card>
        ))}
      </Container>
    </Box>
  );
};

export default ItemList;
