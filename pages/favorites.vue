<template>
  <div class="pt-24 pb-16 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
    <!-- Données structurées Schema.org -->
    <JsonLd 
      type="breadcrumb" 
      :breadcrumbs="[
        { name: 'Mes Favoris', url: '/favorites' }
      ]" 
    />

    <!-- Header -->
    <header class="text-center mb-12">
      <h1 class="text-4xl md:text-5xl font-headline font-extrabold tracking-tighter mb-6">Mes Favoris</h1>
      <p class="text-xl text-on-surface-variant leading-relaxed max-w-3xl mx-auto">
        Retrouvez tous vos produits préférés en un seul endroit.
      </p>
    </header>

    <!-- Loading State -->
    <div v-if="favorites.isLoading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
    </div>

    <!-- Empty State -->
    <div v-else-if="favorites.items.length === 0" class="text-center py-20">
      <div class="max-w-md mx-auto">
        <div class="w-24 h-24 mx-auto mb-6 rounded-full bg-surface-container flex items-center justify-center">
          <span class="material-symbols-outlined text-4xl text-on-surface-variant">favorite_border</span>
        </div>
        <h2 class="text-2xl font-bold mb-4">Aucun favori pour le moment</h2>
        <p class="text-on-surface-variant mb-8">
          Commencez à ajouter des produits à vos favoris pour les retrouver facilement ici.
        </p>
        <NuxtLink
          to="/shop"
          class="bg-primary text-on-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary-container transition-colors inline-flex items-center gap-2"
        >
          <span class="material-symbols-outlined">shopping_bag</span>
          Parcourir la Boutique
        </NuxtLink>
      </div>
    </div>

    <!-- Favorites Grid -->
    <div v-else>
      <!-- Stats -->
      <div class="bg-surface-container-low rounded-xl p-6 mb-8">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-3">
            <span class="material-symbols-outlined text-2xl text-primary">favorite</span>
            <div>
              <p class="font-semibold text-lg">{{ favorites.favoriteCount }} produit(s) en favori</p>
              <p class="text-sm text-on-surface-variant">
                Ajoutés entre {{ formatDate(oldestFavorite) }} et {{ formatDate(newestFavorite) }}
              </p>
            </div>
          </div>
          <button
            @click="clearAllFavorites"
            class="text-error hover:bg-error/10 px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
          >
            <span class="material-symbols-outlined">delete</span>
            Tout supprimer
          </button>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div
          v-for="favorite in favorites.items"
          :key="favorite.productId"
          class="group relative"
        >
          <!-- Product Card -->
          <div class="aspect-[3/4] rounded-xl overflow-hidden bg-surface-container relative">
            <!-- Remove Button -->
            <button
              @click="removeFromFavorites(favorite.productId)"
              class="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-error/90 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <span class="material-symbols-outlined text-[16px]">close</span>
            </button>

            <!-- Product Link -->
            <NuxtLink :to="`/products/${favorite.productId}`" class="block w-full h-full">
              <!-- Product Image with Initials Fallback -->
              <div class="w-full h-full relative">
                <!-- IMAGE -->
                <img
                  v-if="hasValidImage(favorite.product.image) && !imageErrors[favorite.product.image]"
                  :src="favorite.product.image"
                  :alt="favorite.product.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  @error="imageErrors[favorite.product.image] = true"
                />
                
                <!-- FALLBACK INITIALES -->
                <div
                  v-else
                  class="w-full h-full flex flex-col items-center justify-center gap-3 bg-surface-container group-hover:scale-105 transition-transform duration-500"
                >
                  <span class="text-[72px] font-semibold text-on-surface/20">
                    {{ getProductInitial(favorite.product.name) }}
                  </span>
                  <div class="w-6 h-px bg-outline-variant/40"></div>
                  <span class="text-[11px] uppercase tracking-[0.15em] text-on-surface/30 text-center px-8">
                    {{ favorite.product.name }}
                  </span>
                </div>
              </div>
            </NuxtLink>
          </div>

          <!-- Product Info -->
          <div class="mt-4">
            <h3 class="font-semibold text-lg mb-2 line-clamp-2">{{ favorite.product.name }}</h3>
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <span class="text-xl font-bold text-primary">
                  {{ formatPrice(favorite.product.price) }} FCFA
                </span>
                <span
                  v-if="favorite.product.onSale && favorite.product.originalPrice"
                  class="text-sm text-on-surface-variant line-through"
                >
                  {{ formatPrice(favorite.product.originalPrice) }} FCFA
                </span>
              </div>
              <span
                v-if="favorite.product.onSale"
                class="bg-error text-on-error px-2 py-1 rounded-full text-xs font-bold"
              >
                PROMO
              </span>
            </div>
            <div class="flex gap-2">
              <button
                @click="addToCart(favorite.product)"
                class="flex-1 bg-primary text-on-primary px-4 py-2 rounded-lg font-semibold hover:bg-primary-container transition-colors flex items-center justify-center gap-2"
              >
                <span class="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                Ajouter
              </button>
              <NuxtLink
                :to="`/products/${favorite.productId}`"
                class="bg-surface-container text-on-surface px-4 py-2 rounded-lg font-semibold hover:bg-surface-container-high transition-colors flex items-center justify-center"
              >
                <span class="material-symbols-outlined text-[18px]">visibility</span>
              </NuxtLink>
            </div>
          </div>

          <!-- Added Date -->
          <div class="mt-2 text-xs text-on-surface-variant">
            Ajouté le {{ formatDate(favorite.addedAt) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFavoritesStore } from '~/stores/favorites'
import { useCart } from '~/stores/cart'
import type { AdaptedProduct } from '~/utils/productAdapter'

// Meta tags
useHead({
  title: 'Mes Favoris | Sunu Tawfekh',
  meta: [
    { name: 'description', content: 'Retrouvez tous vos produits préférés chez Sunu Tawfekh, votre boutique de confiance à Dakar.' },
    { name: 'keywords', content: 'favoris, produits préférés, sunutawfekh, boutique dakar' }
  ]
})

const favorites = useFavoritesStore()
const cart = useCart()

// Image error tracking
const imageErrors = ref<Record<string, boolean>>({})

// Image validation patterns
const INVALID_PATTERNS = ['placeholder', 'no-image', 'default', '.svg']

// Initialize favorites on page load
onMounted(() => {
  if (favorites.items.length === 0) {
    favorites.initializeFavorites()
  }
})

// Helper functions
const hasValidImage = (imagePath: string): boolean => {
  if (!imagePath) return false
  return !INVALID_PATTERNS.some(pattern => imagePath.toLowerCase().includes(pattern))
}

const getProductInitial = (productName: string): string => {
  if (!productName) return '?'
  return productName.charAt(0).toUpperCase()
}

// Computed properties
const oldestFavorite = computed(() => {
  if (favorites.items.length === 0) return null
  return favorites.items.reduce((oldest, current) => 
    new Date(current.addedAt) < new Date(oldest.addedAt) ? current : oldest
  ).addedAt
})

const newestFavorite = computed(() => {
  if (favorites.items.length === 0) return null
  return favorites.items.reduce((newest, current) => 
    new Date(current.addedAt) > new Date(newest.addedAt) ? current : newest
  ).addedAt
})

// Methods
const removeFromFavorites = (productId: string) => {
  favorites.removeFromFavorites(productId)
}

const clearAllFavorites = () => {
  if (confirm('Êtes-vous sûr de vouloir supprimer tous vos favoris ?')) {
    favorites.clearFavorites()
  }
}

const addToCart = (product: AdaptedProduct) => {
  cart.addItem({
    id: product.id,
    name: product.name,
    price: product.price,
    image: product.image,
    quantity: 1
  })
}

const formatPrice = (price: number) => {
  return Math.round(price).toLocaleString('fr-FR')
}

const formatDate = (dateString: string) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
