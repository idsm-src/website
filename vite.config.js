import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";


export default defineConfig({
  plugins: [react()],
  define: {
    // some dependencies of Ketcher refer to the global object of Node.js and to its environment variable NODE_DEBUG,
    // which the build replaces by itself, but not the development server
    global: "globalThis",
    "process.env.NODE_DEBUG": "undefined",
  },
  build: {
    // the directory the website is deployed from
    outDir: "build",
    rolldownOptions: {
      output: {
        // ontotext-yasgui-web-component looks its services up by the names of their classes
        keepNames: true,
      },
    },
  },
  test: {
    environment: "jsdom",
    setupFiles: ["src/setupTests.js"],
  },
});
