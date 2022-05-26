import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import tsconfigPaths from "vite-tsconfig-paths";
import visualizer from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [solidPlugin(), tsconfigPaths(), visualizer()],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
});
