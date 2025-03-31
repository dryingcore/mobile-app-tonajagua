import React from "react";
import { Box, Typography } from "@mui/material";

interface Category {
  id: number;
  nome: string;
  foto_url: string;
}

interface CategoryListProps {
  onSelectCategory: (categoria: string) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({ onSelectCategory }) => {
  const categories: Category[] = [
    { id: 1, nome: "Todos", foto_url: "/icons/todos.png" },
    { id: 2, nome: "Restaurante", foto_url: "/icons/restaurante.png" },
    { id: 3, nome: "Mercado", foto_url: "/icons/mercado.png" },
    { id: 4, nome: "Oficina", foto_url: "/icons/oficina.png" },
    { id: 5, nome: "Serviços", foto_url: "/icons/servicos-digitais.png" },
    { id: 6, nome: "Hotel", foto_url: "/icons/hotel.png" },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 1, mt: 1 }}>
        Categorias
      </Typography>

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
