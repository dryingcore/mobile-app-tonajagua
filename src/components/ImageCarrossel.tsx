import { ReactElement, useState } from "react";
import { Box } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Importação direta das imagens
import desobstrucao from "/desobstrução.jpg";
import lagoa from "/lagoa.jpeg";
import energiaCamacho from "/energia-camacho.jpg";
import praia from "/praia.jpg";
import praia2 from "/praia2.jpg";
import praia3 from "/praia3.jpg";
import trabalhoDeDesobstrucao from "/trabalho-de-desobstrução.jpeg";

// Lista das imagens importadas
const imageURLs = [
  { url: desobstrucao },
  { url: lagoa },
  { url: energiaCamacho },
  { url: praia },
  { url: praia2 },
  { url: praia3 },
  { url: trabalhoDeDesobstrucao },
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
