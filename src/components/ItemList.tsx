import { useState, useEffect, useCallback } from "react";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Container,
} from "@mui/material";
import CustomModal from "./Modal";
import GoogleMapComponent from "./GoogleMaps";

interface Item {
  id: number;
  nome: string;
  endereco: string;
  tipo_estabelecimento: {
    id: number;
    nome: string;
  };
}

interface ItemListProps {
  categoria?: string;
}

const ItemList: React.FC<ItemListProps> = ({ categoria }) => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const [open, setOpen] = useState(false);

  // Função que vai ser chamada para buscar os dados da API
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Verificar se existe dados em cache para a categoria específica
      const cachedData = localStorage.getItem(`items_${categoria}`);

      if (cachedData) {
        const parsedData = JSON.parse(cachedData);
        setItems(parsedData);
        setLoading(false);
      } else {
        const url = categoria
          ? `https://s01.decodesoftware.tech/estabelecimentos?categoria=${encodeURIComponent(
              categoria
            )}`
          : "https://s01.decodesoftware.tech/estabelecimentos";

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch data");

        const responseData = await response.json();
        setItems(responseData.data);

        // Armazenar os dados no localStorage usando a categoria como chave
        localStorage.setItem(
          `items_${categoria}`,
          JSON.stringify(responseData.data)
        );
        setLoading(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
      setLoading(false);
    }
  }, [categoria]);

  useEffect(() => {
    fetchData(); // Chama a função quando o componente é montado
  }, [fetchData]);

  const handleOpen = (item: Item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const top = e.currentTarget.scrollTop;
    if (top === 0 && !loading) {
      fetchData(); // Atualiza os dados quando o usuário chega ao topo
    }
  };

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
    <Box display="flex" flexDirection="column" height="60vh" width="100%">
      <Container
        sx={{ flex: 1, overflowY: "auto", mt: 0.2, pb: 2, mb: 4 }}
        onScroll={handleScroll} // Adicionando o evento de rolagem
      >
        {items.map((item) => (
          <Card
            key={item.id}
            sx={{
              mb: 1,
              p: 1,
              height: "95px",
              borderRadius: "12px",
              border: "1px solid #ccc",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.2s ease-in-out",
              "&:hover": { transform: "scale(1.02)", cursor: "pointer" },
            }}
            onClick={() => handleOpen(item)}
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
      <CustomModal open={open} onClose={handleClose}>
        {selectedItem && (
          <>
            <Typography variant="h5" fontWeight="bold">
              {selectedItem.nome}
            </Typography>
            <Typography variant="body1" mt={1}>
              Tipo: {selectedItem.tipo_estabelecimento.nome}
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Endereço: {selectedItem.endereco}
            </Typography>
            <hr />
            <GoogleMapComponent address={selectedItem.endereco} />
          </>
        )}
      </CustomModal>
    </Box>
  );
};

export default ItemList;
