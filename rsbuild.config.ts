import { defineConfig } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    entry: {
      index: "./src/main.tsx",
    },
  },
  html: {
    template: "./src/index.html",
  },
  server: {
    port: 3000,
    open: true,
  },
  output: {
    sourceMap: {
      js: "source-map",
    },
  },
});
