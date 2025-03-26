import { useState } from "react";
import Header from "../components/Header";
import ItemList from "../components/ItemList";
import CategoryList from "../components/CategoryList";
import ImageCarrossel from "../components/ImageCarrossel";

export default function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >();

  return (
    <>
      <Header />
      <ImageCarrossel />
      <CategoryList onSelectCategory={setSelectedCategory} />
      <hr style={{ width: "100%", height: "0px" }} />
      <ItemList categoria={selectedCategory} />
    </>
  );
}
