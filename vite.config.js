import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  // Matches the `homepage` field: the app is served from a subpath on GitHub Pages.
  base: "/bigtime/",
  build: {
    outDir: "build",
  },
  plugins: [
    react(),
    VitePWA({
      // The app shows its own toaster when an update is ready, so the new
      // worker must wait until the user accepts instead of taking over.
      registerType: "prompt",
      filename: "service-worker.js",
      // Only js/css/html are precached by default; the icons are needed offline too.
      includeAssets: ["favicon.ico", "favicon.png", "icons/*.png"],
      manifest: {
        short_name: "Big Time",
        name: "Big Time",
        icons: [72, 96, 128, 144, 152, 192, 384, 512].map(size => ({
          src: `icons/icon-${size}x${size}.png`,
          sizes: `${size}x${size}`,
          type: "image/png",
        })),
        start_url: "/bigtime/",
        scope: "/bigtime/",
        display: "standalone",
        theme_color: "#000000",
        background_color: "#000000",
      },
    }),
  ],
  test: {
    environment: "jsdom",
    globals: true,
  },
});
