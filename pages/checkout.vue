<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
    <!-- Indicateur de progression -->
    <nav class="flex items-center justify-between sm:justify-start sm:gap-4 text-sm font-medium mb-6 sm:mb-8 overflow-x-auto">
      <div class="flex items-center gap-2 text-primary">
        <span class="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs">1</span>
        <span class="first-letter:uppercase">Informations</span>
      </div>
      <span class="text-outline-variant">/</span>
      <div class="flex items-center gap-2 text-primary">
        <span class="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center text-xs">2</span>
        <span class="first-letter:uppercase">Livraison</span>
      </div>
      <span class="text-outline-variant">/</span>
      <div class="flex items-center gap-2 text-on-surface-variant opacity-60">
        <span class="w-6 h-6 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center text-xs">3</span>
        <span class="first-letter:uppercase">Paiement</span>
      </div>
    </nav>

    <div class="grid grid-cols-1 xl:grid-cols-12 gap-8 lg:gap-12 xl:gap-16">
      <!-- Colonne gauche : Formulaires de commande -->
      <div class="xl:col-span-7 space-y-8 sm:space-y-12">
        <!-- Section : Informations de contact -->
        <section class="space-y-6">
          <div class="flex justify-between items-end">
            <h2 class="text-2xl font-bold tracking-tight text-on-surface first-letter:uppercase">Informations de contact</h2>
             <!--<p class="text-sm text-on-surface-variant first-letter:uppercase">Déjà un compte ? <NuxtLink to="/login" class="text-primary underline first-letter:uppercase">Se connecter</NuxtLink></p>-->
          </div>
          <div class="space-y-4">
            <div class="group">
              <label class="block text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-2 ml-1">Adresse e-mail</label>
              <input 
                v-model="contactInfo.email"
                class="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary transition-all outline-none" 
                placeholder="email@exemple.com" 
                type="email"
                required
              />
            </div>
            <div class="group">
              <label class="block text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-2 ml-1">Numéro de téléphone</label>
              <input 
                v-model="contactInfo.phone"
                @input="onPhoneInput"
                class="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary transition-all outline-none" 
                placeholder="77 123 45 67" 
                type="tel"
                required
              />
              <!-- Indicateur de synchronisation -->
              <div v-if="favorites.isSyncing" class="mt-2 text-xs text-primary flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px] animate-spin">sync</span>
                Synchronisation de vos favoris...
              </div>
              <div v-else-if="favorites.syncError" class="mt-2 text-xs text-error flex items-center gap-1">
                <span class="material-symbols-outlined text-[14px]">error</span>
                {{ favorites.syncError }}
              </div>
            </div>
            <div class="flex items-center gap-3 px-1">
              <input 
                v-model="contactInfo.newsletter"
                class="rounded border-outline text-primary focus:ring-primary" 
                id="newsletter" 
                type="checkbox"
              />
              <label class="text-sm text-on-surface-variant" for="newsletter">M'envoyer les actualités et offres sélectionnées par e-mail</label>
            </div>
          </div>
        </section>

        <!-- Section : Adresse de livraison -->
        <section class="space-y-6">
          <h2 class="text-2xl font-bold tracking-tight text-on-surface">Adresse de livraison</h2>
          <div class="grid grid-cols-2 gap-4">
            <div class="group">
              <label class="block text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-2 ml-1">Prénom</label>
              <input 
                v-model="shippingInfo.firstName"
                class="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary transition-all outline-none" 
                type="text"
                required
              />
            </div>
            <div class="group">
              <label class="block text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-2 ml-1">Nom</label>
              <input 
                v-model="shippingInfo.lastName"
                class="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary transition-all outline-none" 
                type="text"
                required
              />
            </div>
            <div class="col-span-2 group">
              <label class="block text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-2 ml-1">Adresse</label>
              <input 
                v-model="shippingInfo.address"
                class="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary transition-all outline-none" 
                placeholder="123 Rue de la Sélection" 
                type="text"
                required
              />
            </div>
            <div class="group">
              <label class="block text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-2 ml-1">Ville</label>
              <input 
                v-model="shippingInfo.city"
                class="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary transition-all outline-none" 
                type="text"
                required
              />
            </div>
            <div class="group">
              <label class="block text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-2 ml-1">Code postal</label>
              <input 
                v-model="shippingInfo.postalCode"
                class="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary transition-all outline-none" 
                type="text"
                required
              />
            </div>
          </div>
        </section>

        <!-- Section : Mode de paiement -->
        <section class="space-y-6">
          <div class="flex flex-col gap-1">
            <h2 class="text-2xl font-bold tracking-tight text-on-surface">Mode de paiement</h2>
            <p class="text-sm text-on-surface-variant">Toutes les transactions sont sécurisées et chiffrées.</p>
          </div>
          <div class="space-y-4">
            <!-- Option Carte bancaire -->
            <div class="bg-surface-container-lowest ring-2 ring-primary p-6 rounded-xl space-y-6 shadow-sm">
              <div class="flex justify-between items-center">
                <div class="flex items-center gap-3">
                  <div class="w-5 h-5 rounded-full border-4 border-primary bg-on-primary"></div>
                  <span class="font-semibold text-on-surface">Carte bancaire</span>
                </div>
                <div class="flex gap-2">
                  <span class="material-symbols-outlined text-on-surface-variant/40" data-icon="credit_card">credit_card</span>
                </div>
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div class="col-span-2 group">
                  <label class="block text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-2 ml-1">Numéro de carte</label>
                  <div class="relative">
                    <input 
                      v-model="paymentInfo.cardNumber"
                      class="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary transition-all outline-none" 
                      placeholder="0000 0000 0000 0000" 
                      type="text"
                      required
                    />
                    <span class="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40" data-icon="lock">lock</span>
                  </div>
                </div>
                <div class="group">
                  <label class="block text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-2 ml-1">Date d'expiration</label>
                  <input 
                    v-model="paymentInfo.expiry"
                    class="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary transition-all outline-none" 
                    placeholder="MM / AA" 
                    type="text"
                    required
                  />
                </div>
                <div class="group">
                  <label class="block text-xs font-bold tracking-widest uppercase text-on-surface-variant mb-2 ml-1">Code de sécurité</label>
                  <input 
                    v-model="paymentInfo.cvv"
                    class="w-full bg-surface-container-low border-none rounded-lg px-4 py-4 ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary transition-all outline-none" 
                    placeholder="CVV" 
                    type="text"
                    required
                  />
                </div>
              </div>
            </div>
            <!-- Option PayPal -->
            <div class="bg-surface-container-low p-6 rounded-xl flex justify-between items-center cursor-pointer hover:bg-surface-container transition-colors">
              <div class="flex items-center gap-3">
                <div class="w-5 h-5 rounded-full border-2 border-outline-variant"></div>
                <span class="font-semibold text-on-surface">PayPal</span>
              </div>
              <span class="material-symbols-outlined text-on-surface-variant/60" data-icon="account_balance_wallet">account_balance_wallet</span>
            </div>
          </div>
        </section>

        <!-- Badges de confiance -->
        <div class="flex flex-wrap gap-8 items-center pt-8 justify-center lg:justify-start">
          <div class="flex items-center gap-2 text-on-surface-variant/60 grayscale opacity-70">
            <span class="material-symbols-outlined text-2xl" data-icon="verified_user">verified_user</span>
            <span class="text-[10px] font-bold uppercase tracking-widest leading-none">Transaction<br/>sécurisée</span>
          </div>
          <div class="flex items-center gap-2 text-on-surface-variant/60 grayscale opacity-70">
            <span class="material-symbols-outlined text-2xl" data-icon="eco">eco</span>
            <span class="text-[10px] font-bold uppercase tracking-widest leading-none">Neutre en<br/>carbone</span>
          </div>
          <div class="flex items-center gap-2 text-on-surface-variant/60 grayscale opacity-70">
            <span class="material-symbols-outlined text-2xl" data-icon="inventory_2">inventory_2</span>
            <span class="text-[10px] font-bold uppercase tracking-widest leading-none">Emballage<br/>responsable</span>
          </div>
        </div>
      </div>
      

      <!-- Colonne droite : Récapitulatif de commande -->
      <aside class="lg:col-span-5">
        <div class="bg-surface-container sticky top-28 rounded-2xl p-8 space-y-8">
          <h3 class="text-xl font-bold tracking-tight text-on-surface">Récapitulatif de commande</h3>
          <!-- Liste des produits -->
          <div class="space-y-6">
            <div v-for="item in cartStore.items" :key="item.product.id" class="flex gap-4 relative group">
              <!-- Bouton de suppression -->
              <button
                @click="removeItem(item.product.id)"
                class="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 z-10"
                title="Retirer cet article"
              >
                <span class="material-symbols-outlined text-[14px]">close</span>
              </button>
              
              <div class="w-20 h-24 rounded-lg bg-surface-container-highest overflow-hidden relative shrink-0">
                <!-- Image avec fallback élégant -->
                <img 
                  v-if="hasValidImage(item.product.image) && !imageErrors[item.product.id]" 
                  :src="item.product.image" 
                  :alt="item.product.name" 
                  class="w-full h-full object-cover"
                  @error="imageErrors[item.product.id] = true"
                />
                <div 
                  v-else
                  class="w-full h-full flex flex-col items-center justify-center gap-2 bg-surface-container"
                >
                  <!-- Grande initiale grise -->
                  <span class="text-3xl font-semibold leading-none tracking-tighter text-on-surface/20 select-none">
                    {{ item.product.name?.charAt(0)?.toUpperCase() || '?' }}
                  </span>
                  
                  <!-- Séparateur fin -->
                  <div class="w-6 h-px bg-outline-variant/40"></div>
                  
                  <!-- Nom en petit -->
                  <span class="text-[10px] font-medium uppercase tracking-[0.15em] text-on-surface/30 text-center px-4 leading-snug select-none">
                    {{ item.product.name }}
                  </span>
                </div>
              </div>
             <div class="flex flex-col gap-1 py-1 flex-1">
  <div>
    <h4 class="font-semibold text-on-surface leading-tight">
      {{ item.product.name }}
    </h4>
    <p class="text-xs text-on-surface-variant">
      {{ item.product.variant || 'Par défaut' }}
    </p>
  </div>

  <div class="flex justify-between items-center">
    <span class="text-sm text-on-surface-variant">Quantité: {{ item.quantity }}</span>
    <span class="text-sm font-medium">
      {{ (item.product.price * item.quantity) }} FCFA
    </span>
  </div>
