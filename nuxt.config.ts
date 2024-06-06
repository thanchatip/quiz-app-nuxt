// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: ['nuxt-primevue'],
  primevue: {
    components: {
      exclude: [],
    },
  },
  css: ['primevue/resources/themes/aura-light-green/theme.css'],
});
