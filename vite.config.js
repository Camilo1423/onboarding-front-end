import react from "@vitejs/plugin-react-swc";
import { execSync } from "child_process";
import path from "path";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: "validate-and-build-plugin",
      apply: "serve", // Ejecutar solo en modo desarrollo
      handleHotUpdate({ file }) {
        if (file.endsWith("routes.json") || file.endsWith("params.json")) {
          execSync("node ./src/build/reload-params.js", { stdio: "inherit" });
        }
      },
    },
  ],
  resolve: {
    alias: {
      "@Components": path.resolve(__dirname, "src/components"),
      "@CptPrivate": path.resolve(__dirname, "src/pages/private/components"),
      "@CptPublic": path.resolve(__dirname, "src/pages/public/components"),
      "@Providers": path.resolve(__dirname, "src/providers"),
      "@Utils": path.resolve(__dirname, "src/utils"),
      "@Styles": path.resolve(__dirname, "src/css"),
      "@Pages": path.resolve(__dirname, "src/pages"),
      "@Hooks": path.resolve(__dirname, "src/hooks"),
      "@Router": path.resolve(__dirname, "src/router"),
      "@Store": path.resolve(__dirname, "src/redux/store"),
      "@Slice": path.resolve(__dirname, "src/redux/slices"),
      "@Http": path.resolve(__dirname, "src/services/api/http.js"),
      "@Services": path.resolve(__dirname, "src/services/use-case"),
      "@Theme": path.resolve(__dirname, "src/theme"),
      "@Constant": path.resolve(__dirname, "src/constant"),
      "@Middleware": path.resolve(__dirname, "src/middleware"),
      "@PackageJson": path.resolve(__dirname, "package.json"),
      "@Assets": path.resolve(__dirname, "src/assets"),
    },
  },
  build: {
    minify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          // Divide las librerías principales en chunks separados
          react: ["react", "react-dom", "react-router-dom"],
          redux: ["@reduxjs/toolkit", "react-redux"],
          utilities: ["axios", "js-cookie"],
          socket: ["socket.io-client"],
          icons: ["@heroicons/react", "react-icons"],
          lucideIcons: ["lucide-react"],
          lottie: ["lottie-react"],
          framerMotion: ["framer-motion"],
          charts: ["recharts"],
          pickersAdons: ["@internationalized/date", "@react-aria/i18n"],
          textEditor: ["@mdxeditor/editor"],
          // Puedes añadir más divisiones según las necesidades
        },
      },
    },
    chunkSizeWarningLimit: 500,
    // Configuración de construcción...
    assetsInclude: [
      // Excluir carpetas específicas
      "!src/build/**/*",
      "!src/configs/**/*",
    ],
  },
});
