import { ReactElement, useState, useEffect } from "react";
import { Box } from "@mui/material";
import { Carousel } from "react-responsive-carousel";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
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

  // Função para baixar e salvar a imagem no dispositivo
  const downloadAndStoreImage = async (imageUrl: string, fileName: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const base64 = await convertBlobToBase64(blob);

      // Salva o arquivo no sistema de arquivos do dispositivo
      await Filesystem.writeFile({
        path: `camacho_images/${fileName}`,
        data: base64 as string,
        directory: Directory.Data,
        encoding: Encoding.UTF8,
      });

      return `file:///data/data/com.package/files/camacho_images/${fileName}`; // Caminho do arquivo salvo
    } catch (error) {
      console.error("Erro ao salvar a imagem:", error);
      return null;
    }
  };

  // Converter Blob para Base64
  const convertBlobToBase64 = (blob: Blob) => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  useEffect(() => {
    const loadImages = async () => {
      // Verificar se as imagens estão armazenadas no dispositivo
      const storedData = localStorage.getItem("images");

      if (storedData) {
        // Se as imagens estão armazenadas, use-as
        setStoredImages(JSON.parse(storedData));
      } else {
        // Caso contrário, baixe as imagens e salve no dispositivo
        const imageUrls = await Promise.all(
          images.map(async (img) => {
            const fileName = img;
            const imageUrl = `${imageBaseUrl}${img}`;
            const localImagePath = await downloadAndStoreImage(
              imageUrl,
              fileName
            );

            return localImagePath;
          })
        );

        // Filtra qualquer valor null
        const validImageUrls = imageUrls.filter(
          (url) => url !== null
        ) as string[];

        // Salve o caminho das imagens no localStorage
        setStoredImages(validImageUrls);
        localStorage.setItem("images", JSON.stringify(validImageUrls));
      }
    };

    loadImages();
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
          src={imgUrl} // Agora usa o caminho local da imagem
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
