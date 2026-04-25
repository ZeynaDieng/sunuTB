<template>
  <div class="">
    <!-- Données structurées Schema.org -->
    <JsonLd type="home" />

    <!-- ═══════════════════════════════════════════════
         HERO — pt-14 sm:pt-16 pour compenser la navbar fixe
    ═══════════════════════════════════════════════ -->
  <!-- Hero Section -->
<section class="relative overflow-hidden px-4 sm:px-6 md:px-16 min-h-[65vh] sm:min-h-[75vh]">
  <!-- BG image -->
  <div class="absolute inset-0">
    <img
      src="https://plus.unsplash.com/premium_photo-1661610756820-8dbfaaf9157e?q=80&w=2832&auto=format&fit=crop"
      alt="Boutique Sunu Tawfekh - Grande diversité de produits à Dakar"
      class="w-full h-full object-cover object-center"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-surface/70 via-surface/40 to-transparent"></div>
  </div>

  <!-- Contenu — pt-14 mobile (navbar h-14), pt-16 desktop (navbar h-16) -->
  <div
    class="relative z-10 flex items-center min-h-[65vh] sm:min-h-[75vh] pt-14 sm:pt-16"
    :class="heroVisible ? 'animate-hero-in' : 'opacity-0'"
  >
    <div class="max-w-xl py-8 sm:py-12">
      <span class="text-[11px] sm:text-xs uppercase tracking-[0.2em] text-primary font-bold mb-3 sm:mb-4 block first-letter:uppercase">
        Sunu Tawfekh Boutique 
      </span>
      <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-[1.05] mb-3 sm:mb-5 text-on-surface first-letter:uppercase">
        Votre Boutique<br/>
        de Confiance<br/>
        à Dakar
      </h1>
      <p class="text-sm sm:text-base md:text-lg text-on-surface-variant mb-5 sm:mb-8 leading-relaxed font-light max-w-sm sm:max-w-md first-letter:uppercase">
        De la mode à l'électronique, de la beauté à l'alimentation Sunu Tawfekh vous offre le meilleur du marché sénégalais.
      </p>

      <!-- CTA — toujours en ligne, jamais pleine largeur -->
      <div class="flex flex-row items-center gap-2 sm:gap-4">
        <NuxtLink
          to="/shop"
          class="bg-secondary-container text-on-secondary-container px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-lg font-semibold flex items-center gap-1.5 hover:bg-secondary-fixed transition-colors duration-300 shadow-md active:scale-95 text-sm sm:text-base whitespace-nowrap"
        >
          Parcourir
          <span class="material-symbols-outlined text-[18px] sm:text-[20px]">arrow_forward</span>
        </NuxtLink>
        <button class="bg-white/40 backdrop-blur-md border border-white/20 text-on-surface px-4 sm:px-7 py-2.5 sm:py-3.5 rounded-lg font-semibold hover:bg-white/60 transition-all active:scale-95 text-sm sm:text-base whitespace-nowrap">
          Catégories
        </button>
      </div>
    </div>
  </div>
