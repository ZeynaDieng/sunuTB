<template>
  <div class="pt-24 pb-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto min-h-screen">
    <!-- Breadcrumbs -->
    <nav class="mb-8 flex items-center gap-2 text-on-surface-variant font-label text-sm tracking-wide">
      <NuxtLink to="/" class="hover:text-primary transition-colors">Accueil</NuxtLink>
      <span class="material-symbols-outlined text-xs" data-icon="chevron_right">chevron_right</span>
      <span class="text-on-surface font-semibold">Boutique</span>
    </nav>

    <header class="mb-12">
      <h1 class="font-headline text-4xl font-extrabold tracking-tighter mb-2 first-letter:uppercase">Boutique Sunu Tawfekh</h1>
      <p class="text-on-surface-variant font-medium first-letter:uppercase">
        {{ loading ? 'Chargement...' : `${filteredProducts.length} produits` }}
      </p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
      <!-- Filters Sidebar -->
 <aside class="lg:col-span-3 max-w-full">
  <div class="bg-surface-container-low rounded-xl p-5 sm:p-6 flex flex-col gap-7">

  <!-- ══ PRIX ══ -->
<div>
  <h3 class="flex items-center justify-between border-b border-outline-variant/30 pb-2.5 mb-4 text-xs font-bold tracking-widest text-on-surface uppercase">
    Prix
  </h3>

  <!-- Ranges élégants -->
  <div class="flex flex-wrap gap-2 mb-4">
    <button
      v-for="range in predefinedPriceRanges"
      :key="range.id"
      @click="selectPriceRange(range.id)"
      :class="[
        'px-3 py-1.5 rounded-full text-xs border transition-all duration-200',
        selectedPriceRange === range.id
          ? 'bg-primary text-on-primary border-primary shadow-sm'
          : 'border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary'
      ]"
    >
      {{ range.label }}
    </button>
  </div>

  <!-- Slider discret -->
  <transition name="fade">
    <div v-if="showCustomSlider" class="mt-3">

      <div class="relative h-[2px] bg-outline-variant/30 rounded-full mb-4">

        <!-- Active -->
        <div
          class="absolute h-[2px] bg-primary rounded-full"
          :style="`left: ${(priceRange.min / maxPrice) * 100}%; right: ${100 - (priceRange.max / maxPrice) * 100}%`"
        ></div>

        <!-- Inputs -->
        <input
          type="range"
          :min="0"
          :max="maxPrice"
          step="500"
          v-model.number="priceRange.min"
          @input="onPriceMinSlider"
          class="absolute inset-0 w-full opacity-0 cursor-pointer z-20"
        />

        <input
          type="range"
          :min="0"
          :max="maxPrice"
          step="500"
          v-model.number="priceRange.max"
          @input="onPriceMaxSlider"
          class="absolute inset-0 w-full opacity-0 cursor-pointer z-10"
        />

        <!-- Points minimalistes -->
        <div
          class="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow"
          :style="`left: ${(priceRange.min / maxPrice) * 100}%`"
        ></div>

        <div
          class="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full shadow"
          :style="`left: ${(priceRange.max / maxPrice) * 100}%`"
        ></div>
      </div>

      <!-- Résumé élégant -->
      <p class="text-xs text-center text-on-surface font-medium">
        {{ priceRange.min.toLocaleString('fr-FR') }} — {{ priceRange.max.toLocaleString('fr-FR') }} FCFA
      </p>

    </div>
  </transition>
