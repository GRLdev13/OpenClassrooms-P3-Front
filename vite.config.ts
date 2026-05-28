import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  
  plugins: [tailwindcss(), reactRouter()],
  resolve: {
    tsconfigPaths: true,
  },
  build: {
  minify: 'terser',
    terserOptions: {
      compress: {
        pure_funcs: ['console.log', 'console.info'], // Use this to keep specific methods
      },
    },
  },
});
