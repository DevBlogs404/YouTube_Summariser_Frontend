import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  // server: {
  //   port: 6969 || 8000,
  //   proxy: {
  //     "/api": "http://localhost:6969",
  //   },
  // },
  plugins: [react()],
});
