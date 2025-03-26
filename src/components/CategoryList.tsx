import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

interface Category {
  id: number;
  nome: string;
  foto_url: string;
}

interface CategoryListProps {
  onSelectCategory: (categoria: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://s01.decodesoftware.tech/estabelecimentos/tipos"
        );

        if (!response.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }

        const json = await response.json();
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

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">Erro: {error}</Typography>;

  return (
    <Box sx={{ width: "100%", padding: "10px" }}>
      <Box>
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, mt: 2 }}>
          Categorias
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          whiteSpace: "nowrap",
          scrollbarWidth: "none",
          "&::-webkit-scrollbar": { display: "none" },
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
              minWidth: "80px",
              cursor: "pointer",
              "&:hover": { opacity: 0.7 },
            }}
            onClick={() => onSelectCategory(category.nome)}
          >
            <img
              src={category.foto_url}
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
