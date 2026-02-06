import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages base path — change "/hnz/" to match your repo name
export default defineConfig({
  plugins: [react()],
  base: "/hnz/",
});
