import { Avatar, Box, Card, CardContent, Typography, Button } from "@mui/material";

interface User {
  name: string;
  email: string;
  avatarUrl: string;
}

const user: User = {
  name: "Gabriel Rocha",
  email: "gabriel@decode.software",
  avatarUrl: "https://via.placeholder.com/150",
};

export default function ProfileComponent() {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
      <Card sx={{ maxWidth: 400, padding: 3, textAlign: "center", boxShadow: 3 }}>
        <Avatar src={user.avatarUrl} sx={{ width: 100, height: 100, margin: "0 auto" }} />
        <CardContent>
          <Typography variant="h5" fontWeight="bold">
            {user.name}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {user.email}
          </Typography>
          <Button variant="contained" color="primary" sx={{ marginTop: 2 }}>
            Editar Perfil
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
