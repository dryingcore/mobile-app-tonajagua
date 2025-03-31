import { useState } from "react";
import { CircularProgress, Box, Typography } from "@mui/material";
import Header from "../components/ui/Header";
import ItemList from "../components/lists/ItemList";
import CategoryList from "../components/lists/CategoryList";
import ImageCarrossel from "../components/lists/ImageCarrossel";

export default function HomePage({ isMapLoaded }: { isMapLoaded: boolean }) {
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();

  if (!isMapLoaded) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <CircularProgress color="primary" />
        <Typography variant="h6" mt={2}>
          Carregando mapa...
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <Header />
      <ImageCarrossel />
      <CategoryList onSelectCategory={setSelectedCategory} />
      <hr style={{ width: "100%", height: "0px" }} />
      <ItemList categoria={selectedCategory} />
    </>
  );
}
