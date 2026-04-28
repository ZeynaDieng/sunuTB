import { defineStore } from 'pinia'
import type { AdaptedProduct } from '~/utils/productAdapter'
import { 
  getGuestId, 
  normalizePhoneNumber, 
  isValidSenegalesePhone, 
  debounce, 
  apiCall, 
  API_CONFIG, 
  type FavoriteSyncRequest,
  type FavoriteResponse,
  type LinkGuestRequest
} from '~/utils/guestManager'

export interface FavoriteItem {
  productId: string
  product: AdaptedProduct
  addedAt: string
}

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    items: [] as FavoriteItem[],
    isLoading: false,
    error: null as string | null,
    // Nouveaux états pour la synchronisation
    isSyncing: false,
    syncError: null as string | null,
    lastSyncDate: null as string | null,
    guestId: null as string | null,
    linkedPhone: null as string | null
  }),

  getters: {
    favoriteIds: (state) => state.items.map(item => item.productId),
    isFavorite: (state) => (productId: string) => state.items.some(item => item.productId === productId),
    favoriteCount: (state) => state.items.length,
    getFavoriteById: (state) => (productId: string) => state.items.find(item => item.productId === productId)
  },

  actions: {
    // Initialiser les favoris depuis localStorage
    initializeFavorites() {
      this.isLoading = true
      this.error = null
      
      try {
        this.loadFromLocalStorage()
      } catch (error) {
        console.error('Erreur lors de l\'initialisation des favoris:', error)
        this.error = 'Impossible de charger les favoris'
      } finally {
        this.isLoading = false
      }
    },

    // Charger depuis localStorage
    loadFromLocalStorage() {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('favorites')
        if (stored) {
          try {
            this.items = JSON.parse(stored)
          } catch (error) {
            console.error('Erreur parsing localStorage:', error)
            this.items = []
          }
        }
      }
    },

    // Sauvegarder dans localStorage
    saveToLocalStorage() {
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('favorites', JSON.stringify(this.items))
        } catch (error) {
          console.error('Erreur sauvegarde localStorage:', error)
        }
      }
    },

    // Ajouter un produit aux favoris
    addToFavorites(product: AdaptedProduct) {
      if (this.isFavorite(product.id)) {
        return // Déjà dans les favoris
      }

      this.isLoading = true
      this.error = null

      try {
        const favoriteItem: FavoriteItem = {
          productId: product.id,
          product,
          addedAt: new Date().toISOString()
        }

        this.items.push(favoriteItem)
        this.saveToLocalStorage()

        // Notification de succès
        this.showNotification('Produit ajouté aux favoris', 'success')
        
      } catch (error) {
        console.error('Erreur ajout favori:', error)
        this.error = 'Impossible d\'ajouter aux favoris'
        this.showNotification('Erreur lors de l\'ajout aux favoris', 'error')
        
        // Rollback
        this.items = this.items.filter(item => item.productId !== product.id)
      } finally {
        this.isLoading = false
      }
    },

    // Retirer un produit des favoris
    removeFromFavorites(productId: string) {
      if (!this.isFavorite(productId)) {
        return // Pas dans les favoris
      }

      this.isLoading = true
      this.error = null

      try {
        const favoriteItem = this.getFavoriteById(productId)
        this.items = this.items.filter(item => item.productId !== productId)
        this.saveToLocalStorage()

        // Notification de succès
        this.showNotification('Produit retiré des favoris', 'success')
        
      } catch (error) {
        console.error('Erreur retrait favori:', error)
        this.error = 'Impossible de retirer des favoris'
        this.showNotification('Erreur lors du retrait des favoris', 'error')
        
        // Rollback - récupérer l'item avant suppression
        const favoriteItem = this.getFavoriteById(productId)
        if (favoriteItem) {
          this.items.push(favoriteItem)
        }
      } finally {
        this.isLoading = false
      }
    },

    // Basculer le statut favori
    toggleFavorite(product: AdaptedProduct) {
      // Debug: Vérifier si le produit a un ID valide
      console.log('toggleFavorite called with product:', product)
      console.log('Product ID:', product.id)
      console.log('Product ID type:', typeof product.id)
      
      if (!product.id || product.id === 'undefined' || product.id === '') {
        console.error('Produit sans ID valide:', product)
        this.showNotification('Erreur: Produit invalide', 'error')
        return
      }
      
      if (this.isFavorite(product.id)) {
        this.removeFromFavorites(product.id)
      } else {
        this.addToFavorites(product)
      }
    },

    // Vider tous les favoris
    clearFavorites() {
      this.isLoading = true
      this.error = null

      try {
        this.items = []
        this.saveToLocalStorage()
        this.showNotification('Tous les favoris ont été supprimés', 'success')
        
      } catch (error) {
        console.error('Erreur vidage favoris:', error)
        this.error = 'Impossible de vider les favoris'
        this.showNotification('Erreur lors de la suppression des favoris', 'error')
      } finally {
        this.isLoading = false
      }
    },

    // Afficher une notification simple
    showNotification(message: string, type: 'success' | 'error' | 'info') {
      console.log(`[${type.toUpperCase()}] ${message}`)
      
      if (typeof window !== 'undefined') {
        // Créer une notification temporaire
        const notification = document.createElement('div')
        notification.className = `fixed top-4 right-4 px-4 py-2 rounded-lg text-white z-50 shadow-lg transition-all duration-300 ${
          type === 'success' ? 'bg-green-500' : 
          type === 'error' ? 'bg-red-500' : 'bg-blue-500'
        }`
        notification.textContent = message
        notification.style.transform = 'translateX(100%)'
        document.body.appendChild(notification)
        
        // Animation d'entrée
        setTimeout(() => {
          notification.style.transform = 'translateX(0)'
        }, 100)
        
        // Animation de sortie et suppression
        setTimeout(() => {
          notification.style.transform = 'translateX(100%)'
          setTimeout(() => {
            notification.remove()
          }, 300)
        }, 3000)
      }
    },

    // === NOUVELLES FONCTIONS DE SYNCHRONISATION ===

    // Initialiser le guest_id
    initializeGuest() {
      if (typeof window !== 'undefined') {
        this.guestId = getGuestId()
      }
    },

    // Récupérer les favoris depuis le téléphone (avec debounce)
    fetchFavoritesByPhone: debounce(async (phone: string) => {
      const normalizedPhone = normalizePhoneNumber(phone)
      
      if (!isValidSenegalesePhone(normalizedPhone)) {
        this.syncError = 'Numéro de téléphone invalide'
        return
      }

      try {
        this.isSyncing = true
        this.syncError = null
        
        // Appel API pour récupérer les favoris
        const response = await apiCall<FavoriteResponse[]>(
          `${API_CONFIG.ENDPOINTS.FAVORITES_BY_PHONE}?phone=${normalizedPhone}`
        )
        
        if (response.length > 0) {
          // Fusionner avec les favoris existants
          this.mergeFavorites(response)
          this.showNotification('Vos favoris ont été retrouvés !', 'success')
        }
        
        // Lier le guest_id au téléphone
        await this.linkGuestToPhone(normalizedPhone)
        
      } catch (error) {
        console.error('Erreur récupération favoris:', error)
        this.syncError = 'Impossible de récupérer vos favoris'
        this.showNotification('Erreur lors de la synchronisation', 'error')
      } finally {
        this.isSyncing = false
      }
    }, 1000), // 1 seconde de debounce

    // Fusionner les favoris existants avec ceux récupérés
    mergeFavorites(serverFavorites: FavoriteResponse[]) {
      const serverProductIds = new Set(serverFavorites.map(f => f.productId))
      const localProductIds = new Set(this.items.map(f => f.productId))
      
      // Ajouter les favoris du serveur qui ne sont pas en local
      const newFavorites = serverFavorites
        .filter(fav => !localProductIds.has(fav.productId))
        .map(fav => ({
          productId: fav.productId,
          product: {} as AdaptedProduct, // Sera rempli lors de la synchronisation complète
          addedAt: fav.addedAt
        }))

      if (newFavorites.length > 0) {
        this.items = [...this.items, ...newFavorites]
        this.saveToLocalStorage()
      }
    },

    // Synchroniser les favoris avec le serveur
    async syncFavorites(phone: string) {
      const normalizedPhone = normalizePhoneNumber(phone)
      
      if (!isValidSenegalesePhone(normalizedPhone)) {
        this.syncError = 'Numéro de téléphone invalide'
        return
      }

      try {
        this.isSyncing = true
        this.syncError = null
        
        const syncData: FavoriteSyncRequest = {
          guestId: this.guestId!,
          phone: normalizedPhone,
          favorites: this.items.map(item => ({
            productId: item.productId,
            addedAt: item.addedAt
          }))
        }

        // Envoyer les favoris au serveur
        await apiCall(API_CONFIG.ENDPOINTS.SYNC_FAVORITES, {
          method: 'POST',
          body: JSON.stringify(syncData)
        })

        this.lastSyncDate = new Date().toISOString()
        this.linkedPhone = normalizedPhone
        
        this.showNotification('Favoris synchronisés avec succès', 'success')
        
      } catch (error) {
        console.error('Erreur synchronisation:', error)
        this.syncError = 'Erreur lors de la synchronisation'
        this.showNotification('Erreur lors de la synchronisation', 'error')
      } finally {
        this.isSyncing = false
      }
    },

    // Lier le guest_id à un numéro de téléphone
    async linkGuestToPhone(phone: string) {
      try {
        const linkData: LinkGuestRequest = {
          guestId: this.guestId!,
          phone
        }

        await apiCall(API_CONFIG.ENDPOINTS.LINK_GUEST, {
          method: 'POST',
          body: JSON.stringify(linkData)
        })

        this.linkedPhone = phone
        
      } catch (error) {
        console.error('Erreur liaison guest:', error)
        // Ne pas afficher d'erreur à l'utilisateur, c'est transparent
      }
    }
  }
})
