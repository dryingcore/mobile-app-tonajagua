import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "#ToNaJagua",
        short_name: "#ToNaJagua",
        description: "Descrição do app",
        start_url: "/",
        display: "standalone", // Isso garante que o app se comporte sem a barra de navegação
        theme_color: "#ffffff",
        background_color: "#ffffff", // Adicionando a cor de fundo
        icons: [
          {
            src: "/favicon.ico",
            sizes: "192x192",
            type: "image/x-icon",
          },
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
