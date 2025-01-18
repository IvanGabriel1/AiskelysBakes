import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist", // Especifica el directorio de salida para el build
    rollupOptions: {
      output: {
        chunkFileNames: "assets/js/[name]-[hash].js", // Nombres de archivos de chunks
        entryFileNames: "assets/js/[name]-[hash].js", // Nombres de archivos de entrada
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]", // Nombres de archivos de assets
      },
    },
    terserOptions: {
      compress: {
        drop_console: true, // Elimina los `console.log` en producción
      },
    },
  },
});
