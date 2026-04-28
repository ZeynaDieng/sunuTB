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
      <h1 class="text-4xl md:text-5xl font-headline font-extrabold tracking-tighter mb-4 first-letter:uppercase">Commande Confirmée !</h1>
      <p class="text-xl text-on-surface-variant mb-8 max-w-2xl mx-auto first-letter:uppercase">
        Merci pour votre commande. Nous avons reçu votre demande et allons préparer vos articles sélectionnés avec soin.
      </p>

      <!-- Order Details -->
      <div class="bg-surface-container-low rounded-2xl p-8 text-left max-w-2xl mx-auto mb-8">
        <div class="flex justify-between items-start mb-6">
          <div>
            <h2 class="font-bold text-on-surface mb-2 first-letter:uppercase">Commande #{{ orderNumber }}</h2>
            <p class="text-sm text-on-surface-variant first-letter:uppercase">Passée le {{ orderDate }}</p>
          </div>
          <div class="text-right">
            <p class="text-sm text-on-surface-variant mb-1 first-letter:uppercase">Montant Total</p>
            <p class="text-2xl font-bold text-primary">{{ orderTotal.toLocaleString('fr-FR') }} FCFA</p>
          </div>
        </div>

        <div class="border-t border-outline-variant/20 pt-6">
          <h3 class="font-bold text-on-surface mb-4 first-letter:uppercase">Prochaines Étapes ?</h3>
          <div class="space-y-4">
            <div class="flex gap-3">
              <span class="material-symbols-outlined text-primary">email</span>
              <div>
                <p class="font-medium text-on-surface first-letter:uppercase">Confirmation de Commande</p>
                <p class="text-sm text-on-surface-variant first-letter:uppercase">Nous avons envoyé une confirmation détaillée à votre adresse email.</p>
              </div>
            </div>
            <div class="flex gap-3">
              <span class="material-symbols-outlined text-primary">local_shipping</span>
              <div>
                <p class="font-medium text-on-surface first-letter:uppercase">Traitement et Livraison</p>
                <p class="text-sm text-on-surface-variant first-letter:uppercase">Votre commande sera traitée dans 1-2 jours ouvrables.</p>
              </div>
            </div>
            <div class="flex gap-3">
              <span class="material-symbols-outlined text-primary">notifications</span>
              <div>
                <p class="font-medium text-on-surface first-letter:uppercase">Informations de Suivi</p>
                <p class="text-sm text-on-surface-variant first-letter:uppercase">Vous recevrez les détails de suivi dès que votre commande sera expédiée.</p>
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
          Continuer vos Achats
        </NuxtLink>
       <!-- <NuxtLink 
          to="/account/orders"
          class="bg-surface-container text-on-surface px-8 py-4 rounded-lg font-semibold hover:bg-surface-container-high transition-colors active:scale-95"
        >
          Voir l'Historique des Commandes
        </NuxtLink> -->
      </div>

      <!-- Help Section -->
      <div class="mt-16 bg-surface-container-lowest rounded-xl p-6">
        <h3 class="font-bold text-on-surface mb-4 first-letter:uppercase">Questions sur votre Commande ?</h3>
        <p class="text-sm text-on-surface-variant mb-4 first-letter:uppercase">
          Notre service client est là pour vous aider avec toutes vos questions concernant votre commande.
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="mailto:contact@sunutawfekh.sn" class="flex items-center gap-2 text-primary hover:underline">
            <span class="material-symbols-outlined text-sm">email</span>
            Support Email
          </a>
          <a href="tel:+221774135353" class="flex items-center gap-2 text-primary hover:underline">
            <span class="material-symbols-outlined text-sm">phone</span>
            Nous Appeler
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '~/stores/cart'

const cartStore = useCart()
const route = useRoute()

// Meta tags
useHead({
  title: 'Commande Confirmée | Sunu Tawfekh',
  meta: [
    { name: 'description', content: 'Votre commande a été passée avec succès. Voir les détails de confirmation.' }
  ]
})

// Récupérer les données de commande depuis les paramètres URL ou le panier
const orderData = computed(() => {
  // Priorité 1: Paramètres URL (depuis la redirection du checkout)
  if (route.query.orderId && route.query.total) {
    return {
      id: route.query.orderId as string,
      total: parseFloat(route.query.total as string),
      date: new Date().toISOString()
    }
  }
  
  // Priorité 2: Données du panier (si panier contient des articles)
  if (cartStore.items.length > 0) {
    return {
      id: `ST-${Date.now().toString().slice(-8)}`,
      total: cartStore.totalPrice,
      date: new Date().toISOString()
    }
  }
  
  // Priorité 3: Données par défaut (seulement si panier vide et pas de params URL)
  return {
    id: `ST-${Date.now().toString().slice(-8)}`,
    total: 125000, // Prix par défaut en FCFA
    date: new Date().toISOString()
  }
})

// Informations de commande dynamiques
const orderNumber = computed(() => orderData.value.id)
const orderDate = computed(() => new Date(orderData.value.date).toLocaleDateString('fr-FR', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
}))
const orderTotal = computed(() => orderData.value.total)

// Vider le panier après confirmation (optionnel)
onMounted(() => {
  // Optionnel: vider le panier après confirmation de commande
  // cartStore.clearCart()
})
</script>