</section>

    <!-- ═══════════════════════════════════════════════
         CATEGORIES PILLS
    ═══════════════════════════════════════════════ -->
    <section class="py-3 sm:py-5 px-4 sm:px-6 md:px-16 bg-surface border-b border-outline-variant/10">
      <div class="max-w-7xl mx-auto">
        <div
          class="flex gap-2 sm:gap-3 overflow-x-auto pb-1 scrollbar-none"
          style="-ms-overflow-style:none; scrollbar-width:none;"
          ref="pillsRef"
        >
          <NuxtLink
            v-for="(cat, i) in categories"
            :key="cat.slug"
            :to="`/categories/${cat.slug}`"
            class="flex-shrink-0 flex items-center gap-2 sm:gap-2.5 pl-1 sm:pl-1.5 pr-3 sm:pr-4 py-1 sm:py-1.5 rounded-full border border-outline-variant/30 bg-surface hover:border-outline-variant hover:bg-surface-container transition-all duration-200"
            :style="pillsVisible ? `opacity:1; transform:translateY(0); transition: opacity .35s ease ${i * 40}ms, transform .35s ease ${i * 40}ms` : 'opacity:0; transform:translateY(6px)'"
          >
            <img :src="cat.image" :alt="cat.name" class="w-7 h-7 sm:w-8 sm:h-8 rounded-full object-cover flex-shrink-0" />
            <span class="text-xs sm:text-sm font-medium text-on-surface whitespace-nowrap">{{ cat.name }}</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         NOUVEAUTÉS
    ═══════════════════════════════════════════════ -->
    <section
      class="py-14 sm:py-24 px-4 sm:px-8 md:px-16 bg-surface-container-low"
      ref="newArrivalsRef"
      :class="newArrivalsVisible ? 'animate-section-in' : 'opacity-0 translate-y-6'"
    >
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-10 sm:mb-16">
          <h2 class="text-2xl sm:text-4xl font-extrabold tracking-tighter mb-3 sm:mb-4 first-letter:uppercase">Nouveautés</h2>
          <p class="text-sm sm:text-lg text-on-surface-variant first-letter:uppercase">Les derniers produits arrivés dans votre boutique de Dakar.</p>
        </div>

        <div v-if="newProducts.length > 0" class="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6 mb-8 sm:mb-12">
          <!-- Main Product -->
          <div class="md:col-span-8 group relative overflow-hidden rounded-2xl bg-surface-container min-h-[240px] sm:min-h-[380px] md:h-[600px]">
            <img
              v-if="hasValidImage(newProducts[0]?.image) && !imageErrors[newProducts[0]?.id]"
              :src="newProducts[0].image"
              :alt="newProducts[0].name || 'New Arrival'"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              @error="imageErrors[newProducts[0].id] = true"
            />
            <div v-else class="w-full h-full flex flex-col items-center justify-center gap-3 bg-surface-container">
              <span class="text-[56px] sm:text-[96px] font-semibold leading-none tracking-tighter text-on-surface/20 select-none">
                {{ newProducts[0]?.name?.charAt(0).toUpperCase() ?? '?' }}
              </span>
              <div class="w-6 h-px bg-outline-variant/40"></div>
              <span class="text-[10px] sm:text-[11px] font-medium uppercase tracking-[0.15em] text-on-surface/30 text-center px-8 leading-snug select-none">
                {{ newProducts[0]?.name }}
              </span>
            </div>
            <div v-if="hasValidImage(newProducts[0]?.image) && !imageErrors[newProducts[0]?.id]" class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            <div
              class="absolute bottom-4 sm:bottom-8 left-4 sm:left-8"
              :class="hasValidImage(newProducts[0]?.image) && !imageErrors[newProducts[0]?.id] ? 'text-white' : 'text-on-surface'"
            >
              <h3 class="text-lg sm:text-3xl font-bold mb-1 sm:mb-2">{{ newProducts[0]?.name || 'Nouveauté' }}</h3>
              <p class="mb-2 sm:mb-4 opacity-80 text-sm sm:text-base">{{ Math.round(newProducts[0]?.price || 0).toLocaleString('fr-FR') }} FCFA</p>
              <NuxtLink
                :to="`/products/${newProducts[0]?.id}`"
                class="inline-flex items-center gap-2 font-medium hover:gap-4 transition-all text-sm sm:text-base"
                :class="hasValidImage(newProducts[0]?.image) && !imageErrors[newProducts[0]?.id] ? 'border-b-2 border-white pb-1' : 'border-b-2 border-on-surface pb-1'"
              >
                Découvrir <span class="material-symbols-outlined text-sm">north_east</span>
              </NuxtLink>
            </div>
          </div>

          <!-- Side Products -->
          <div class="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-3 sm:gap-6 md:h-[600px]">
            <div
              v-for="product in newProducts.slice(1, 3)"
              :key="product.id"
              class="group relative overflow-hidden rounded-2xl bg-surface-container min-h-[150px] md:flex-1"
            >
              <img
                v-if="hasValidImage(product?.image) && !imageErrors[product?.id]"
                :src="product.image"
                :alt="product.name || 'Product'"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                @error="imageErrors[product.id] = true"
              />
              <div v-else class="w-full h-full flex flex-col items-center justify-center gap-2 bg-surface-container">
                <span class="text-[36px] sm:text-[56px] font-semibold leading-none tracking-tighter text-on-surface/20 select-none">
                  {{ product?.name?.charAt(0).toUpperCase() ?? '?' }}
                </span>
                <div class="w-5 h-px bg-outline-variant/40"></div>
                <span class="text-[9px] font-medium uppercase tracking-[0.15em] text-on-surface/30 text-center px-4 leading-snug select-none">{{ product?.name }}</span>
              </div>
              <div v-if="hasValidImage(product?.image) && !imageErrors[product?.id]" class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div
                class="absolute inset-0 flex flex-col justify-end p-3 sm:p-6"
                :class="hasValidImage(product?.image) && !imageErrors[product?.id] ? 'text-white' : 'text-on-surface'"
              >
                <h4 class="text-sm sm:text-xl font-bold mb-0.5 sm:mb-1 line-clamp-1">{{ product?.name || 'Produit' }}</h4>
                <div class="flex items-center justify-between">
                  <p class="text-xs sm:text-sm opacity-80">{{ Math.round(product?.price || 0).toLocaleString('fr-FR') }} FCFA</p>
                  <NuxtLink :to="`/products/${product?.id}`" class="text-[10px] sm:text-xs font-semibold underline underline-offset-4 hover:underline-offset-8 transition-all">Acheter</NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Loading -->
        <div v-else-if="loading" class="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6 mb-8 sm:mb-12">
          <div class="md:col-span-8 h-[240px] sm:h-[380px] md:h-[600px] animate-pulse bg-surface-container rounded-2xl"></div>
          <div class="md:col-span-4 grid grid-cols-2 md:grid-cols-1 gap-3 sm:gap-6">
            <div class="h-[150px] animate-pulse bg-surface-container rounded-2xl"></div>
            <div class="h-[150px] animate-pulse bg-surface-container rounded-2xl"></div>
          </div>
        </div>

        <!-- Empty -->
        <div v-else class="text-center py-14 sm:py-20">
          <h3 class="text-xl sm:text-2xl font-bold text-on-surface mb-4 first-letter:uppercase">Aucun produit trouvé</h3>
          <p class="text-on-surface-variant text-sm sm:text-base first-letter:uppercase">Revenez plus tard pour découvrir nos nouveautés.</p>
        </div>

        <div class="text-center mt-6 sm:mt-0">
          <NuxtLink to="/shop" class="inline-flex items-center gap-2 bg-primary text-on-primary px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base hover:bg-primary/90 transition-colors duration-300 shadow-lg shadow-primary/10 active:scale-95 first-letter:uppercase">
            Voir Toutes les Nouveautés
            <span class="material-symbols-outlined">arrow_forward</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         BEST SELLERS
    ═══════════════════════════════════════════════ -->
    <section
      class="py-14 sm:py-24 bg-surface"
      ref="bestSellersRef"
      :class="bestSellersVisible ? 'animate-section-in' : 'opacity-0 translate-y-6'"
    >
      <div class="max-w-7xl mx-auto mb-8 sm:mb-16 px-4 sm:px-8 md:px-16 flex items-end justify-between gap-4">
        <div>
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground first-letter:uppercase">Sélection du moment</h2>
          <p class="mt-1 sm:mt-2 text-xs sm:text-sm md:text-base text-muted-foreground first-letter:uppercase">Nos produits les plus populaires</p>
        </div>
        <NuxtLink to="/catalogue" class="hidden md:flex items-center gap-2 text-sm font-medium text-primary hover:gap-3 transition-all flex-shrink-0 first-letter:uppercase">
          Voir tous les produits <span>→</span>
        </NuxtLink>
      </div>

      <div v-if="featuredProducts.length > 0" class="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
        <div
          v-for="(product, i) in featuredProducts"
          :key="product.id"
          :style="bestSellersVisible ? `opacity:1; transform:translateY(0); transition: opacity .4s ease ${i * 80}ms, transform .4s ease ${i * 80}ms` : 'opacity:0; transform:translateY(16px)'"
        >
          <ProductCard :product="product" />
        </div>
      </div>
      <div v-else-if="loadingProducts" class="max-w-7xl mx-auto px-4 sm:px-8 md:px-16 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
        <div v-for="i in 4" :key="i" class="animate-pulse">
          <div class="aspect-[3/4] bg-surface-container rounded-xl mb-3 sm:mb-4"></div>
          <div class="h-3 sm:h-4 bg-surface-container rounded w-3/4 mb-2"></div>
          <div class="h-2 sm:h-3 bg-surface-container rounded w-1/2"></div>
        </div>
      </div>
      <div v-else class="max-w-7xl mx-auto px-4 text-center py-14 sm:py-20">
        <h3 class="text-xl sm:text-2xl font-bold text-on-surface mb-4">Aucun produit trouvé</h3>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         FEATURED PRODUCTS
    ═══════════════════════════════════════════════ -->
    <section
      class="py-14 sm:py-24 px-4 sm:px-8 md:px-16 bg-surface-container-low"
      ref="featuredRef"
      :class="featuredVisible ? 'animate-section-in' : 'opacity-0 translate-y-6'"
    >
      <div class="flex justify-between items-end mb-8 sm:mb-12 max-w-7xl mx-auto">
        <div>
          <h2 class="text-2xl sm:text-3xl font-bold text-on-surface mb-1 sm:mb-2 first-letter:uppercase">Produits Vedettes</h2>
          <p class="text-on-surface-variant text-xs sm:text-base first-letter:uppercase">Une sélection de nos meilleurs produits.</p>
        </div>
        <NuxtLink to="/shop" class="text-primary font-semibold hover:text-primary-container transition-colors text-sm flex-shrink-0 first-letter:uppercase">
          Voir Tout <span class="material-symbols-outlined text-sm align-middle">arrow_forward</span>
        </NuxtLink>
      </div>

      <div v-if="loadingProducts" class="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
        <div v-for="i in 4" :key="i" class="animate-pulse">
          <div class="aspect-[3/4] bg-surface-container rounded-xl mb-3"></div>
          <div class="h-3 bg-surface-container rounded w-3/4 mb-2"></div>
          <div class="h-2 bg-surface-container rounded w-1/2"></div>
        </div>
      </div>
      <div v-else-if="featuredProducts.length > 0" class="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 lg:gap-8">
        <div
          v-for="(product, i) in featuredProducts"
          :key="product.id"
          :style="featuredVisible ? `opacity:1; transform:translateY(0); transition: opacity .4s ease ${i * 80}ms, transform .4s ease ${i * 80}ms` : 'opacity:0; transform:translateY(16px)'"
        >
          <ProductCard :product="product" />
        </div>
      </div>
      <div v-else class="max-w-7xl mx-auto text-center py-10">
        <p class="text-on-surface-variant text-sm mb-2 first-letter:uppercase">No products available at the moment.</p>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         PROMO BANNER
    ═══════════════════════════════════════════════ -->
 <!-- Bannière WhatsApp -->
