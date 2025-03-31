import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Container,
  CircularProgress,
} from "@mui/material";
import CustomModal from "../ui/Modal";
import GoogleMapComponent from "../maps/GoogleMaps";
import useFetchItems from "../../hooks/useFetchItems";

interface ItemListProps {
  categoria?: string;
}

const ItemList: React.FC<ItemListProps> = ({ categoria = "Todos" }) => {
  const { items, loading, error, refetch } = useFetchItems();
  const [selectedItem, setSelectedItem] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (item: any) => {
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
      refetch();
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

  const categoryItems = items[categoria] || [];

  return (
    <Box display="flex" flexDirection="column" height="60vh" width="100%">
      <Container
        sx={{ flex: 1, overflowY: "auto", mt: 0.2, pb: 2, mb: 4 }}
        onScroll={handleScroll}
      >
        {categoryItems.map((item) => (
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
              Tipo: {selectedItem.tipo_estabelecimento?.nome}
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
