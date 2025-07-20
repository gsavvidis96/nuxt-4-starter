import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  ssr: false,
  app: {
    head: {
      title: "nuxt-4-starter",
    },
  },
  css: ["@/assets/style.scss"],
  runtimeConfig: {
    public: {
      apiUrl: "",
    },
  },
  build: {
    transpile: ["vuetify"],
  },
  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error needed for vuetify config
        config.plugins.push(vuetify({ autoImport: true }));
      });
    },
    "@nuxt/eslint",
    "@nuxt/fonts",
    "@vueuse/nuxt",
    "@vee-validate/nuxt",
    "@pinia/nuxt",
    "dayjs-nuxt",
  ],
  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
  fonts: {
    defaults: {
      weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
      styles: ["normal", "italic"],
    },
  },
  dayjs: {
    plugins: ["utc"],
    defaultLocale: "en",
  },
});
