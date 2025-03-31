import { ReactElement, useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const imageBaseUrl = "https://s01.decodesoftware.tech/uploads/camacho/";
const images = [
  "desobstrucao.jpg",
  "energia-camacho.jpg",
  "praia.jpg",
  "praia2.jpg",
  "praia3.jpg",
  "trabalho-de-desobstrucao.jpg",
];

export default function ImageCarrossel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [storedImages, setStoredImages] = useState<string[]>([]);

  useEffect(() => {
    // Verificar se as imagens estão no localStorage
    const storedData = localStorage.getItem("images");

    if (storedData) {
      // Se as imagens estão no localStorage, use-as
      setStoredImages(JSON.parse(storedData));
    } else {
      // Caso contrário, faça o processo de armazenar as imagens
      const imageUrls = images.map((img) => `${imageBaseUrl}${img}`);
      setStoredImages(imageUrls);

      // Salve no localStorage
      localStorage.setItem("images", JSON.stringify(imageUrls));
    }
  }, []);

  const imagesToShow: ReactElement[] = storedImages.map((imgUrl, index) => {
    const altText = images[index]
      .replace(/-/g, " ")
      .replace(".jpg", "")
      .toUpperCase();

    return (
      <Box
        key={imgUrl}
        sx={{
          width: "100%",
          height: "100px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        <img
          src={imgUrl}
          alt={altText}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
    );
  });

  return (
    <Box sx={{ mx: "auto", mt: "6rem", maxWidth: "800px" }}>
      <Carousel
        selectedItem={currentIndex}
        onChange={(index: number) => setCurrentIndex(index)}
        showArrows={false}
        showThumbs={false}
        infiniteLoop
        autoPlay
        interval={5000}
        stopOnHover
        showIndicators={false}
        showStatus={false}
      >
        {imagesToShow}
      </Carousel>
    </Box>
  );
}
