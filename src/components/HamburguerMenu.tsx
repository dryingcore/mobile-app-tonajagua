import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importando o hook de navegação
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Box,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export function HamburgerMenu() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate(); // Inicializando a função de navegação

  const menuOptions = [
    { label: "Início", path: "/home" },
    { label: "Perfil", path: "/perfil" },
    { label: "Conta", path: "/conta" },
    { label: "Sobre Nós", path: "/sobre" },
    { label: "Configurações", path: "/configuracoes" },
  ];

  const toggleDrawer = (isOpen: boolean) => () => {
    setOpen(isOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path); // Redireciona para a página escolhida
    setOpen(false); // Fecha o menu
  };

  return (
    <>
      {/* Botão do menu hamburguer */}
      <IconButton onClick={toggleDrawer(true)} edge="start" color="inherit">
        <MenuIcon />
      </IconButton>

      {/* Modal ocupando 50% da tela */}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        PaperProps={{ sx: { width: "50%" } }}
      >
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Box>
            <img
              src="/logo.png"
              alt="Logo"
              style={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                marginRight: 8,
              }}
            />
            <Typography variant="body2" fontWeight="bold">
              #NÓS❤️CAMACHO
            </Typography>
            <Typography variant="caption" color="gray">
              Associação Amigos <br /> Balneário Camacho
            </Typography>
          </Box>

          <List>
            {menuOptions.map(({ label, path }) => (
              <ListItem key={label} disablePadding>
                <ListItemButton onClick={() => handleNavigation(path)}>
                  <Typography variant="body2">{label}</Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