<section
  class="my-8 sm:my-12 px-4 sm:px-8 md:px-16"
  ref="promoRef"
  :class="promoVisible ? 'animate-section-in' : 'opacity-0 translate-y-6'"
>
  <div class="bg-surface-container rounded-2xl overflow-hidden relative ">
 
    <!-- Halos décoratifs couleur primary -->
    <div class="absolute top-0 right-0 w-80 h-80 bg-primary rounded-full blur-[120px] opacity-10 pointer-events-none"></div>
    <div class="absolute bottom-0 left-1/3 w-48 h-48 bg-primary rounded-full blur-[80px] opacity-5 pointer-events-none"></div>
 
    <div class="relative z-10 flex flex-col md:flex-row items-center">
 
      <!-- LEFT — contenu -->
      <div class="flex-1 p-8 sm:p-12 md:p-16 flex flex-col gap-6">
 
 
        <!-- Titre -->
        <div>
          <h2 class="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tighter leading-tight text-on-surface mb-3 first-letter:uppercase">
            Commandez sur<br/>
            <span class="text-primary">WhatsApp</span><br/>
            en 2 minutes
          </h2>
          <p class="text-sm sm:text-base text-on-surface-variant leading-relaxed max-w-sm first-letter:uppercase">
            Envoyez-nous un message, choisissez vos produits et recevez votre commande à domicile très rapidement.
          </p>
        </div>
 
        <!-- Étapes -->
        <div class="flex flex-col gap-3">
          <div v-for="(step, i) in waSteps" :key="i" class="flex items-center gap-3">
            <div class="w-6 h-6 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0">
              <span class="text-[11px] font-bold text-primary">{{ i + 1 }}</span>
            </div>
            <span class="text-sm text-on-surface-variant">{{ step }}</span>
          </div>
        </div>
 
        <!-- CTA -->
        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-5">
          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2.5 bg-primary text-on-primary px-6 py-3.5 rounded-xl font-bold text-sm sm:text-base hover:bg-primary/90 transition-all duration-200 active:scale-95 shadow-lg shadow-primary/20 first-letter:uppercase"
          >
            <svg class="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Commander sur WhatsApp
          </a>
          <div class="flex items-center gap-2">
            <span class="text-xs text-on-surface-variant first-letter:uppercase">Réponse en moins de 5 min</span>
          </div>
        </div>
      </div>
 
      <!-- RIGHT — bulles WhatsApp décoratives -->
      <div class="hidden md:flex w-72 lg:w-80 flex-shrink-0 items-center justify-center p-8 md:pr-14">
        <div class="flex flex-col gap-3 w-full max-w-[220px]">
 
          <div class="self-start bg-surface-container rounded-2xl rounded-tl-sm px-4 py-3 max-w-[180px]">
            <p class="text-xs text-on-surface font-medium mb-1 first-letter:uppercase">Bonjour ! 👋</p>
            <p class="text-[11px] text-on-surface-variant first-letter:uppercase">Je voudrais commander...</p>
            <p class="text-[10px] text-on-surface-variant/50 mt-1.5 text-right">09:41</p>
          </div>

          <div class="self-end bg-primary rounded-2xl rounded-tr-sm px-4 py-3 max-w-[190px]">
            <p class="text-xs text-on-primary font-medium mb-1 first-letter:uppercase">Bonjour ! Bienvenue chez Sunu Tawfekh 🛍️</p>
            <p class="text-[11px] text-on-primary/80 first-letter:uppercase">Que puis-je vous proposer ?</p>
            <p class="text-[10px] text-on-primary/50 mt-1.5 text-right">09:41 ✓✓</p>
          </div>

          <div class="self-start bg-surface-container rounded-2xl rounded-tl-sm px-4 py-3 max-w-[160px]">
            <p class="text-xs text-on-surface first-letter:uppercase">Une tunique taille M 🙏</p>
            <p class="text-[10px] text-on-surface-variant/50 mt-1.5 text-right">09:42</p>
          </div>

          <div class="self-end bg-primary rounded-2xl rounded-tr-sm px-4 py-3 max-w-[190px]">
            <p class="text-xs text-on-primary first-letter:uppercase">Parfait ! Livraison aujourd'hui 🚀</p>
            <p class="text-[10px] text-on-primary/50 mt-1.5 text-right">09:42 ✓✓</p>
          </div>
 
        </div>
      </div>
 
    </div>
  </div>