</div>

    <!-- ══ SOUS-CATÉGORIES ══ -->
    <div>
      <h3 class="border-b pb-2.5 mb-3 text-xs font-bold uppercase">
        Sous-catégories
      </h3>

      <div v-if="subCategories && subCategories.length" class="flex flex-col gap-1">
        <button
          v-for="cat in subCategories"
          :key="cat.slug"
          @click="selectedCategory = selectedCategory === cat.slug ? null : cat.slug"
          :class="selectedCategory === cat.slug
            ? 'bg-primary/10 text-primary font-semibold'
            : 'hover:bg-surface-container'"
          class="flex justify-between px-3 py-2 rounded-lg text-sm"
        >
          <span>{{ cat.name }}</span>
        </button>
      </div>

      <p v-else class="text-xs italic text-gray-400">
        Aucune trouvée
      </p>
    </div>

    <!-- ══ DISPONIBILITÉ ══ -->
    <div>
      <h3 class="border-b pb-2.5 mb-3 text-xs font-bold uppercase">
        Disponibilité
      </h3>

      <!-- Disponible -->
      <label class="flex items-center gap-3 mb-2 cursor-pointer">
        <input v-model="inStockOnly" type="checkbox" />
        <span>Disponible</span>
      </label>

      <!-- Détails -->
      <div class="flex flex-col gap-2 pl-3 border-l">
        <label class="flex items-center gap-3 cursor-pointer">
          <input v-model="inStockOnly" type="checkbox" />
          <span class="flex items-center gap-2">
            <span class="w-2 h-2 bg-green-500 rounded-full"></span>
            En stock
          </span>
        </label>

        <label class="flex items-center gap-3 cursor-pointer">
          <input v-model="stockFilter" value="out_of_stock" type="checkbox" />
          <span class="flex items-center gap-2">
            <span class="w-2 h-2 bg-red-500 rounded-full"></span>
            Rupture
          </span>
        </label>

        <label class="flex items-center gap-3 cursor-pointer">
          <input v-model="onSaleOnly" type="checkbox" />
          <span class="flex items-center gap-2">
            <span class="w-2 h-2 bg-yellow-500 rounded-full"></span>
            En promo
          </span>
        </label>
      </div>
    </div>

    <!-- ══ TRIER PAR ══ -->
    <!-- Trier par -->
<div class="mt-8">
  <h3 class="mb-4 border-b border-outline pb-2 label-lg font-bold tracking-wide text-on-surface first-letter:uppercase">
    Trier par
  </h3>

  <div class="flex flex-col gap-2">

    <label
      v-for="opt in sortOptions"
      :key="opt.value"
      class="flex items-center gap-3 cursor-pointer px-3 py-2 rounded-lg transition"
      :class="sortBy === opt.value 
        ? 'bg-primary/10 text-primary font-semibold' 
        : 'hover:bg-surface-container'"
    >
      <!-- Checkbox -->
      <input
        type="checkbox"
        :value="opt.value"
        :checked="sortBy === opt.value"
        @change="handleSortChange(opt.value)"
        class="w-4 h-4 accent-primary cursor-pointer"
      />

      <span class="text-sm">
        {{ opt.label }}
      </span>
    </label>

  </div>
</div>

    <!-- FILTRES ACTIFS -->
    <p class="text-[11px] text-primary text-center">
      {{ activeFiltersCount }} filtres actifs
    </p>

    <!-- RESET -->
    <button
      @click="resetFilters"
      class="w-full py-2 border rounded-lg text-sm hover:bg-gray-100"
    >
      Réinitialiser
    </button>

  </div>
</aside>

      <!-- Product Grid -->
      <section class="lg:col-span-9">
        <!-- Loading State -->
        <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="i in 9" :key="i" class="animate-pulse">
            <div class="aspect-[3/4] bg-surface-container rounded-xl mb-4"></div>
            <div class="h-4 bg-surface-container rounded w-3/4 mb-2"></div>
            <div class="h-3 bg-surface-container rounded w-1/2"></div>
          </div>
        </div>

        <!-- Error State -->
        <div v-else-if="apiError" class="text-center py-20">
          <h2 class="text-2xl font-bold text-error mb-4 first-letter:uppercase">Impossible de Charger les Produits</h2>
          <p class="text-on-surface-variant mb-8 first-letter:uppercase">{{ apiError.message }}</p>
          <button @click="refreshProducts" class="bg-primary text-on-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary-container transition-colors first-letter:uppercase">
            Réessayer
          </button>
        </div>

        <!-- Empty State -->
        <div v-else-if="paginatedProducts.length === 0" class="text-center py-20">
          <h2 class="text-2xl font-bold text-on-surface mb-4 first-letter:uppercase">Aucun Produit Trouvé</h2>
          <p class="text-on-surface-variant mb-8 first-letter:uppercase">Essayez d'ajuster vos filtres ou parcourez tous les produits.</p>
          <button @click="clearFilters" class="bg-primary text-on-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary-container transition-colors first-letter:uppercase">
            Effacer les Filtres
          </button>
        </div>

        <!-- Products Grid -->
        <div v-else class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard 
            v-for="product in paginatedProducts" 
            :key="product.id"
            :product="product"
          />
        </div>
