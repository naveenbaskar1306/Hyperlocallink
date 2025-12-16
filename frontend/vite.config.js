import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // API
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },

      // Actual uploads folder
      "/uploads": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },

      // FIX for your broken images:
      "/api/uploads": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""), // remove /api prefix
      },
    },
  },
});
