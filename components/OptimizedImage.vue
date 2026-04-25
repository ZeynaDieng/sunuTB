<template>
  <div class="relative">
    <!-- Image WebP optimisée avec fallback -->
    <picture>
      <!-- WebP pour les navigateurs modernes -->
      <source 
        v-if="webpUrl"
        :srcset="webpUrl"
        type="image/webp"
      />
      
      <!-- Fallback JPEG/PNG original -->
      <img
        :src="fallbackUrl"
        :alt="alt"
        :class="imageClass"
        :loading="lazy ? 'lazy' : 'eager'"
        :width="width"
        :height="height"
        @error="handleError"
        @load="handleLoad"
      />
    </picture>

    <!-- État de chargement -->
    <div 
      v-if="isLoading"
      class="absolute inset-0 bg-surface-container animate-pulse flex items-center justify-center"
    >
      <div class="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
    </div>

    <!-- Fallback élégant si image invalide -->
    <div 
      v-if="hasError"
      class="absolute inset-0 bg-surface-container flex flex-col items-center justify-center gap-3"
    >
      <span class="text-4xl font-semibold text-on-surface/20 select-none">
        {{ initial }}
      </span>
      <div class="w-8 h-px bg-outline-variant/40"></div>
      <span class="text-xs font-medium uppercase tracking-[0.15em] text-on-surface/30 text-center px-3 select-none">
        {{ alt }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  src: string
  alt: string
  class?: string
  width?: number
  height?: number
  lazy?: boolean
  fallbackInitial?: string
}

const props = withDefaults(defineProps<Props>(), {
  class: 'w-full h-full object-cover',
  lazy: true
})

const isLoading = ref(true)
const hasError = ref(false)

// Générer l'URL WebP si possible
const webpUrl = computed(() => {
  if (!props.src) return null
  
  // Vérifier si c'est déjà une image externe (Unsplash, etc.)
  if (props.src.includes('unsplash.com') || props.src.includes('picsum.photos')) {
    // Pour Unsplash, ajouter le format WebP
    if (props.src.includes('unsplash.com')) {
      return props.src + '&fm=webp&w=' + (props.width || 800)
    }
    return null
  }
  
  // Pour les images locales, essayer de convertir en WebP
  if (props.src.includes('/uploads/') || props.src.includes('/images/')) {
    return props.src.replace(/\.(jpg|jpeg|png)$/i, '.webp')
  }
  
  return null
})

// URL de fallback
const fallbackUrl = computed(() => {
  if (!props.src) return ''
  
  // Optimiser les images externes
  if (props.src.includes('unsplash.com')) {
    return props.src + '&w=' + (props.width || 800)
  }
  
  if (props.src.includes('picsum.photos')) {
    return props.src + '&w=' + (props.width || 800)
  }
  
  return props.src
})

// Classes CSS
const imageClass = computed(() => {
  const base = props.class
  const hidden = hasError.value ? 'opacity-0' : 'opacity-100'
  return `${base} transition-opacity duration-300 ${hidden}`
})

// Initiale pour le fallback
const initial = computed(() => {
  if (props.fallbackInitial) return props.fallbackInitial
  return props.alt?.charAt(0)?.toUpperCase() || '?'
})

const handleError = () => {
  hasError.value = true
  isLoading.value = false
}

const handleLoad = () => {
  isLoading.value = false
}

// Réinitialiser quand la source change
watch(() => props.src, () => {
  isLoading.value = true
  hasError.value = false
})
</script>