<div class="mt-20 flex flex-col items-center gap-6">

  <!-- NAV -->
  <div class="flex items-center gap-2">

    <!-- PREV -->
    <button 
      @click="currentPage--"
      :disabled="currentPage === 1"
      class="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant hover:bg-surface-container transition disabled:opacity-40"
    >
      <span class="material-symbols-outlined text-sm">chevron_left</span>
    </button>

    <!-- PAGES -->
    <div class="flex items-center gap-1">

      <button
        v-for="page in visiblePages"
        :key="page.key"
        @click="page.number && (currentPage = page.number)"
        :disabled="!page.number"
        :class="[
          'min-w-[36px] h-9 px-2 flex items-center justify-center rounded-full text-sm transition',
          page.active
            ? 'bg-primary text-on-primary font-semibold shadow-md'
            : page.number
              ? 'hover:bg-surface-container text-on-surface'
              : 'text-on-surface-variant cursor-default'
        ]"
      >
        {{ page.label }}
      </button>

    </div>

    <!-- NEXT -->
    <button 
      @click="currentPage++"
      :disabled="currentPage === totalPages"
      class="w-10 h-10 flex items-center justify-center rounded-full border border-outline-variant hover:bg-surface-container transition disabled:opacity-40"
    >
      <span class="material-symbols-outlined text-sm">chevron_right</span>
    </button>

  </div>

  <!-- INFO -->
  <p class="text-xs text-on-surface-variant">
    Page {{ currentPage }} sur {{ totalPages }}
  </p>

</div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { adaptOrionProducts } from '~/utils/productAdapter'

// Get category from URL
const route = useRoute()
const selectedCategory = ref(route.query.category as string || '')

// Meta tags
useHead({
  title: selectedCategory.value ? `Boutique ${selectedCategory.value} | Sunu Tawfekh` : 'Boutique | Sunu Tawfekh',
  meta: [
    { name: 'description', content: selectedCategory.value ? `Découvrez nos produits ${selectedCategory.value} chez Sunu Tawfekh` : 'Parcourez notre collection de produits chez Sunu Tawfekh, votre boutique de confiance à Dakar.' }
  ]
})

const stockFilter = ref<string[]>([])

/* SLIDER FIX */
const onPriceMinSlider = () => {
  if (priceRange.value.min > priceRange.value.max) {
    priceRange.value.min = priceRange.value.max
  }
}

const onPriceMaxSlider = () => {
  if (priceRange.value.max < priceRange.value.min) {
    priceRange.value.max = priceRange.value.min
  }
}

/* COMPTEUR */
const activeFiltersCount = computed(() => {
  let count = 0
  if (selectedCategory.value) count++
  if (inStockOnly.value) count++
  if (onSaleOnly.value) count++
  if (stockFilter.value.length) count++
  if (sortBy.value !== 'featured') count++
  if (
    priceRange.value.min !== 0 ||
    priceRange.value.max !== maxPrice.value
  ) count++
  return count
})

// Orion API
const orion = useOrionAPI()

// Fetch all products from Orion API
const { data: orionProducts, pending: loading, error: apiError } = await useAsyncData(
  'all-products',
  () => orion.getProducts({ pageSize: 100 })
)

// Adapt Orion products to our component format
const allProducts = computed(() => {
  console.log('Shop page - Computing products from:', orionProducts.value)
  console.log('Shop page - Raw API response structure:', JSON.stringify(orionProducts.value, null, 2))
  
  if (!orionProducts.value) {
    console.log('Shop page - No products data available')
    return []
  }
  
  try {
    const adapted = adaptOrionProducts(orionProducts.value)
    console.log('Shop page - Adapted products:', adapted)
    return adapted
  } catch (error) {
    console.error('Shop page - Error adapting products:', error)
    console.error('Shop page - Error details:', error.stack)
    return []
  }
})

const sortOptions = [
  { label: 'Nom (A-Z)', value: 'name_asc' },
  { label: 'Prix croissant', value: 'price_asc' },
  { label: 'Prix décroissant', value: 'price_desc' },
  { label: 'Nouveautés', value: 'newest' }
]

const handleSortChange = (value: string) => {
  if (sortBy.value === value) {
    // si on reclique → on désélectionne
    sortBy.value = 'featured'
  } else {
    // sinon on remplace
    sortBy.value = value
  }
}

