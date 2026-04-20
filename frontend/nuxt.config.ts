import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || "http://localhost:3001",
    },
  },
  css: ["~/assets/css/main.css"],
  modules: ["@pinia/nuxt"],
  vite: {
    plugins: [tailwindcss()],
  },
  compatibilityDate: "2025-01-01",
});
