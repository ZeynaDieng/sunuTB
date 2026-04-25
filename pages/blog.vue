<template>
  <div class="pt-24 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
    <!-- Données structurées Schema.org -->
    <JsonLd 
      type="breadcrumb" 
      :breadcrumbs="[
        { name: 'Blog', url: '/blog' }
      ]" 
    />

    <!-- Header -->
    <header class="text-center mb-16">
      <h1 class="text-4xl md:text-5xl font-headline font-extrabold tracking-tighter mb-6">Blog Sunu Tawfekh</h1>
      <p class="text-xl text-on-surface-variant leading-relaxed max-w-3xl mx-auto">
        Découvrez nos guides d'achat, conseils et actualités sur les tendances du marché sénégalais. Votre expertise shopping à Dakar.
      </p>
    </header>

    <!-- Categories du blog -->
    <section class="mb-12">
      <div class="flex flex-wrap gap-3 justify-center">
        <button
          v-for="category in blogCategories"
          :key="category.id"
          @click="selectedCategory = category.id"
          :class="selectedCategory === category.id 
            ? 'bg-primary text-on-primary' 
            : 'bg-surface-container text-on-surface hover:bg-surface-container-high'"
          class="px-6 py-2 rounded-full font-medium transition-colors"
        >
          {{ category.name }}
        </button>
      </div>
    </section>

    <!-- Articles en vedette -->
    <section v-if="selectedCategory === 'all'" class="mb-16">
      <h2 class="text-3xl font-bold mb-8">Articles en Vedette</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article
          v-for="article in featuredArticles"
          :key="article.id"
          class="bg-surface-container rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
        >
          <OptimizedImage
            :src="article.image"
            :alt="article.title"
            class="w-full h-48 object-cover"
            width="400"
            height="200"
          />
          <div class="p-6">
            <div class="flex items-center gap-3 mb-3">
              <span class="text-sm font-medium text-primary">{{ article.category }}</span>
              <span class="text-sm text-on-surface-variant">{{ article.date }}</span>
            </div>
            <h3 class="text-xl font-bold mb-3 line-clamp-2">{{ article.title }}</h3>
            <p class="text-on-surface-variant mb-4 line-clamp-3">{{ article.excerpt }}</p>
            <NuxtLink
              :to="`/blog/${article.slug}`"
              class="text-primary font-semibold hover:text-primary-container transition-colors"
            >
              Lire la suite →
            </NuxtLink>
          </div>
        </article>
      </div>
    </section>

    <!-- Liste des articles -->
    <section>
      <h2 class="text-3xl font-bold mb-8">
        {{ selectedCategory === 'all' ? 'Tous les Articles' : getCurrentCategoryName() }}
      </h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <article
          v-for="article in filteredArticles"
          :key="article.id"
          class="bg-surface-container rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
        >
          <OptimizedImage
            :src="article.image"
            :alt="article.title"
            class="w-full h-48 object-cover"
            width="400"
            height="200"
          />
          <div class="p-6">
            <div class="flex items-center gap-3 mb-3">
              <span class="text-sm font-medium text-primary">{{ article.category }}</span>
              <span class="text-sm text-on-surface-variant">{{ article.date }}</span>
            </div>
            <h3 class="text-xl font-bold mb-3 line-clamp-2">{{ article.title }}</h3>
            <p class="text-on-surface-variant mb-4 line-clamp-3">{{ article.excerpt }}</p>
            <NuxtLink
              :to="`/blog/${article.slug}`"
              class="text-primary font-semibold hover:text-primary-container transition-colors"
            >
              Lire la suite →
            </NuxtLink>
          </div>
        </article>
      </div>
    </section>

    <!-- Newsletter -->
    <section class="mt-20 bg-surface-container-low rounded-2xl p-12 text-center">
      <h2 class="text-3xl font-bold mb-4">Restez Informé</h2>
      <p class="text-on-surface-variant mb-8 max-w-md mx-auto">
        Recevez nos derniers articles et offres exclusives directement dans votre boîte mail.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Votre email"
          class="flex-1 px-4 py-3 rounded-lg border border-outline-variant focus:border-primary outline-none"
        />
        <button class="bg-primary text-on-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary-container transition-colors">
          S'inscrire
        </button>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Meta tags
