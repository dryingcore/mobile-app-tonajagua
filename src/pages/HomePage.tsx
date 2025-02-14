import { Container } from "@mui/material";
import Header from "../components/Header";
import ItemList from "../components/ItemList";

export default function HomePage() {
  return (
    <Container>
      <Header />
      <ItemList />
    </Container>
  );
}
