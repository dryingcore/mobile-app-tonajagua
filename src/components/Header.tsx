import { AppBar, Toolbar, Typography, Box } from "@mui/material";

export default function Header() {
  return (
    <AppBar
      position="fixed"
      sx={{
        background: "#fff",
        color: "#000",
        borderRadius: 0, // Remove as bordas arredondadas para ocupar 100%
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
          <img
            src="/logo.png" // Substitua pelo caminho correto do logo
            alt="Logo"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              marginRight: 8,
            }}
          />
          <Box>
            <Typography variant="body2" fontWeight="bold">
              #NÓS❤️CAMACHO
            </Typography>
            <Typography variant="caption" color="gray">
              Associação Amigos <br /> Balneário Camacho
            </Typography>
          </Box>
        </Box>

        {/* Hashtag à direita */}
        <Typography variant="body2" fontWeight="bold">
          #TÔNAJAGUA❤️
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