</section>

    <!-- ═══════════════════════════════════════════════
         TÉMOIGNAGES
    ═══════════════════════════════════════════════ -->
    <section
      class="py-14 sm:py-24 px-4 sm:px-8 md:px-16 bg-surface-container"
      ref="reviewsRef"
      :class="reviewsVisible ? 'animate-section-in' : 'opacity-0 translate-y-6'"
    >
      <div class="max-w-4xl mx-auto text-center mb-10 sm:mb-16">
        <h2 class="text-2xl sm:text-3xl font-bold mb-4 first-letter:uppercase">La Voix de Nos Clients</h2>
        <div class="w-12 h-1 bg-primary mx-auto"></div>
      </div>
      <div class="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8">
        <div
          v-for="(review, i) in reviews"
          :key="review.initials"
          class="bg-surface-container-lowest p-6 sm:p-8 rounded-xl shadow-sm"
          :style="reviewsVisible ? `opacity:1; transform:translateY(0); transition: opacity .4s ease ${i * 100}ms, transform .4s ease ${i * 100}ms` : 'opacity:0; transform:translateY(16px)'"
        >
          <div class="flex text-secondary mb-3 sm:mb-4">
            <span v-for="s in 5" :key="s" class="material-symbols-outlined text-base sm:text-xl" style="font-variation-settings: 'FILL' 1;">star</span>
          </div>
          <p class="text-on-surface-variant italic mb-4 sm:mb-6 text-sm sm:text-base leading-relaxed first-letter:uppercase">{{ review.text }}</p>
          <div class="flex items-center gap-3 sm:gap-4">
            <div class="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">{{ review.initials }}</div>
            <div>
              <p class="text-sm font-bold first-letter:uppercase">{{ review.name }}</p>
              <p class="text-xs text-on-surface-variant first-letter:uppercase">{{ review.role }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ═══════════════════════════════════════════════
         NEWSLETTER
    ═══════════════════════════════════════════════ -->
    <section
      class="py-14 sm:py-24 px-4 sm:px-8 md:px-16 flex flex-col items-center text-center bg-surface-container-low border-y border-outline-variant/10"
      ref="newsletterRef"
      :class="newsletterVisible ? 'animate-section-in' : 'opacity-0 translate-y-6'"
    >
      <h2 class="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4 first-letter:uppercase">L'Actualité Sunu Tawfekh</h2>
      <p class="max-w-lg text-on-surface-variant mb-7 sm:mb-10 text-sm sm:text-base first-letter:uppercase">Rejoignez notre communauté pour un accès anticipé aux nouvelles collections, les tendances du marché et les offres exclusives.</p>
      <form @submit.prevent="subscribeNewsletter" class="w-full max-w-md flex flex-col sm:flex-row gap-3 sm:gap-4">
        <input
          v-model="newsletterEmail"
          class="flex-1 bg-surface-container-lowest border border-outline-variant/20 rounded-lg px-5 sm:px-6 py-3 sm:py-4 text-sm sm:text-base focus:ring-2 focus:ring-primary focus:border-transparent transition-all outline-none"
          placeholder="Adresse Email"
          type="email"
          required
        />
        <button type="submit" class="bg-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold text-sm sm:text-base hover:bg-primary-container transition-colors active:scale-95 shadow-lg shadow-primary/20 first-letter:uppercase">
          S'abonner
        </button>
      </form>
      <p class="mt-4 sm:mt-6 text-xs text-on-surface-variant opacity-60 first-letter:uppercase">En vous abonnant, vous acceptez nos Conditions Générales et notre Politique de Confidentialité.</p>
    </section>

  </div>
</template>

<script setup lang="ts">
import { useCart } from '~/stores/cart'
import { adaptOrionProducts } from '~/utils/productAdapter'
import { useOrionAPI } from '~/composables/useOrionAPI'

useHead({
  title: 'Sunu Tawfekh | Votre Boutique de Confiance à Dakar',
  meta: [
    { name: 'description', content: 'Sunu Tawfekh - Grande diversité de produits à Dakar. Mode, électronique, beauté, alimentation et plus. Votre boutique sénégalaise de confiance.' }
  ]
})

const orion = useOrionAPI()

// ─── Détection mobile ────────────────────────────────────────────────────────
const isMobile = ref(false)
onMounted(() => {
  isMobile.value = window.innerWidth < 640
  window.addEventListener('resize', () => { isMobile.value = window.innerWidth < 640 })
})

// ─── Intersection Observer helper ────────────────────────────────────────────
function useVisible() {
  const el = ref<HTMLElement | null>(null)
  const visible = ref(false)
  onMounted(() => {
    if (!el.value) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { visible.value = true; obs.disconnect() }
    }, { threshold: 0.08 })
    obs.observe(el.value)
  })
  return { el, visible }
}