// Handle predefined price range selection
const selectPriceRange = (rangeId: string) => {
  selectedPriceRange.value = rangeId
  const range = predefinedPriceRanges.value.find(r => r.id === rangeId)
  
  if (range) {
    if (range.custom) {
      showCustomSlider.value = true
      // Keep current custom values or reset to full range
      if (priceRange.value.max === 50000) {
        priceRange.value.max = range.max
      }
    } else {
      showCustomSlider.value = false
      priceRange.value.min = range.min
      priceRange.value.max = range.max
    }
  }
}

// Filter state - will be updated when products load
const priceRange = ref({ min: 0, max: 50000 })
const selectedPriceRange = ref<string>('all') // Track selected predefined range
const showCustomSlider = ref(false) // Show custom slider when "Personnalisé" is selected
const sortBy = ref('featured')
const inStockOnly = ref(false)
const onSaleOnly = ref(false)
const currentPage = ref(1)
const itemsPerPage = 9

// Predefined categories for Sunu Tawfekh
const predefinedCategories = [
  { id: 'mode', name: 'Mode', keywords: ['vêtement', 'clothing', 'shirt', 'pant', 'dress', 'mode'] },
  { id: 'electronique', name: 'Électronique', keywords: ['phone', 'laptop', 'computer', 'electronic', 'tech'] },
  { id: 'beaute', name: 'Beauté', keywords: ['cosmetic', 'beauty', 'skin', 'cream', 'makeup'] },
  { id: 'alimentation', name: 'Alimentation', keywords: ['food', 'drink', 'grocery', 'nutrition', 'aliment'] }
]

// Sub-categories computed from predefined categories
const subCategories = computed(() => {
  return predefinedCategories.map(cat => ({
    slug: cat.id,
    name: cat.name
  }))
})

// Predefined price ranges based on actual product prices
const predefinedPriceRanges = computed(() => {
  const prices = allProducts.value.map(p => p.price || 0)
  const actualMax = prices.length > 0 ? Math.max(...prices) : 50000
  const actualMin = prices.length > 0 ? Math.min(...prices) : 0
  
  return [
    { 
      id: 'all', 
      label: 'Tous les prix', 
      min: 0, 
      max: actualMax,
      description: `0 - ${actualMax.toLocaleString('fr-FR')} FCFA`
    },
    { 
      id: 'low', 
      label: 'Petit budget', 
      min: 0, 
      max: Math.min(10000, actualMax * 0.3),
      description: `Moins de ${Math.min(10000, actualMax * 0.3).toLocaleString('fr-FR')} FCFA`
    },
    { 
      id: 'medium', 
      label: 'Budget moyen', 
      min: Math.min(10000, actualMax * 0.3), 
      max: Math.min(30000, actualMax * 0.7),
      description: `${Math.min(10000, actualMax * 0.3).toLocaleString('fr-FR')} - ${Math.min(30000, actualMax * 0.7).toLocaleString('fr-FR')} FCFA`
    },
    { 
      id: 'high', 
      label: 'Budget élevé', 
      min: Math.min(30000, actualMax * 0.7), 
      max: actualMax,
      description: `Plus de ${Math.min(30000, actualMax * 0.7).toLocaleString('fr-FR')} FCFA`
    },
    { 
      id: 'custom', 
      label: 'Personnalisé', 
      min: 0, 
      max: actualMax,
      custom: true,
      description: 'Choisir vos limites'
    }
  ]
})

// Filter products by category
const filteredProducts = computed(() => {
  let products = allProducts.value
  
  // Filter by category if selected
  if (selectedCategory.value) {
    const category = predefinedCategories.find(c => c.id === selectedCategory.value)
    if (category) {
      products = products.filter(product => {
        const searchText = (product.name + ' ' + (product.description || '')).toLowerCase()
        return category.keywords.some(keyword => searchText.includes(keyword.toLowerCase()))
      })
    }
  }
  
  // Filter by price range
  products = products.filter(p => p.price >= priceRange.value.min && p.price <= priceRange.value.max)
  
  // Filter by stock
  if (inStockOnly.value) {
    products = products.filter(p => p.available !== false)
  }
  
  // Filter by stock status (out of stock, etc.)
  if (stockFilter.value.length > 0) {
    products = products.filter(p => {
      if (stockFilter.value.includes('out_of_stock')) {
        return p.stockStatus === 'out_of_stock'
      }
      return true
    })
  }
  
  // Filter by sale
  if (onSaleOnly.value) {
    products = products.filter(p => p.onSale)
  }
  
  // Sort products
  switch (sortBy.value) {
    case 'price_asc':
      products.sort((a, b) => a.price - b.price)
      break
    case 'price_desc':
      products.sort((a, b) => b.price - a.price)
      break
    case 'name_asc':
      products.sort((a, b) => a.name.localeCompare(b.name))
      break
    case 'newest':
      // Sort by newest first - fallback to index if no date available
      products.sort((a, b) => {
        const dateA = (a as any).createdAt ? new Date((a as any).createdAt).getTime() : 0
        const dateB = (b as any).createdAt ? new Date((b as any).createdAt).getTime() : 0
        return dateB - dateA
      })
      break
    default:
      // Keep original order for 'featured'
      break
  }
  
  return products
})

