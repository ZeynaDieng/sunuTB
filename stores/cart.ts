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
    },

    removeItem(id: string) {
      this.items = this.items.filter(i => i.product.id !== id)
    },
clearCart() {
  this.items = []
},
    updateQuantity(id: string, qty: number) {
      const item = this.items.find(i => i.product.id === id)
      if (!item) return

      if (qty <= 0) {
        this.removeItem(id)
      } else {
        item.quantity = qty
      }
    }
  }
})