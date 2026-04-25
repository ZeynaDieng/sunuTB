<template>
  <div class="pt-24 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
    <!-- Hero Section -->
    <section class="mb-20">
      <div class="text-center mb-16">
        <h1 class="text-5xl md:text-6xl font-headline font-extrabold tracking-tighter mb-6">Notre Histoire</h1>
        <p class="text-xl text-on-surface-variant leading-relaxed max-w-2xl mx-auto">
          Votre boutique de confiance à Dakar depuis 2024, née d'une passion pour les produits de qualité et le service client exceptionnel.
        </p>
      </div>
      <div class="aspect-[16/9] rounded-2xl overflow-hidden">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAtQmzka7tOh2bcJ2U9aJch6RKLYZzXnEkjQCS4osUjgyd5oQr93KVel-gPa9tv0bDLnbciciVAMZlf2EVSG8nAySqKHG_HVP7iuyRWDQWMjhanzK4KyEjxV7f-d6zBo4g4XeyMSH-79tycUkoIDvqfjySfvYS0EsGghLNyHjT5ckZHAfBv4jywql9l8zRXB_4FVO0C4wP9piOsQydlN7esGdBj8xbI6yygpBREoDlme8m6PvGacj-PKMo8t_fyQi2xrv6Fj5veV63R" 
          alt="Minimalist studio space with carefully curated objects" 
          class="w-full h-full object-cover"
        />
      </div>
    </section>

    <!-- Content Sections -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-16 mb-20">
      <div class="space-y-6">
        <h2 class="text-3xl font-headline font-bold text-on-surface">Notre Philosophie</h2>
        <p class="text-on-surface-variant leading-relaxed">
          Sunu Tawfekh a été fondée sur le principe que la qualité et la diversité sont essentielles. Nous croyons en offrir à nos clients des produits qui répondent à tous leurs besoins, du quotidien à l'exceptionnel.
        </p>
        <p class="text-on-surface-variant leading-relaxed">
          Chaque produit dans notre collection est soigneusement sélectionné pour sa qualité, son authenticité et sa capacité à améliorer le quotidien. Nous travaillons directement avec des fournisseurs et des artisans qui partagent notre engagement envers l'excellence.
        </p>
      </div>
      <div class="space-y-6">
        <h2 class="text-3xl font-headline font-bold text-on-surface">Nos Valeurs</h2>
        <div class="space-y-6">
          <div class="flex gap-4">
            <div class="w-12 h-12 bg-primary-container/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="material-symbols-outlined text-primary">eco</span>
            </div>
            <div>
              <h3 class="font-bold text-on-surface mb-2">Qualité</h3>
              <p class="text-sm text-on-surface-variant">Nous privilégions les produits de qualité et les pratiques commerciales éthiques dans toute notre chaîne d'approvisionnement.</p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="w-12 h-12 bg-primary-container/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="material-symbols-outlined text-primary">handshake</span>
            </div>
            <div>
              <h3 class="font-bold text-on-surface mb-2">Partenariats Locaux</h3>
              <p class="text-sm text-on-surface-variant">Des relations directes avec les fournisseurs assurent une rémunération équitable et des produits authentiques.</p>
            </div>
          </div>
          <div class="flex gap-4">
            <div class="w-12 h-12 bg-primary-container/20 rounded-full flex items-center justify-center flex-shrink-0">
              <span class="material-symbols-outlined text-primary">diamond</span>
            </div>
            <div>
              <h3 class="font-bold text-on-surface mb-2">Qualité Durable</h3>
              <p class="text-sm text-on-surface-variant">Nous nous concentrons sur des produits qui dépassent les tendances et deviennent partie intégrante de votre quotidien.</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Team Section -->
    <section class="mb-20">
      <h2 class="text-3xl font-headline font-bold text-center mb-12">Notre Équipe</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div v-for="member in team" :key="member.name" class="text-center">
          <div class="w-32 h-32 mx-auto mb-4 rounded-full bg-surface-container overflow-hidden">
            <img :src="member.image" :alt="member.name" class="w-full h-full object-cover" />
          </div>
          <h3 class="font-bold text-on-surface mb-1">{{ member.name }}</h3>
          <p class="text-sm text-on-surface-variant mb-2">{{ member.role }}</p>
          <p class="text-xs text-on-surface-variant">{{ member.bio }}</p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="bg-surface-container-low rounded-2xl p-12 text-center">
      <h2 class="text-3xl font-headline font-bold mb-4">Rejoignez Notre Communauté</h2>
      <p class="text-on-surface-variant mb-8 max-w-md mx-auto">
        Restez connecté avec nos dernières collections, les actualités et les offres exclusives de Sunu Tawfekh.
      </p>
      <form @submit.prevent="subscribeNewsletter" class="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
        <input 
          v-model="newsletterEmail"
          class="flex-1 bg-surface-container-lowest border-outline-variant/20 rounded-lg px-6 py-4 focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none" 
          placeholder="Entrez votre email" 
          type="email"
          required
        />
        <button 
          type="submit"
          class="bg-primary text-on-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary-container transition-colors active:scale-95"
        >
          S'abonner
        </button>
      </form>
    </section>
  </div>
</template>

<script setup lang="ts">
// Meta tags
useHead({
  title: 'À Propos | Sunu Tawfekh',
  meta: [
    { name: 'description', content: 'Découvrez l\'histoire de Sunu Tawfekh, votre boutique de confiance à Dakar, et notre engagement envers la qualité et le service client.' }
  ]
})

const newsletterEmail = ref('')

const team = ref([
  {
    name: 'Sarah Chen',
    role: 'Founder & Creative Director',
    bio: 'Former architect with a passion for intentional living',
    image: 'https://picsum.photos/seed/sarah/200/200.jpg'
  },
  {
    name: 'Marcus Rivera',
    role: 'Head of Curation',
    bio: '15 years in luxury retail and design',
    image: 'https://picsum.photos/seed/marcus/200/200.jpg'
  },
  {
    name: 'Emma Thompson',
    role: 'Sustainability Lead',
    bio: 'Environmental scientist turned ethical sourcing advocate',
    image: 'https://picsum.photos/seed/emma/200/200.jpg'
  }
])

const subscribeNewsletter = () => {
  console.log('Newsletter subscription:', newsletterEmail.value)
  newsletterEmail.value = ''
}
</script>