// Calculate max price from products
const maxPrice = computed(() => {
  const prices = allProducts.value.map(p => p.price || 0)
  const actualMax = prices.length > 0 ? Math.max(...prices) : 50000
  
  // Update priceRange.max to match actual max price
  if (priceRange.value.max === 50000 || priceRange.value.max < actualMax) {
    priceRange.value.max = actualMax
  }
  
  return actualMax
})





// Paginated products for display
const paginatedProducts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredProducts.value.slice(start, end)
})

// Pagination
const totalPages = computed(() => Math.ceil(filteredProducts.value.length / itemsPerPage))

// Watch for filter changes to reset pagination
watch([selectedCategory, priceRange, sortBy, inStockOnly, onSaleOnly], () => {
  currentPage.value = 1
})

// Functions
const refreshProducts = async () => {
  await refreshNuxtData('all-products')
}

const clearFilters = () => {
  selectedCategory.value = ''
  priceRange.value.max = maxPrice.value
  inStockOnly.value = false
  onSaleOnly.value = false
  sortBy.value = 'featured'
  stockFilter.value = []
  currentPage.value = 1
}

const resetFilters = () => {
  selectedCategory.value = ''
  selectedPriceRange.value = 'all'
  showCustomSlider.value = false
  priceRange.value = { min: 0, max: maxPrice.value }
  inStockOnly.value = false
  onSaleOnly.value = false
  sortBy.value = 'featured'
  stockFilter.value = []
  currentPage.value = 1
}

// Pagination helper
const visiblePages = computed(() => {
  const pages = []
  const total = totalPages.value
  const current = currentPage.value
  
  if (total <= 7) {
    for (let i = 1; i <= total; i++) {
      pages.push({ key: i, number: i, label: i.toString(), active: i === current })
    }
  } else {
    if (current <= 4) {
      for (let i = 1; i <= 5; i++) {
        pages.push({ key: i, number: i, label: i.toString(), active: i === current })
      }
      pages.push({ key: 'ellipsis1', number: null, label: '...', active: false })
      pages.push({ key: total, number: total, label: total.toString(), active: false })
    } else if (current >= total - 3) {
      pages.push({ key: 1, number: 1, label: '1', active: false })
      pages.push({ key: 'ellipsis1', number: null, label: '...', active: false })
      for (let i = total - 4; i <= total; i++) {
        pages.push({ key: i, number: i, label: i.toString(), active: i === current })
      }
    } else {
      pages.push({ key: 1, number: 1, label: '1', active: false })
      pages.push({ key: 'ellipsis1', number: null, label: '...', active: false })
      for (let i = current - 1; i <= current + 1; i++) {
        pages.push({ key: i, number: i, label: i.toString(), active: i === current })
      }
      pages.push({ key: 'ellipsis2', number: null, label: '...', active: false })
      pages.push({ key: total, number: total, label: total.toString(), active: false })
    }
  }
  
  return pages
})
</script>

<style scoped>
.catalog-price-slider {
  -webkit-appearance: none;
  appearance: none;
  height: 4px;
  border-radius: 2px;
  background: #e3e2e5;
}
.catalog-price-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 9999px;
  background: #3f3c8c;
  border: 2px solid #e0a83a;
  cursor: pointer;
  margin-top: -7px;
  transition: transform 0.25s ease;
}
.catalog-price-slider::-webkit-slider-runnable-track {
  height: 4px;
  border-radius: 2px;
  background: #eaeaea;
}
.catalog-price-slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 9999px;
  background: #3f3c8c;
  border: 2px solid #e0a83a;
  cursor: pointer;
  transition: transform 0.25s ease;
}
.catalog-price-slider::-moz-range-track {
  height: 4px;
  border-radius: 2px;
  background: #eaeaea;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

</style>
