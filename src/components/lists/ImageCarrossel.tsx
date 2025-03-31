import { ReactElement, useState } from "react";
import { Box } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// Importação direta das imagens
import desobstrucao from "/images/desobstrução.jpg";
import lagoa from "/images/lagoa.jpeg";
import energiaCamacho from "/images/energia-camacho.jpg";
import praia from "/images/praia.jpg";
import praia2 from "/images/praia2.jpg";
import praia3 from "/images/praia3.jpg";
import trabalhoDeDesobstrucao from "/images/trabalho-de-desobstrução.jpeg";

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

/**
 * Componente que renderiza um carrossel de imagens.
 *
 * @remarks
 * As imagens são importadas direto do diretório `images` e são
 * renderizadas com um estilo de `object-fit: cover` para que sejam
 * exibidas de forma responsiva.
 *
 * O carrossel tem as seguintes configurações:
 * - `selectedItem`: o índice da imagem atual;
 * - `onChange`: uma função que é chamada quando o usuário muda a
 * imagem atual;
 * - `showArrows`: false, para que as setas de navegação sejam ocultadas;
 * - `showThumbs`: false, para que as miniaturas sejam ocultadas;
 * - `infiniteLoop`: true, para que o carrossel seja exibido em loop;
 * - `autoPlay`: true, para que o carrossel seja iniciado automaticamente;
 * - `interval`: 5000, para que o carrossel seja atualizado a cada 5 segundos;
 * - `stopOnHover`: true, para que o carrossel seja pausado quando o usuário
 * passa o mouse sobre ele;
 * - `showIndicators`: false, para que os indicadores sejam ocultados;
 * - `showStatus`: false, para que o status do carrossel seja ocultado.
 */
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
