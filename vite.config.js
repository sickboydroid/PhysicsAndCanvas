import { defineConfig } from "vite";

export default defineConfig({
  // This ensures paths are relative
  base: "./",

  build: {
    outDir: "dist",
  },
});
