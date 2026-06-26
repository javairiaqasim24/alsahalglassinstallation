import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { fileURLToPath } from "url";
import { createRequire } from "module";
import { componentTagger } from "lovable-tagger";

const require = createRequire(import.meta.url);
const prerender = require("vite-plugin-prerender");
const puppeteer = require("puppeteer");

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const PRERENDER_ROUTES = [
  "/",
  "/about",
  "/services",
  "/contact",
  "/gallery",
  "/reviews",
  "/blog",
  "/glass-installation",
  "/mattress-cleaning",
  "/ac-duct-cleaning",
  "/ac-duct-installation",
  "/ac-duct-maintenance",
  "/hvac-services",
];

// https://vitejs.dev/config/
export default defineConfig(async ({ mode }) => {
  const chromePath =
    mode === "production" ? await puppeteer.executablePath() : undefined;

  return {
    server: {
      host: "::",
      port: 8080,
      hmr: {
        overlay: false,
      },
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
      mode === "production" &&
        prerender({
          staticDir: path.join(__dirname, "dist"),
          routes: PRERENDER_ROUTES,
          renderer: new prerender.PuppeteerRenderer({
            headless: true,
            executablePath: chromePath,
            renderAfterTime: 3000,
            renderAfterElementExists: "main h1",
          }),
        }),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
