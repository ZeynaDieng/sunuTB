<template>
  <div class="pt-24 pb-20 px-4 sm:px-6 md:px-8 max-w-7xl mx-auto min-h-screen">
    <!-- Breadcrumbs -->
    <nav class="mb-8 flex items-center gap-2 text-on-surface-variant font-label text-sm tracking-wide">
      <NuxtLink to="/" class="hover:text-primary transition-colors">Accueil</NuxtLink>
      <span class="material-symbols-outlined text-xs" data-icon="chevron_right">chevron_right</span>
      <span class="text-on-surface font-semibold">Boutique</span>
    </nav>

    <header class="mb-12">
      <h1 class="font-headline text-4xl font-extrabold tracking-tighter mb-2">Boutique Sunu Tawfekh</h1>
      <p class="text-on-surface-variant font-medium">
        {{ loading ? 'Chargement...' : `${filteredProducts.length} produits` }}
      </p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
      <!-- Filters Sidebar -->
      <aside class="lg:col-span-3 max-w-full">
        <div class="bg-surface-container-low rounded-xl p-6">
          <!-- Prix -->
          <div class="mb-8">
            <h3 class="mb-4 flex items-center justify-between border-b border-outline pb-2 label-lg font-bold tracking-wide text-on-surface">
              Prix 
              <span class="material-symbols-outlined h-3.5 w-3.5 text-on-surface">expand_more</span>
            </h3>
            <div class="space-y-4">
              <input
                type="range"
                :min="0"
                :max="maxPrice"
                step="500"
                :value="priceRange.max"
                class="catalog-price-slider h-1 w-full cursor-pointer accent-primary"
                @input="onPriceSlider"
              >
              <div class="flex justify-between label-sm font-bold text-primary">
                <span>0 FCFA</span>
                <span>{{ priceRange.max }} FCFA</span>
              </div>
            </div>
          </div>

          <!-- Catégories -->
          <div class="mb-8">
            <h3 class="mb-4 border-b border-outline pb-2 label-lg font-bold tracking-wide text-on-surface">
              Catégories
            </h3>
          
          </div>

          <!-- Options supplémentaires -->
          <div class="space-y-4">
            <label class="flex items-center gap-3 cursor-pointer">
              <input 
                v-model="inStockOnly"
                type="checkbox"
                class="rounded border-outline text-primary focus:ring-primary"
              />
              <span class="body-sm text-on-surface">Disponibles</span>
            </label>
            <label class="flex items-center gap-3 cursor-pointer">
              <input 
                v-model="onSaleOnly"
                type="checkbox"
                class="rounded border-outline text-primary focus:ring-primary"
              />
              <span class="body-sm text-on-surface">Promotions</span>
            </label>
          </div>

          <!-- Sort -->
          <div class="mt-8">
            <h3 class="mb-4 border-b border-outline pb-2 label-lg font-bold tracking-wide text-on-surface">
              Trier par
            </h3>
            <select 
              v-model="sortBy"
              class="w-full bg-surface-container-lowest border-outline-variant/20 rounded-lg px-3 py-2 body-sm"
            >
              <option value="featured">Mis en avant</option>
              <option value="price-low">Prix croissant</option>
              <option value="price-high">Prix décroissant</option>
              <option value="name">Nom A-Z</option>
            </select>
          </div>
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
          <h2 class="text-2xl font-bold text-error mb-4">Impossible de Charger les Produits</h2>
          <p class="text-on-surface-variant mb-8">{{ apiError.message }}</p>
          <button @click="refreshProducts" class="bg-primary text-on-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary-container transition-colors">
            Réessayer
          </button>
        </div>

        <!-- Empty State -->
        <div v-else-if="paginatedProducts.length === 0" class="text-center py-20">
          <h2 class="text-2xl font-bold text-on-surface mb-4">Aucun Produit Trouvé</h2>
          <p class="text-on-surface-variant mb-8">Essayez d'ajuster vos filtres ou parcourez tous les produits.</p>
          <button @click="clearFilters" class="bg-primary text-on-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary-container transition-colors">
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

// Filter state
const priceRange = ref({ min: 0, max: 10000 })
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
  
  // Filter by sale
  if (onSaleOnly.value) {
    products = products.filter(p => p.onSale)
  }
  
  // Sort products
  switch (sortBy.value) {
    case 'price-low':
      products.sort((a, b) => a.price - b.price)
      break
    case 'price-high':
      products.sort((a, b) => b.price - a.price)
      break
    case 'name':
      products.sort((a, b) => a.name.localeCompare(b.name))
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
  return prices.length > 0 ? Math.max(...prices) : 10000
})

// Initialize price range max when products load
watch(maxPrice, (newMax) => {
  if (priceRange.value.max > newMax) {
    priceRange.value.max = newMax
  }
}, { immediate: true })

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
  currentPage.value = 1
}
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
</style>
