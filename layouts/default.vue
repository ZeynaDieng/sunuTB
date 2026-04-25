<template>
  <div class="bg-surface text-on-surface font-body antialiased">
    <NuxtRouteAnnouncer />
    <Header />
    <main>
      <NuxtPage />
      <CartDrawer />
    </main>
    <Footer />
  </div>
</template>

<script setup lang="ts">
// Initialize Pinia
import { createPinia } from 'pinia'

const pinia = createPinia()

// Use head for additional meta tags and styling
useHead({
  htmlAttrs: {
    class: 'light'
  },
  style: [
    {
      innerHTML: `
        .material-symbols-outlined {
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
        }
        body { font-family: 'Inter', sans-serif; }
        h1, h2, h3, h4, .brand-font { font-family: 'Plus Jakarta Sans', sans-serif; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `
    }
  ]
})
</script>
