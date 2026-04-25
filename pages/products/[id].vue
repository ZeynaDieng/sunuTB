<template>
  <div class="pt-16 sm:pt-20 pb-16 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto">
    <!-- Données structurées Schema.org -->
    <JsonLd type="product" :product="product" />
    <JsonLd
      type="breadcrumb"
      :breadcrumbs="[
        { name: 'Boutique', url: '/shop' },
        { name: product?.name || '', url: `/products/${product?.id}` }
      ]"
    />

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
    </div>

    <!-- Error -->
    <div v-else-if="fetchError" class="text-center py-20">
      <h2 class="text-xl sm:text-2xl font-bold text-error mb-4">Produit Non Trouvé</h2>
      <p class="text-on-surface-variant mb-8 text-sm sm:text-base">{{ fetchError.message }}</p>
      <NuxtLink to="/shop" class="bg-primary text-on-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary-container transition-colors text-sm sm:text-base">
        Retour à la Boutique
      </NuxtLink>
    </div>

    <!-- Product Content -->
    <div v-else-if="product">

      <!-- Breadcrumbs -->
      <nav class="mb-6 sm:mb-8 flex items-center gap-1.5 sm:gap-2 text-on-surface-variant text-xs sm:text-sm flex-wrap">
        <NuxtLink to="/" class="hover:text-primary transition-colors">Accueil</NuxtLink>
        <span class="material-symbols-outlined text-xs">chevron_right</span>
        <NuxtLink to="/shop" class="hover:text-primary transition-colors">Boutique</NuxtLink>
        <span class="material-symbols-outlined text-xs">chevron_right</span>
        <span class="text-on-surface font-semibold line-clamp-1 max-w-[140px] sm:max-w-none">{{ product?.name }}</span>
      </nav>

      <!-- Grid principal -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-start">

        <!-- ── GALERIE ── -->
        <div class="lg:col-span-7 flex flex-col gap-3 sm:gap-4">

          <!-- Image principale -->
          <div class="rounded-xl sm:rounded-2xl overflow-hidden bg-surface-container group">
            <img
              v-if="hasValidImage(currentImage) && !imageErrors[currentImage || '']"
              :src="currentImage"
              :alt="product.name"
              class="w-full h-[300px] sm:h-[440px] md:h-[520px] lg:h-[560px] object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
              @error="imageErrors[currentImage || ''] = true"
            />
            <div
              v-else
              class="w-full h-[300px] sm:h-[440px] md:h-[520px] lg:h-[560px] flex flex-col items-center justify-center gap-3 bg-surface-container"
            >
              <span class="text-[64px] sm:text-8xl font-semibold leading-none tracking-tighter text-on-surface/20 select-none">
                {{ product.name?.charAt(0)?.toUpperCase() || '?' }}
              </span>
              <div class="w-10 h-px bg-outline-variant/40"></div>
              <span class="text-sm font-medium uppercase tracking-[0.15em] text-on-surface/30 text-center px-8 leading-snug select-none">
                {{ product.name }}
              </span>
            </div>
          </div>

          <!-- Thumbnails — scroll horizontal mobile, colonne sur md+ -->
          <div class="flex flex-row gap-2 sm:gap-3 overflow-x-auto pb-1 no-scrollbar">
            <div
              v-for="(image, index) in product.images"
              :key="index"
              @click="currentImageIndex = index"
              :class="currentImageIndex === index ? 'ring-2 ring-primary ring-offset-2' : 'hover:opacity-80'"
              class="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden flex-shrink-0 cursor-pointer transition-all border border-outline-variant/15"
            >
              <img
                v-if="hasValidImage(image) && !imageErrors[image]"
                :src="image"
                :alt="`${product.name} - Image ${index + 1}`"
                class="w-full h-full object-cover"
                loading="lazy"
                @error="imageErrors[image] = true"
              />
              <div
                v-else
                class="w-full h-full flex flex-col items-center justify-center gap-1 bg-surface-container"
              >
                <span class="text-base font-semibold leading-none text-on-surface/20 select-none">
                  {{ product.name?.charAt(0)?.toUpperCase() || '?' }}
                </span>
                <div class="w-3 h-px bg-outline-variant/40"></div>
                <span class="text-[7px] font-medium uppercase tracking-[0.1em] text-on-surface/25 text-center leading-snug select-none px-1">
                  {{ product.name }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- ── INFOS PRODUIT ── -->
        <div class="lg:col-span-5 flex flex-col gap-5 sm:gap-6 lg:sticky lg:top-24">

          <!-- Badges -->
          <div class="flex flex-wrap gap-2">
            <span v-if="product.onSale" class="bg-error text-on-error px-3 py-1 rounded-full text-[11px] font-bold tracking-wider">
              SOLDE
            </span>
            <span
              v-if="product.onSale"
              class="bg-surface-container text-on-surface-variant px-3 py-1 rounded-full text-[11px] font-bold"
            >
              -{{ Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) }}%
            </span>
            <span
              :class="{
                'bg-green-600/15 text-green-700': product.stockStatus === 'in_stock',
                'bg-amber-500/15 text-amber-700': product.stockStatus === 'low_stock',
                'bg-rose-500/15 text-rose-700': product.stockStatus === 'out_of_stock'
              }"
              class="px-3 py-1 rounded-full text-[11px] font-semibold"
            >
              {{ product.stockStatus === 'in_stock' ? 'Disponible' : product.stockStatus === 'low_stock' ? `Plus que ${product.stock} en stock` : 'Rupture de stock' }}
            </span>
          </div>

          <!-- Titre + ref -->
          <div>
            <h1 class="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-on-surface mb-1.5 sm:mb-2 leading-tight">
              {{ product.name }}
            </h1>
            <p class="text-xs text-on-surface-variant">Réf. {{ product.reference }}</p>
          </div>

          <!-- Prix -->
          <div class="flex items-baseline gap-3">
            <p class="text-2xl sm:text-3xl font-bold text-primary">
              {{ Math.round(product.price).toLocaleString('fr-FR') }} FCFA
            </p>
            <p v-if="product.onSale" class="text-base sm:text-lg text-on-surface-variant line-through">
              {{ Math.round(product.originalPrice).toLocaleString('fr-FR') }} FCFA
            </p>
          </div>

          <!-- Stock info -->
          <p class="text-xs text-on-surface-variant -mt-2">
            <span v-if="product.stockStatus === 'in_stock'">{{ product.stock }} articles disponibles</span>
            <span v-else-if="product.stockStatus === 'low_stock'">Plus que {{ product.stock }} articles — commandez vite !</span>
            <span v-else>Actuellement en rupture de stock</span>
          </p>

          <!-- Variantes -->
          <div v-if="product.hasVariants && product.variants.length > 0" class="flex flex-col gap-5">
            <div v-for="option in product.options" :key="option.name">
              <label class="text-[11px] font-bold tracking-widest text-on-surface-variant mb-2.5 block uppercase">
                {{ option.name }}
              </label>
              <div class="flex gap-2 flex-wrap">
                <button
                  v-for="optionValue in option.options"
                  :key="optionValue"
                  @click="selectVariant(option.name, optionValue)"
                  :class="isVariantSelected(option.name, optionValue)
                    ? 'ring-2 ring-primary ring-offset-1 bg-primary-container text-on-primary-container'
                    : 'bg-surface-container hover:bg-surface-container-high text-on-surface'"
                  class="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg border border-outline-variant transition-all text-sm font-medium active:scale-95"
                >
                  {{ optionValue }}
                </button>
              </div>
            </div>

            <!-- Variante sélectionnée -->
            <div v-if="selectedVariant" class="bg-surface-container-low rounded-xl p-4">
              <div class="flex justify-between items-start gap-4">
                <div>
                  <h4 class="font-semibold text-on-surface text-sm mb-1">{{ selectedVariant.title }}</h4>
                  <span
                    :class="{
                      'bg-green-600/15 text-green-700': selectedVariant.stockStatus === 'in_stock',
                      'bg-amber-500/15 text-amber-700': selectedVariant.stockStatus === 'low_stock',
                      'bg-rose-500/15 text-rose-700': selectedVariant.stockStatus === 'out_of_stock'
                    }"
                    class="inline-block px-2 py-0.5 rounded-full text-xs font-medium"
                  >
                    {{ selectedVariant.stockStatus === 'in_stock' ? 'Disponible' : selectedVariant.stockStatus === 'low_stock' ? 'Stock faible' : 'Rupture' }}
                  </span>
                </div>
                <div class="text-right flex-shrink-0">
                  <div class="flex items-baseline gap-2">
                    <span class="text-base font-bold text-primary">{{ Math.round(selectedVariant.price).toLocaleString('fr-FR') }} FCFA</span>
                    <span v-if="selectedVariant.onSale" class="text-xs text-on-surface-variant line-through">{{ Math.round(selectedVariant.originalPrice).toLocaleString('fr-FR') }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Quantité -->
          <div>
            <label class="text-[11px] font-bold tracking-widest text-on-surface-variant mb-2.5 block uppercase">Quantité</label>
            <div class="flex items-center gap-4">
              <div class="inline-flex items-center border border-outline-variant/40 rounded-xl overflow-hidden">
                <button
                  @click="quantity > 1 && quantity--"
                  :disabled="quantity <= 1"
                  class="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center hover:bg-surface-container transition-colors disabled:opacity-30"
                >
                  <span class="material-symbols-outlined text-lg">remove</span>
                </button>
                <span class="w-12 h-10 sm:h-11 flex items-center justify-center font-semibold text-sm border-x border-outline-variant/40">
                  {{ quantity }}
                </span>
                <button
                  @click="quantity++"
                  class="w-10 h-10 sm:w-11 sm:h-11 flex items-center justify-center hover:bg-surface-container transition-colors"
                >
                  <span class="material-symbols-outlined text-lg">add</span>
                </button>
              </div>
              <span class="text-xs text-on-surface-variant">{{ currentStock }} disponibles</span>
            </div>
          </div>

          <!-- Actions -->
          <div class="flex flex-col gap-3">
            <button
              @click="addToCart"
              :disabled="!canAddToCart"
              class="w-full py-3.5 sm:py-4 rounded-xl font-bold text-sm sm:text-base shadow-sm hover:shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              :class="product.stockStatus === 'out_of_stock'
                ? 'bg-error-container text-on-error-container'
                : product.stockStatus === 'low_stock'
                ? 'bg-warning-container text-on-warning-container'
                : 'bg-secondary-container text-on-secondary-container'"
            >
              <span class="material-symbols-outlined text-lg">shopping_cart</span>
              {{ canAddToCart ? 'Ajouter au Panier' : 'Rupture de Stock' }}
            </button>
            <button
              @click="buyNow"
              :disabled="!canAddToCart"
              class="w-full py-3.5 sm:py-4 bg-primary text-on-primary rounded-xl font-bold text-sm sm:text-base active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Acheter Maintenant
            </button>
          </div>

          <!-- Trust Badges -->
          <div class="grid grid-cols-2 gap-2 sm:gap-3">
            <div class="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/15">
              <span class="material-symbols-outlined text-primary text-lg sm:text-xl">local_shipping</span>
              <span class="text-[10px] sm:text-[11px] font-bold leading-tight text-on-surface-variant uppercase tracking-wide">Livraison<br/>Gratuite</span>
            </div>
            <div class="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 bg-surface-container-lowest rounded-xl border border-outline-variant/15">
              <span class="material-symbols-outlined text-primary text-lg sm:text-xl">verified_user</span>
              <span class="text-[10px] sm:text-[11px] font-bold leading-tight text-on-surface-variant uppercase tracking-wide">Paiements<br/>Sécurisés</span>
            </div>
          </div>
        </div>
      </div>

      <!-- ── TABS ── -->
      <div class="mt-16 sm:mt-24 border-t border-outline-variant/20 pt-8 sm:pt-12">
        <div class="flex gap-6 sm:gap-12 mb-8 overflow-x-auto no-scrollbar border-b border-outline-variant/10">
          <button
            v-for="tab in tabs"
            :key="tab"
            @click="activeTab = tab"
            :class="activeTab === tab
              ? 'text-primary border-b-2 border-primary font-bold'
              : 'text-on-surface-variant hover:text-on-surface font-medium'"
            class="pb-3 sm:pb-4 transition-colors whitespace-nowrap text-sm sm:text-base flex-shrink-0"
          >
            {{ tab }}
          </button>
        </div>

        <div v-if="activeTab === 'Description'" class="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16">
          <div class="flex flex-col gap-4 sm:gap-6">
            <h3 class="text-xl sm:text-2xl font-bold text-on-surface">Confort et Qualité</h3>
            <p class="text-on-surface-variant leading-relaxed text-sm sm:text-base">{{ product.description }}</p>
          </div>
          <div class="bg-surface-container-low p-6 sm:p-8 rounded-xl">
            <h4 class="font-bold mb-4 text-sm sm:text-base">Points Forts</h4>
            <ul class="space-y-3 sm:space-y-4">
              <li v-for="highlight in product.highlights" :key="highlight.title" class="flex gap-3 sm:gap-4 items-start">
                <span class="material-symbols-outlined text-primary text-lg sm:text-xl flex-shrink-0">{{ highlight.icon }}</span>
                <div>
                  <p class="text-sm font-bold">{{ highlight.title }}</p>
                  <p class="text-xs text-on-surface-variant">{{ highlight.description }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div v-else-if="activeTab === 'Spécifications'" class="bg-surface-container-low p-6 sm:p-8 rounded-xl">
          <!-- Specifications content -->
        </div>

        <div v-else-if="activeTab === 'Livraison & Retours'" class="bg-surface-container-low p-6 sm:p-8 rounded-xl">
          <!-- Shipping content -->
        </div>
      </div>

      <!-- ── PRODUITS SIMILAIRES ── -->
      <section class="mt-16 sm:mt-24 lg:mt-32">
        <div class="flex justify-between items-end mb-8 sm:mb-12 gap-4">
          <div>
            <h2 class="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight text-on-surface">Vous Pourriez Aussi Aimer</h2>
            <p class="text-on-surface-variant mt-1 sm:mt-2 text-xs sm:text-sm">Parfaites associations pour votre collection</p>
          </div>
          <div class="flex gap-2 flex-shrink-0">
            <button class="w-9 h-9 sm:w-11 sm:h-11 rounded-full border border-outline-variant/30 flex items-center justify-center hover:bg-surface-container transition-colors">
              <span class="material-symbols-outlined text-base sm:text-xl">arrow_back</span>
            </button>
            <button class="w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-primary/90 transition-colors">
              <span class="material-symbols-outlined text-base sm:text-xl">arrow_forward</span>
            </button>
          </div>
        </div>
        <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <ProductCard
            v-for="relatedProduct in relatedProducts"
            :key="relatedProduct.id"
            :product="relatedProduct"
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '~/stores/cart'
import { adaptOrionProduct, adaptOrionProducts } from '~/utils/productAdapter'
import type { AdaptedProduct } from '~/utils/productAdapter'

const route = useRoute()
const productId = route.params.id as string
const cartStore = useCart()
const orion = useOrionAPI()

const quantity = ref(1)
const selectedVariant = ref<AdaptedProduct['variants'][0] | null>(null)
const selectedOptions = ref<Record<string, string>>({})
const currentImageIndex = ref(0)
const activeTab = ref('Description')
const imageErrors = ref<Record<string, boolean>>({})

// ─── Fetch ────────────────────────────────────────────────────────────────────
const { data: orionProduct, pending: loading, error: fetchError } = await useAsyncData(
  `product-${productId}`,
  () => orion.getProduct(productId)
)

const product = computed(() => {
  if (!orionProduct.value) return null
  try { return adaptOrionProduct(orionProduct.value) } catch { return null }
})

// ─── Fallback image ───────────────────────────────────────────────────────────
const INVALID_PATTERNS = ['placeholder', 'no-image', 'noimage', 'default', 'blank', '.svg']
const hasValidImage = (url?: string) => {
  if (!url || url.trim() === '') return false
  return !INVALID_PATTERNS.some(p => url.toLowerCase().includes(p))
}

const currentImage = computed(() =>
  product.value?.images?.[currentImageIndex.value] || product.value?.image
)

// ─── Variantes ────────────────────────────────────────────────────────────────
const currentStock = computed(() =>
  selectedVariant.value ? selectedVariant.value.stock : (product.value?.stock || 0)
)

const canAddToCart = computed(() =>
  currentStock.value > 0 && (product.value?.type === 'simple' || selectedVariant.value !== null)
)

const tabs = ['Description', 'Spécifications', 'Livraison & Retours']

const selectVariant = (optionName: string, optionValue: string) => {
  selectedOptions.value[optionName] = optionValue
  if (product.value?.variants) {
    const match = product.value.variants.find(v =>
      v.attributes.every(a => selectedOptions.value[a.name] === a.option)
    )
    if (match) {
      selectedVariant.value = match
      if (match.image) currentImageIndex.value = product.value?.images?.indexOf(match.image) || 0
    }
  }
}

const isVariantSelected = (optionName: string, optionValue: string) =>
  selectedOptions.value[optionName] === optionValue

watchEffect(() => {
  if (product.value?.hasVariants && product.value.variants.length > 0) {
    const first = product.value.variants.find(v => v.available)
    if (first) {
      first.attributes.forEach(a => { selectedOptions.value[a.name] = a.option })
      selectedVariant.value = first
    }
  }
})

// ─── Produits similaires ──────────────────────────────────────────────────────
const { data: relatedRawProducts } = await useAsyncData(
  'related-products',
  () => orion.getFeaturedProducts(4)
)

const relatedProducts = computed(() => {
  if (!relatedRawProducts.value) return []
  try { return adaptOrionProducts(relatedRawProducts.value) } catch { return [] }
})

// ─── Actions ──────────────────────────────────────────────────────────────────
const addToCart = () => {
  if (!product.value || !canAddToCart.value) return
  cartStore.addItem({
    id: product.value.id,
    name: product.value.name,
    price: selectedVariant.value ? selectedVariant.value.price : product.value.price,
    quantity: quantity.value,
    image: selectedVariant.value?.image || product.value.image,
    variant: selectedVariant.value ? selectedVariant.value.title : 'Default',
    variantId: selectedVariant.value?.id,
    stock: currentStock.value,
  })
}

const buyNow = () => {
  addToCart()
  navigateTo('/checkout')
}

useHead({
  title: () => `${product.value?.name} | Sunu Tawfekh`,
  meta: [{ name: 'description', content: () => product.value?.description }]
})
</script>