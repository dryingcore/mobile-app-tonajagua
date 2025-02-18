import Header from "../components/Header";
import ItemList from "../components/ItemList";
import CategoryList from "../components/CategoryList";

export default function HomePage() {
  return (
    <>
      <Header />
      <CategoryList />
      <ItemList />
    </>
  );
}
