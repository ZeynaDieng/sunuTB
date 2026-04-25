<template>
  <!-- OVERLAY -->
  <Transition
    enter-active-class="transition-opacity duration-300"
    enter-from-class="opacity-0"
    enter-to-class="opacity-100"
    leave-active-class="transition-opacity duration-200"
    leave-from-class="opacity-100"
    leave-to-class="opacity-0"
  >
    <div
      v-if="drawer.isOpen"
      class="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
      @click="drawer.close()"
    ></div>
  </Transition>

  <!-- DRAWER -->
  <Transition
    enter-active-class="transition-transform duration-300 ease-out"
    enter-from-class="translate-x-full"
    enter-to-class="translate-x-0"
    leave-active-class="transition-transform duration-200 ease-in"
    leave-from-class="translate-x-0"
    leave-to-class="translate-x-full"
  >
    <div
      v-if="drawer.isOpen"
      class="fixed right-0 top-0 h-full w-[340px] sm:w-[380px] bg-surface z-50 flex flex-col"
    >

      <!-- HEADER -->
      <div class="flex justify-between items-center px-5 py-4 border-b border-outline-variant/20 flex-shrink-0">
        <div>
          <h2 class="text-base font-semibold text-on-surface tracking-tight">Mon panier</h2>
          <p class="text-xs text-on-surface-variant mt-0.5">
            {{ cart.totalItems }} {{ cart.totalItems > 1 ? 'articles' : 'article' }}
          </p>
        </div>
        <button
          @click="drawer.close()"
          class="w-8 h-8 rounded-full border border-outline-variant/30 flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
        >
          <X :size="15" />
        </button>
      </div>

      <!-- ITEMS -->
      <div class="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-5">

        <!-- Panier vide -->
        <div v-if="cart.items.length === 0" class="flex-1 flex flex-col items-center justify-center gap-4 py-16 text-center">
          <div class="w-16 h-16 rounded-full bg-surface-container flex items-center justify-center">
            <ShoppingBag :size="24" class="text-on-surface-variant/40" />
          </div>
          <div>
            <p class="text-sm font-medium text-on-surface mb-1">Votre panier est vide</p>
            <p class="text-xs text-on-surface-variant">Ajoutez des produits pour commencer</p>
          </div>
          <button
            @click="drawer.close()"
            class="text-xs text-primary font-semibold underline underline-offset-4 hover:underline-offset-8 transition-all"
          >
            Parcourir la boutique
          </button>
        </div>

        <!-- Liste des articles -->
        <template v-else>
          <div
            v-for="(item, index) in cart.items"
            :key="item.product.id"
          >
            <div class="flex gap-3 items-start">

              <!-- Image / Fallback -->
              <div class="w-[60px] h-[60px] rounded-xl overflow-hidden bg-surface-container border border-outline-variant/15 flex-shrink-0 flex flex-col items-center justify-center gap-1">
                <img
                  v-if="hasValidImage(item.product.image) && !imageErrors[item.product.id]"
                  :src="item.product.image"
                  :alt="item.product.name"
                  class="w-full h-full object-cover"
                  loading="lazy"
                  @error="imageErrors[item.product.id] = true"
                />
                <template v-else>
                  <span class="text-[22px] font-semibold leading-none text-on-surface/20 select-none">
                    {{ item.product.name?.charAt(0)?.toUpperCase() || '?' }}
                  </span>
                  <div class="w-4 h-px bg-outline-variant/40"></div>
                  <span class="text-[8px] font-medium uppercase tracking-[0.12em] text-on-surface/25 text-center px-1 leading-tight select-none line-clamp-1">
                    {{ item.product.name }}
                  </span>
                </template>
              </div>

              <!-- Infos -->
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-on-surface leading-snug line-clamp-2 mb-1">
                  {{ item.product.name }}
                </p>
                <p class="text-xs text-on-surface-variant mb-2">
                  {{ Math.round(item.product.price).toLocaleString('fr-FR') }} FCFA
                </p>

                <!-- Stepper quantité -->
                <div class="inline-flex items-center border border-outline-variant/30 rounded-lg overflow-hidden">
                  <button
                    @click="cart.updateQuantity(item.product.id, item.quantity - 1)"
                    class="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
                  >
                    <Minus :size="12" />
                  </button>
                  <span class="w-8 h-7 flex items-center justify-center text-xs font-semibold text-on-surface border-x border-outline-variant/30">
                    {{ item.quantity }}
                  </span>
                  <button
                    @click="cart.updateQuantity(item.product.id, item.quantity + 1)"
                    class="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
                  >
                    <Plus :size="12" />
                  </button>
                </div>
              </div>

              <!-- Prix total ligne + supprimer -->
              <div class="flex flex-col items-end gap-2 flex-shrink-0">
                <span class="text-sm font-semibold text-on-surface">
                  {{ Math.round(item.product.price * item.quantity).toLocaleString('fr-FR') }}
                </span>
                <button
                  @click="cart.removeItem(item.product.id)"
                  class="w-6 h-6 rounded-md flex items-center justify-center text-on-surface-variant/50 hover:text-error hover:bg-error/5 transition-all"
                >
                  <Trash2 :size="12" />
                </button>
              </div>
            </div>

            <!-- Séparateur inter-articles -->
            <div v-if="index < cart.items.length - 1" class="mt-5 h-px bg-outline-variant/15"></div>
          </div>
        </template>
      </div>

      <!-- FOOTER — visible seulement si panier non vide -->
      <div v-if="cart.items.length > 0" class="border-t border-outline-variant/20 px-5 py-5 flex flex-col gap-4 flex-shrink-0">

        <!-- Récap -->
        <div class="flex flex-col gap-2.5">
          <div class="flex justify-between items-center">
            <span class="text-xs text-on-surface-variant">Sous-total</span>
            <span class="text-xs text-on-surface">{{ Math.round(cart.totalPrice).toLocaleString('fr-FR') }} FCFA</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-xs text-on-surface-variant">Livraison</span>
            <span class="text-xs font-medium text-primary">Gratuite</span>
          </div>
          <div class="h-px bg-outline-variant/15 my-0.5"></div>
          <div class="flex justify-between items-center">
            <span class="text-sm font-semibold text-on-surface">Total</span>
            <span class="text-sm font-semibold text-on-surface">{{ Math.round(cart.totalPrice).toLocaleString('fr-FR') }} FCFA</span>
          </div>
        </div>

        <!-- CTA Commander -->
        <NuxtLink
          to="/checkout"
          @click="drawer.close()"
          class="flex items-center justify-between bg-on-surface text-surface px-5 py-3.5 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity active:scale-[0.98]"
        >
          <span>Passer la commande</span>
          <span class="text-surface/60 text-base">→</span>
        </NuxtLink>

        <!-- Continuer les achats -->
        <button
          @click="drawer.close()"
          class="text-xs text-on-surface-variant text-center hover:text-on-surface transition-colors"
        >
          Continuer mes achats
        </button>
      </div>

    </div>
  </Transition>
</template>

<script setup lang="ts">
import { X, Minus, Plus, Trash2, ShoppingBag } from 'lucide-vue-next'
import { useCart } from '~/stores/cart'
import { useCartDrawer } from '~/stores/cartDrawer'

const cart = useCart()
const drawer = useCartDrawer()

// Fallback image — même logique que ProductCard
const imageErrors = ref<Record<string, boolean>>({})
const INVALID_PATTERNS = ['placeholder', 'no-image', 'noimage', 'default', 'blank', '.svg']
const hasValidImage = (url?: string) => {
  if (!url || url.trim() === '') return false
  return !INVALID_PATTERNS.some(p => url.toLowerCase().includes(p))
}
</script>