import { defineConfig } from "vite";
import { resolve } from "path";
import fs from "fs";

// This helper function scans 'projects' folder
function getProjectEntries() {
  const pages = {
    main: resolve(__dirname, "index.html"),
  };

  // Path to the projects directory
  const projectsDir = resolve(__dirname, "projects");

  if (fs.existsSync(projectsDir)) {
    // Read all folders inside ./projects
    const folders = fs.readdirSync(projectsDir);

    folders.forEach((folder) => {
      // Check if this folder has an index.html
      const htmlPath = resolve(projectsDir, folder, "index.html");

      if (fs.existsSync(htmlPath)) {
        // Add it to the build inputs
        // Key (folder) becomes the chunk name
        pages[folder] = htmlPath;
      }
    });
  }

  return pages;
}

export default defineConfig({
  base: "./",

  build: {
    rollupOptions: {
      // dynamic input configuration
      input: getProjectEntries(),
    },
  },
});
