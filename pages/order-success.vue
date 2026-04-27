<template>
  <div class="pt-24 pb-20 px-4 md:px-8 max-w-4xl mx-auto">
    <div class="text-center">
      <!-- Success Icon -->
      <div class="w-20 h-20 bg-primary-container/20 rounded-full flex items-center justify-center mx-auto mb-8">
        <span class="material-symbols-outlined text-4xl text-primary" style="font-variation-settings: 'FILL' 1;">
          check_circle
        </span>
      </div>

      <!-- Success Message -->
      <h1 class="text-4xl md:text-5xl font-headline font-extrabold tracking-tighter mb-4">Order Confirmed!</h1>
      <p class="text-xl text-on-surface-variant mb-8 max-w-2xl mx-auto">
        Thank you for your order. We've received your request and will begin preparing your curated items with care.
      </p>

      <!-- Order Details -->
      <div class="bg-surface-container-low rounded-2xl p-8 text-left max-w-2xl mx-auto mb-8">
        <div class="flex justify-between items-start mb-6">
          <div>
            <h2 class="font-bold text-on-surface mb-2">Order #{{ orderNumber }}</h2>
            <p class="text-sm text-on-surface-variant">Placed on {{ orderDate }}</p>
          </div>
          <div class="text-right">
            <p class="text-sm text-on-surface-variant mb-1">Total Amount</p>
            <p class="text-2xl font-bold text-primary">${{ orderTotal.toFixed(2) }}</p>
          </div>
        </div>

        <div class="border-t border-outline-variant/20 pt-6">
          <h3 class="font-bold text-on-surface mb-4">What's Next?</h3>
          <div class="space-y-4">
            <div class="flex gap-3">
              <span class="material-symbols-outlined text-primary">email</span>
              <div>
                <p class="font-medium text-on-surface">Order Confirmation</p>
                <p class="text-sm text-on-surface-variant">We've sent a detailed confirmation to your email address.</p>
              </div>
            </div>
            <div class="flex gap-3">
              <span class="material-symbols-outlined text-primary">local_shipping</span>
              <div>
                <p class="font-medium text-on-surface">Processing & Shipping</p>
                <p class="text-sm text-on-surface-variant">Your order will be processed within 1-2 business days.</p>
              </div>
            </div>
            <div class="flex gap-3">
              <span class="material-symbols-outlined text-primary">notifications</span>
              <div>
                <p class="font-medium text-on-surface">Tracking Information</p>
                <p class="text-sm text-on-surface-variant">You'll receive tracking details once your order ships.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <NuxtLink 
          to="/shop"
          class="bg-primary text-on-primary px-8 py-4 rounded-lg font-semibold hover:bg-primary-container transition-colors active:scale-95"
        >
          Continue Shopping
        </NuxtLink>
        <NuxtLink 
          to="/account/orders"
          class="bg-surface-container text-on-surface px-8 py-4 rounded-lg font-semibold hover:bg-surface-container-high transition-colors active:scale-95"
        >
          View Order History
        </NuxtLink>
      </div>

      <!-- Help Section -->
      <div class="mt-16 bg-surface-container-lowest rounded-xl p-6">
        <h3 class="font-bold text-on-surface mb-4">Questions About Your Order?</h3>
        <p class="text-sm text-on-surface-variant mb-4">
          Our customer care team is here to help with any questions about your order.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="mailto:support@editorialmerchant.com" class="flex items-center gap-2 text-primary hover:underline">
            <span class="material-symbols-outlined text-sm">email</span>
            Email Support
          </a>
          <a href="tel:+221774135353" class="flex items-center gap-2 text-primary hover:underline">
            <span class="material-symbols-outlined text-sm">phone</span>
            Call Us
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Meta tags
useHead({
  title: 'Order Confirmed | The Editorial Merchant',
  meta: [
    { name: 'description', content: 'Your order has been successfully placed. View confirmation details.' }
  ]
})

// Generate random order number and date
const orderNumber = computed(() => `EM-${Date.now().toString().slice(-8)}`)
const orderDate = computed(() => new Date().toLocaleDateString('en-US', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
}))
const orderTotal = ref(198.72) // This would come from the order data
</script>
