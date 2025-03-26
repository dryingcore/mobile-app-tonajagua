import { useState, useEffect } from "react";
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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const url = categoria
          ? `https://s01.decodesoftware.tech/estabelecimentos?categoria=${encodeURIComponent(categoria)}`
          : "https://s01.decodesoftware.tech/estabelecimentos";

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch data");

        const responseData = await response.json();
        setItems(responseData.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoria]); // Atualiza os dados quando a categoria mudar

  const handleOpen = (item: Item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedItem(null);
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
      <Container sx={{ flex: 1, overflowY: "auto", mt: 2, pb: 2 }}>
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