</div>
            </div>
          </div>
          <!-- Totaux -->
          <div class="space-y-4 pt-6 border-t border-outline-variant/20">
            <div class="flex justify-between items-center">
              <span class="text-on-surface-variant">Sous-total</span>
              <span class="font-medium">{{ cartStore.totalPrice }} FCFA</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-on-surface-variant">Livraison</span>
              <span class="text-sm italic">Calculée à l'étape suivante</span>
            </div>
            <!-- Taxes supprimées -->
            <div class="flex justify-between items-center pt-4 border-t border-outline-variant/40">
              <span class="text-lg font-bold">Total</span>
              <div class="text-right">
                <span class="text-2xl font-black text-primary">{{ cartStore.totalPrice }} FCFA</span>
                
              </div>
            </div>
          </div>
          <!-- Action de commande -->
          <div class="pt-4">
            <button 
              @click="placeOrder"
              class="w-full bg-secondary-container hover:bg-secondary-fixed-dim text-on-secondary-container font-extrabold py-5 rounded-xl transition-all transform active:scale-[0.98] shadow-md flex items-center justify-center gap-3"
            >
              PASSER LA COMMANDE
              <span class="material-symbols-outlined" data-icon="arrow_forward">arrow_forward</span>
            </button>
            <p class="text-[11px] text-center text-on-surface-variant mt-4 leading-relaxed">
              En cliquant sur « Passer la commande », vous acceptez nos <NuxtLink to="/terms" class="underline">Conditions d'utilisation</NuxtLink> et notre <NuxtLink to="/privacy" class="underline">Politique de confidentialité</NuxtLink>.
            </p>
          </div>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '~/stores/cart'
