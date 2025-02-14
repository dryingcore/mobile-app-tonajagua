import { Typography } from "@mui/material";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <Typography variant="body2" color="text.secondary">
      © {currentYear} - Todos os direitos reservados
    </Typography>
  );
}
