import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@redux": path.resolve(__dirname, "./src/redux"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@styles": path.resolve(__dirname, "./src/styles"),
    },
  },
});
