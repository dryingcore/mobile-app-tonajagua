import { ReactElement, useState } from "react";
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

  const imagesToShow: ReactElement[] = images.map((img) => {
    console.log(`${imageBaseUrl}${img}`);
    return (
      <Box
        key={img}
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
          src={`${imageBaseUrl}${img}`}
          alt={img}
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
