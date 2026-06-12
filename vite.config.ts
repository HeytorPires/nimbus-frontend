import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/nimbus/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "/var/www/html/nimbus",
    sourcemap: true,
    rollupOptions: {
      input: path.resolve(__dirname, "index.html"),
    },
  },
});
