import "@fortawesome/fontawesome-free/css/all.css";
import "vuetify/styles";
import { createVuetify, type ThemeDefinition } from "vuetify";
import { aliases, fa } from "vuetify/iconsets/fa";

const light: ThemeDefinition = {
  dark: false,
  colors: {},
};

const dark: ThemeDefinition = {
  dark: true,
  colors: {},
};

export default defineNuxtPlugin((app) => {
  const isDark = useDark();

  const vuetify = createVuetify({
    theme: {
      defaultTheme: isDark.value ? "dark" : "light",
      themes: {
        light,
        dark,
      },
    },
    icons: {
      defaultSet: "fa",
      aliases,
      sets: {
        fa,
      },
    },
  });

  app.vueApp.use(vuetify);
});
