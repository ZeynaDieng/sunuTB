// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss'
  ],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    // Private keys (only available on server-side)
    orionApiBase: process.env.NUXT_ORION_API_BASE,
    orionStoreSlug: process.env.NUXT_ORION_STORE_SLUG,
    
    // Public keys (exposed to client-side)
    public: {
      // Add any public runtime config here
    }
  },
  app: {
    head: {
      title: 'The Editorial Merchant | Curated Minimalism',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Curating the finest essentials for modern lifestyle since 2024.' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { href: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600&display=swap', rel: 'stylesheet' },
        { href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap', rel: 'stylesheet' }
      ]
    }
  }
})
