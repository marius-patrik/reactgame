import { defineConfig, loadEnv } from "@rsbuild/core";
import { pluginReact } from "@rsbuild/plugin-react";

const { publicVars } = loadEnv({ prefixes: ["REACT_APP_"] });

export default defineConfig({
  plugins: [pluginReact()],
  source: {
    entry: {
      index: "./src/main.tsx",
    },
    define: publicVars,
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

