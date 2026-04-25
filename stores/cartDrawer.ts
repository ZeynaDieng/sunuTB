export const useCartDrawer = defineStore('cartDrawer', {
  state: () => ({
    isOpen: false
  }),

  actions: {
    open() {
      this.isOpen = true
    },
    close() {
      this.isOpen = false
    }
  }
})