import Header from "../components/Header";
import ItemList from "../components/ItemList";
import CategoryList from "../components/CategoryList";
import ImageCarrossel from "../components/ImageCarrossel";

export default function HomePage() {
  return (
    <>
      <Header />
      <ImageCarrossel />
      <CategoryList />
      <ItemList />
    </>
  );
}
