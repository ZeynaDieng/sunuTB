<template>
  <div class="group cursor-pointer w-full max-w-sm mx-auto">
    <div class="aspect-[3/4] rounded-xl overflow-hidden bg-surface-container relative mb-4">

      <!-- PROMO -->
      <div v-if="product.onSale" class="absolute top-4 left-4 z-10">
        <span class="bg-error text-on-error px-2 py-1 rounded-full text-xs font-bold">
          PROMO
        </span>
      </div>

      <!-- IMAGE / FALLBACK -->
      <NuxtLink :to="`/products/${product.id}`" class="block w-full h-full">

        <!-- IMAGE -->
        <img
          v-if="hasValidImage && !imageError"
          :src="product.image"
          :alt="product.name"
          class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
          @error="imageError = true"
        />

        <!-- FALLBACK INITIALES -->
        <div
          v-else
          class="w-full h-full flex flex-col items-center justify-center gap-3 bg-surface-container"
        >
          <span class="text-[72px] font-semibold text-on-surface/20">
            {{ productInitial }}
          </span>

          <div class="w-6 h-px bg-outline-variant/40"></div>

          <span class="text-[11px] uppercase tracking-[0.15em] text-on-surface/30 text-center px-8">
            {{ product.name }}
          </span>
        </div>

      </NuxtLink>

      <!-- ❤️ FAVORI (COEUR REMPLI STYLE INSTAGRAM) -->
      <!--  <div class="absolute top-3 right-3 z-20 sm:top-4 sm:right-4">
        <button
          @click.prevent.stop="toggleFavorite"
          class="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/80 backdrop-blur-md shadow-sm transition-all duration-300 hover:scale-110 active:scale-95"
        >
          <span
            class="material-symbols-outlined text-[20px] transition-all duration-300"
            :class="isFavorite 
              ? 'text-red-500 fill-red-500 scale-110' 
              : 'text-black/70'"
          >
            {{ isFavorite ? 'favorite' : 'favorite_border' }}
          </span>
        </button>
      </div> -->

      <!-- 📦 STOCK (ALIGNÉ AVEC COULEUR DU SITE) -->
      <div class="absolute top-3 left-3 z-10 sm:top-4 sm:left-4">
        <div 
          class="px-2 py-1 sm:px-3 rounded-full text-[9px] sm:text-[10px] font-medium backdrop-blur-md border border-white/20 first-letter:uppercase"
          :class="product.stockStatus === 'in_stock' 
            ? 'bg-primary/90 text-white' 
            : product.stockStatus === 'low_stock' 
            ? 'bg-primary/70 text-white' 
            : 'bg-error/90 text-white'"
        >
          {{ product.stockStatus === 'in_stock' ? 'Disponible' 
             : product.stockStatus === 'low_stock' 
             ? `${product.stock} restants` 
             : 'Rupture' }}
        </div>
      </div>

      <!-- 🛒 PANIER -->
      <div class="absolute bottom-0 inset-x-0 translate-y-full group-hover:translate-y-0 transition-transform p-3 sm:p-4 z-10">
        <button
          @click.prevent="addToCart"
          :disabled="!product.available || product.stockStatus === 'out_of_stock'"
          class="w-full py-2.5 sm:py-3 rounded-lg font-bold text-xs sm:text-sm shadow-xl active:scale-95 transition-transform disabled:opacity-50 first-letter:uppercase"
          :class="product.stockStatus === 'out_of_stock' 
            ? 'bg-error-container text-on-error-container' 
            : product.stockStatus === 'low_stock'
            ? 'bg-warning-container text-on-warning-container'
            : 'bg-secondary-container text-on-secondary-container'"
        >
          {{ product.stockStatus === 'out_of_stock' 
            ? 'RUPTURE' 
            : product.stockStatus === 'low_stock'
            ? `AJOUTER (${product.stock})`
            : 'AJOUTER RAPIDE' }}
        </button>
      </div>

    </div>

    <!-- INFOS -->
    <div class="space-y-2 sm:space-y-1">
      <NuxtLink :to="`/products/${product.id}`">
        <h4 class="text-sm sm:title-md font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2 leading-tight first-letter:uppercase">
          {{ product.name }}
        </h4>
      </NuxtLink>

      <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
        <p class="text-primary font-bold text-sm sm:text-base first-letter:uppercase">{{ displayPrice }} FCFA</p>

        <p v-if="isOnSale && displayOriginalPrice"
           class="text-on-surface-variant text-xs sm:text-sm line-through first-letter:uppercase">
          {{ displayOriginalPrice }} FCFA
        </p>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { useCart } from '~/stores/cart'
import { useCartDrawer } from '~/stores/cartDrawer'
import { useFavoritesStore } from '~/stores/favorites'
import type { AdaptedProduct } from '~/utils/productAdapter'

const props = defineProps<{ product: AdaptedProduct }>()

const cart = useCart()
const drawer = useCartDrawer()
const favorites = useFavoritesStore()

const imageError = ref(false)

const INVALID_PATTERNS = ['placeholder', 'no-image', 'default', '.svg']

const hasValidImage = computed(() => {
  const url = props.product.image
  if (!url) return false
  return !INVALID_PATTERNS.some(p => url.toLowerCase().includes(p))
})

const productInitial = computed(() =>
  props.product.name?.charAt(0).toUpperCase() ?? '?'
)

const displayPrice = computed(() =>
  props.product.price
    ? Math.round(props.product.price).toLocaleString('fr-FR')
    : '0'
)

const displayOriginalPrice = computed(() =>
  props.product.originalPrice && props.product.onSale
    ? Math.round(props.product.originalPrice).toLocaleString('fr-FR')
    : null
)

const isOnSale = computed(() => props.product.onSale === true)

const isFavorite = computed(() => {
  if (!props.product.id || props.product.id === 'undefined' || props.product.id === '') {
    console.warn('ProductCard: Produit sans ID pour isFavorite', props.product)
    return false
  }
  return favorites.isFavorite(props.product.id)
})

const toggleFavorite = () => {
  // Validation de l'ID du produit
  if (!props.product.id || props.product.id === 'undefined' || props.product.id === '') {
    console.error('ProductCard: Produit sans ID valide', props.product)
    // Créer un ID temporaire basé sur le nom si l'ID est manquant
    if (props.product.name) {
      const tempProduct = {
        ...props.product,
        id: `temp-${props.product.name.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`
      }
      console.log('ProductCard: Utilisation ID temporaire:', tempProduct.id)
      favorites.toggleFavorite(tempProduct)
    } else {
      favorites.showNotification('Erreur: Produit invalide', 'error')
    }
    return
  }
  
  favorites.toggleFavorite(props.product)
}

onMounted(() => {
  if (favorites.items.length === 0) {
    favorites.initializeFavorites()
  }
})

const addToCart = () => {
  if (!props.product.available || props.product.stockStatus === 'out_of_stock') return
  cart.addItem(props.product)
  drawer.open()
}
</script>