const heroVisible = ref(false)
const { el: pillsRef,       visible: pillsVisible }      = useVisible()
const { el: newArrivalsRef, visible: newArrivalsVisible } = useVisible()
const { el: bestSellersRef, visible: bestSellersVisible } = useVisible()
const { el: featuredRef,    visible: featuredVisible }    = useVisible()
const { el: promoRef,       visible: promoVisible }       = useVisible()
const { el: reviewsRef,     visible: reviewsVisible }     = useVisible()
const { el: newsletterRef,  visible: newsletterVisible }  = useVisible()

onMounted(() => { requestAnimationFrame(() => { heroVisible.value = true }) })

// ─── Fallback image ───────────────────────────────────────────────────────────
const imageErrors = reactive<Record<string, boolean>>({})
const INVALID_PATTERNS = ['placeholder', 'no-image', 'noimage', 'default', 'blank', '.svg']
const hasValidImage = (url?: string) => {
  if (!url || url.trim() === '') return false
  return !INVALID_PATTERNS.some(p => url.toLowerCase().includes(p))
}

// ─── API ──────────────────────────────────────────────────────────────────────
const { data: newOrionProducts, pending: loading } = await useAsyncData(
  'new-products',
  () => orion.getProducts({ pageSize: 20, sort: 'createdAt:desc' })
)
const adaptedProducts = computed(() => {
  if (!newOrionProducts.value) return []
  try { return adaptOrionProducts(newOrionProducts.value) } catch { return [] }
})
const newProducts = computed(() => {
  const list = adaptedProducts.value
  if (!list.length) return []
  const fresh = list.filter(p => p.isNew)
  const rest = [...list].filter(p => !p.isNew).sort((a, b) => (b.rating || 0) - (a.rating || 0))
  const merged = fresh.length > 0 ? [...fresh, ...rest] : list.slice(0, 5)
  const seen = new Set<string>(); const out: any[] = []
  for (const p of merged) {
    if (seen.has(p.id)) continue
    seen.add(p.id); out.push(p)
    if (out.length >= 5) break
  }
  return out
})

