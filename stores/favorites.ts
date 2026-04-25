import { defineStore } from 'pinia'
import type { AdaptedProduct } from '~/utils/productAdapter'

export interface FavoriteItem {
  productId: string
  product: AdaptedProduct
  addedAt: string
}

export const useFavoritesStore = defineStore('favorites', {
  state: () => ({
    items: [] as FavoriteItem[],
    isLoading: false,
    error: null as string | null
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
    }
  }
})
