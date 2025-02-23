import { Typography } from "@mui/material";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <div style={{ zIndex: 1000, backgroundColor: "#fff" }}>
      <Typography variant="body2" color="text.secondary">
        © {currentYear} - Todos os direitos reservados
      </Typography>
    </div>
  );
}