const { data: featuredOrionProducts, pending: loadingProducts } = await useAsyncData(
  'featured-products',
  () => orion.getProducts({ pageSize: 4 })
)
const featuredProducts = computed(() => {
  if (!featuredOrionProducts.value) return []
  try { return adaptOrionProducts(featuredOrionProducts.value) } catch { return [] }
})

// ─── Catégories ───────────────────────────────────────────────────────────────
const categories = [
  { name: 'Mode',        slug: 'mode',         image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=80&q=80&fit=crop' },
  { name: 'Électronique',slug: 'electronique', image: 'https://images.unsplash.com/photo-1588508065123-287b28e013da?w=80&q=80&fit=crop' },
  { name: 'Beauté',      slug: 'beaute',       image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=80&q=80&fit=crop' },
  { name: 'Alimentation',slug: 'alimentation', image: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=80&q=80&fit=crop' },
  { name: 'Maison',      slug: 'maison',       image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=80&q=80&fit=crop' },
  { name: 'Sport',       slug: 'sport',        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=80&q=80&fit=crop' },
  { name: 'Enfants',     slug: 'enfants',      image: 'https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=80&q=80&fit=crop' },
  { name: 'Auto',        slug: 'auto',         image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=80&q=80&fit=crop' },
  { name: 'Parfums',     slug: 'parfums',      image: 'https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?w=80&q=80&fit=crop' },
  { name: 'Accessoires', slug: 'accessoires',  image: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=80&q=80&fit=crop' },
  { name: 'Téléphones',  slug: 'telephones',   image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=80&q=80&fit=crop' },
  { name: 'Informatique',slug: 'informatique', image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=80&q=80&fit=crop' },
  { name: 'Santé',       slug: 'sante',        image: 'https://images.unsplash.com/photo-1580281657521-2b1c1c4b2b0c?w=80&q=80&fit=crop' },
  { name: 'Bricolage',   slug: 'bricolage',    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=80&q=80&fit=crop' },
  { name: 'Voyage',      slug: 'voyage',       image: 'https://images.unsplash.com/photo-1502920917128-1aa500764b1c?w=80&q=80&fit=crop' },
  { name: 'Services',    slug: 'services',     image: 'https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=80&q=80&fit=crop' },
]

// ─── Témoignages ──────────────────────────────────────────────────────────────
const reviews = [
  { initials: 'AD', name: 'Aïssa D.',  role: 'Cliente fidèle',   text: '"Sunu Tawfekh est ma boutique de référence à Dakar ! Des produits de qualité et un service client exceptionnel. Je recommande vivement !"' },
  { initials: 'MB', name: 'Moussa B.', role: 'Client régulier',  text: '"La diversité des produits est incroyable ! Je trouve tout ce dont j\'ai besoin. Livraison rapide à Pikine."' },
  { initials: 'FN', name: 'Fatou N.',  role: 'Cliente satisfaite',text: '"Excellente expérience ! Des prix compétitifs et des produits authentiques. Le personnel est très professionnel."' },
]

// ─── Newsletter ───────────────────────────────────────────────────────────────
const newsletterEmail = ref('')
const subscribeNewsletter = () => { newsletterEmail.value = '' }

const waSteps = [
  'Envoyez "Bonjour" sur WhatsApp',
  'Choisissez vos produits avec notre équipe',
  'Recevez votre commande à Dakar',
]
 
const whatsappUrl = computed(() => {
  const phone = '22177000000' // +221 77 000 00 00 sans espaces ni +
  const message = encodeURIComponent('Bonjour ! Je souhaite passer une commande sur Sunu Tawfekh.')
  return `https://wa.me/${phone}?text=${message}`
})

const cartStore = useCart()
</script>

<style>
@keyframes heroIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-hero-in { animation: heroIn .6s cubic-bezier(.22,1,.36,1) both; }

@keyframes sectionIn {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
.animate-section-in { animation: sectionIn .55s cubic-bezier(.22,1,.36,1) both; }

.scrollbar-none::-webkit-scrollbar { display: none; }
</style>