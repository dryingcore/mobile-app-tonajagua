import { ReactElement, useState } from "react";
import { Box } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Importando as imagens diretamente
const imageURLs = [
  { url: require("../../public/desobstrução.jpg") },
  { url: require("../../public/lagoa.jpeg") },
  { url: require("../../public/energia-camacho.jpg") },
  { url: require("../../public/praia.jpg") },
  { url: require("../../public/praia2.jpg") },
  { url: require("../../public/praia3.jpg") },
  { url: require("../../public/trabalho-de-desobstrução.jpeg") },
];

export default function ImageCarrossel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const imagesToShow: ReactElement[] = imageURLs.map((image, index) => {
    return (
      <Box
        key={index}
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
          src={image.url}
          alt={`Imagem ${index}`}
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
