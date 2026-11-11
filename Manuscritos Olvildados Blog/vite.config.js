import { defineConfig } from "vite";
import { fileURLToPath } from "node:url";

const pagina = (nombre) => fileURLToPath(new URL(nombre, import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        inicio: pagina("./index.html"),
        post: pagina("./post.html"),
        sobre: pagina("./sobre.html"),
        contacto: pagina("./contacto.html"),
        privacidad: pagina("./privacidad.html"),
        cookies: pagina("./cookies.html"),
      },
    },
  },
});
