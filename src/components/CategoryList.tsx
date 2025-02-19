import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

interface Category {
  id: number;
  nome: string;
  icone: string;
}

const CategoryList: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://s01.decodesoftware.tech:4321/estabelecimentos/tipos"
        );

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }

        const json = await response.json();
        console.log("Resposta da API:", json); // Debug

        if (!json.data || !Array.isArray(json.data)) {
          throw new Error("A resposta da API não contém o array esperado.");
        }

        setCategories(json.data);
      } catch (error: any) {
        console.error("Erro ao buscar categorias:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">Erro: {error}</Typography>;
  }

  return (
    <Box sx={{ width: "100%", padding: "10px" }}>
      <Typography variant="h6" fontWeight="bold">
        Categorias
      </Typography>

      {/* Lista deslizante */}
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          whiteSpace: "nowrap",
          scrollbarWidth: "none", // Oculta scrollbar no Firefox
          "&::-webkit-scrollbar": { display: "none" }, // Oculta scrollbar no Chrome/Safari
        }}
      >
        {categories.map((category) => (
          <Box
            key={category.id}
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              minWidth: "80px", // Ajuste para evitar cortes em telas pequenas
            }}
          >
            <img
              src={"logo.png"}
              alt={category.nome}
              style={{
                width: 50,
                height: 50,
                objectFit: "contain",
                marginBottom: 5,
              }}
            />
            <Typography variant="body2" fontWeight="bold">
              {category.nome}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CategoryList;
