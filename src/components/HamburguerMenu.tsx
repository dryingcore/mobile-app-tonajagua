import { useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export function HamburgerMenu() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (isOpen: boolean) => () => {
    setOpen(isOpen);
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
            <Typography variant="body2" fontWeight="bold">
              #NÓS❤️CAMACHO
            </Typography>
            <Typography variant="caption" color="gray">
              Associação Amigos <br /> Balneário Camacho
            </Typography>
          </Box>

          <List>
            {["Perfil", "Conta", "Sobre Nós", "Configurações"].map((text) => (
              <ListItem key={text}>
                <ListItemButton onClick={toggleDrawer(false)}>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
}