import { useAuthStore } from '~/stores/auth'
import { useFavoritesStore } from '~/stores/favorites'

// Balises meta
useHead({
  title: 'Commande | The Editorial Merchant',
  meta: [
    { name: 'description', content: 'Finalisez votre achat en toute sécurité grâce à notre processus de commande simplifié.' }
  ]
})

const cartStore = useCart()
const auth = useAuthStore()
const favorites = useFavoritesStore()
const router = useRouter()

// Initialize auth store
onMounted(() => {
  auth.initializeAuth()
})

// Generate secure random password
const generateSecurePassword = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
  let password = ''
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

// Image error handling
const imageErrors = ref<Record<string, boolean>>({})

// URLs à ignorer — on affiche le fallback à leur place
const INVALID_PATTERNS = ['placeholder', 'no-image', 'noimage', 'default', 'blank', '.svg']

const hasValidImage = (imageUrl: string | undefined) => {
  if (!imageUrl || typeof imageUrl !== 'string' || imageUrl.trim() === '') return false
  const lower = imageUrl.toLowerCase()
  return !INVALID_PATTERNS.some(p => lower.includes(p))
}

// Données du formulaire
const contactInfo = ref({
  email: '',
  phone: '',
  newsletter: false
})

const shippingInfo = ref({
  firstName: '',
  lastName: '',
  address: '',
  city: '',
  postalCode: ''
})