useHead({
  title: 'Blog | Sunu Tawfekh - Guides et Actualités',
  meta: [
    { name: 'description', content: 'Découvrez nos guides d\'achat, conseils et actualités sur les tendances du marché sénégalais. Expertise shopping à Dakar.' },
    { name: 'keywords', content: 'blog dakar, guides d\'achat sénégal, shopping sunutawfekh, tendances mode dakar, conseils shopping' }
  ]
})

const selectedCategory = ref('all')

// Categories du blog
const blogCategories = [
  { id: 'all', name: 'Tous' },
  { id: 'guides', name: 'Guides d\'Achat' },
  { id: 'tendances', name: 'Tendances' },
  { id: 'conseils', name: 'Conseils' },
  { id: 'actualites', name: 'Actualités' }
]

// Articles en vedette
const featuredArticles = [
  {
    id: 1,
    title: "Guide Complet : Comment Choisir ses Vêtements pour le Climat Sénégalais",
    excerpt: "Découvrez les meilleurs tissus et styles adaptés au climat tropical du Sénégal. Nos conseils pour rester élégant tout au long de l'année.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop",
    category: "Guides d'Achat",
    date: "24 Avril 2026",
    slug: "guide-vetements-climat-senegal"
  },
  {
    id: 2,
    title: "Les Tendances Tech 2026 à Dakar : Ce Qui Fait le Buzz",
    excerpt: "Zoom sur les produits électroniques qui cartonnent actuellement dans la capitale sénégalaise. smartphones, accessoires et gadgets.",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&h=400&fit=crop",
    category: "Tendances",
    date: "22 Avril 2026",
    slug: "tendances-tech-dakar-2026"
  },
  {
    id: 3,
    title: "5 Astuces pour Aménager son Appartement Dakarois",
    excerpt: "Optimisez votre espace de vie avec nos conseils déco adaptés aux appartements dakarois. fonctionnalité et style garantis.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop",
    category: "Conseils",
    date: "20 Avril 2026",
    slug: "astuces-amenagement-appartement-dakar"
  }
]

// Tous les articles
const allArticles = [
  ...featuredArticles,
  {
    id: 4,
    title: "Les Meilleurs Produits de Beauté pour Peau Noire",
    excerpt: "Notre sélection de produits cosmétiques adaptés aux peaux mates et noires, disponibles à Dakar.",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc4033ba?w=800&h=400&fit=crop",
    category: "Guides d'Achat",
    date: "18 Avril 2026",
    slug: "produits-beaute-peau-noire"
  },
  {
    id: 5,
    title: "Comment Monter son Business au Sénégal : Les Bases",
    excerpt: "Guide pratique pour lancer votre entreprise à Dakar. démarches, conseils et astuces des entrepreneurs locaux.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&h=400&fit=crop",
    category: "Conseils",
    date: "16 Avril 2026",
    slug: "monter-business-senegal"
  },
  {
    id: 6,
    title: "Nouveautés Sunu Tawfekh : Collection Printemps-Été 2026",
    excerpt: "Découvrez en avant-première les nouveaux produits qui arrivent dans votre boutique préférée.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop",
    category: "Actualités",
    date: "14 Avril 2026",
    slug: "nouveautes-sunutawfekh-printemps-2026"
  }
]

// Articles filtrés par catégorie
const filteredArticles = computed(() => {
  if (selectedCategory.value === 'all') {
    return allArticles
  }
  return allArticles.filter(article => {
    const categoryMap: Record<string, string> = {
      'guides': "Guides d'Achat",
      'tendances': 'Tendances',
      'conseils': 'Conseils',
      'actualites': 'Actualités'
    }
    return article.category === categoryMap[selectedCategory.value]
  })
})

const getCurrentCategoryName = () => {
  const category = blogCategories.find(cat => cat.id === selectedCategory.value)
  return category?.name || 'Tous'
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
