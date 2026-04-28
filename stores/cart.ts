export const useCart = defineStore('cart', {
  state: () => ({
    items: [] as any[],
  }),

  getters: {
    totalItems: (state) => state.items.length,
    totalPrice: (state) =>
      state.items.reduce((t, i) => t + i.product.price * i.quantity, 0),
  },

  actions: {
    // Initialiser le panier depuis localStorage
    initializeCart() {
      if (typeof window !== 'undefined') {
        const savedCart = localStorage.getItem('cart')
        if (savedCart) {
          try {
            this.items = JSON.parse(savedCart)
          } catch (error) {
            console.error('Erreur lors du chargement du panier:', error)
            this.items = []
          }
        }
      }
    },

    // Sauvegarder le panier dans localStorage
    saveCart() {
      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem('cart', JSON.stringify(this.items))
        } catch (error) {
          console.error('Erreur lors de la sauvegarde du panier:', error)
        }
      }
    },

    addItem(product: any) {
      const existing = this.items.find(i => i.product.id === product.id)

      if (existing) {
        existing.quantity++
      } else {
        this.items.push({
          product,
          quantity: 1
        })
      }
      
      // Sauvegarder après ajout
      this.saveCart()
    },

    removeItem(id: string) {
      this.items = this.items.filter(i => i.product.id !== id)
      // Sauvegarder après suppression
      this.saveCart()
    },

    clearCart() {
      this.items = []
      // Sauvegarder après vidage
      this.saveCart()
    },

    updateQuantity(id: string, qty: number) {
      const item = this.items.find(i => i.product.id === id)
      if (!item) return

      if (qty <= 0) {
        this.removeItem(id)
      } else {
        item.quantity = qty
        // Sauvegarder après mise à jour
        this.saveCart()
      }
    }
  }
})