import { useFavoritesStore } from '~/stores/favorites'

export default defineNuxtPlugin(() => {
  const favorites = useFavoritesStore()
  
  // Initialiser les favoris au chargement de l'application (plugin client-only)
  favorites.initializeFavorites()
})
