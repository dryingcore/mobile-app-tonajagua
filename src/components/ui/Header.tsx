import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { HamburgerMenu } from "./HamburguerMenu";

export default function Header() {
  return (
    <AppBar
      position="fixed"
      sx={{
        height: 60,
        background: "#fff",
        color: "#000",
        borderRadius: 0,
        p: 1,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1100,
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo e texto à esquerda */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <HamburgerMenu />
        </Box>

        {/* Hashtag à direita */}
        <Typography variant="body2" fontWeight="bold">
          #TÔNAJAGUA❤️
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
