import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (!id.includes("node_modules")) return;
          // Only split things that don't depend on React being loaded first.
          if (id.includes("gsap")) return "gsap";
          if (id.includes("/i18next") || id.includes("i18next-browser-languagedetector")) return "i18n";
          if (id.includes("lucide-react")) return "icons";
          if (id.includes("posthog") || id.includes("@supabase")) return "vendor-async";
          // Everything else (react, react-dom, radix, tanstack, helmet, react-i18next,
          // react-router, etc.) goes into a single vendor chunk so React is always
          // initialized before any consumer touches React.createContext.
          return "vendor";
        },
      },
    },
  },
}));