const paymentInfo = ref({
  cardNumber: '',
  expiry: '',
  cvv: ''
})

// Calcul des totaux (sans taxes)
// const tax = computed(() => cartStore.totalPrice * 0.08) // Taxes supprimées
const total = computed(() => cartStore.totalPrice) // Total sans taxes

// Fonction pour retirer un article du panier
const removeItem = (productId: string) => {
  cartStore.removeItem(productId)
}

// Fonction pour gérer la saisie du téléphone et synchroniser les favoris
const onPhoneInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const phone = target.value
  
  // Lancer la récupération des favoris si le numéro est valide (9 chiffres)
  if (phone.replace(/\D/g, '').length === 9) {
    favorites.fetchFavoritesByPhone(phone)
  }
}

const placeOrder = async () => {
  try {
    // Check if user is already logged in
    if (!auth.isAuthenticated) {
      const email = contactInfo.value.email
      
      // Check if user exists with this email by checking localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]')
      const existingUser = users.find((user: any) => user.email === email)
      
      if (existingUser) {
        // User exists - try to login with auto-generated password
        // In a real app, you'd send a magic link or OTP
        // For demo, we'll login automatically
        await auth.login(email, 'TempPass123!')
        auth.showNotification('Connexion automatique réussie !', 'success')
      } else {
        // New user - create account automatically
        const autoPassword = generateSecurePassword()
        const userData = {
          firstName: shippingInfo.value.firstName,
          lastName: shippingInfo.value.lastName,
          email: email,
          password: autoPassword,
          phone: '', // Could add phone field to checkout
          address: `${shippingInfo.value.address}, ${shippingInfo.value.city} ${shippingInfo.value.postalCode}`
        }
        
        await auth.register(userData)
        auth.showNotification('Compte créé automatiquement !', 'success')
        
        // In a real app, send password via email
        console.log('Auto-generated password for user:', autoPassword)
      }
    }
    
    // Process the order
    console.log('Passage de commande :', {
      contact: contactInfo.value,
      shipping: shippingInfo.value,
      payment: paymentInfo.value,
      total: total.value,
      user: auth.user
    })
    
    // Generate order data and redirect to success page
    const orderId = `ST-${Date.now().toString().slice(-8)}`
    const orderTotal = total.value
    
    // Store order data temporarily before clearing cart
    navigateTo({
      path: '/order-success',
      query: {
        orderId: orderId,
        total: orderTotal.toString(),
        email: contactInfo.value.email
      }
    })
    
    // Clear cart after redirect
    cartStore.clearCart()
    
  } catch (error) {
    console.error('Error during checkout:', error)
    auth.showNotification('Erreur lors du traitement de la commande', 'error')
  }
}
</script>