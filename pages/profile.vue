<template>
  <div class="pt-24 pb-16 px-6 md:px-12 max-w-7xl mx-auto min-h-screen">
    <!-- Données structurées Schema.org -->
    <JsonLd 
      type="breadcrumb" 
      :breadcrumbs="[
        { name: 'Mon Profil', url: '/profile' }
      ]" 
    />

<!-- Header with Cover -->
<div class="relative mb-8">

  <!-- COVER -->
  <div class="h-36 sm:h-44 bg-gradient-to-r from-primary to-primary-container rounded-2xl flex items-end px-4 sm:px-6 pb-4">

    <!-- CONTENT DANS LE BG -->
    <div class="flex items-center gap-4">

      <!-- AVATAR -->
      <div class="flex-shrink-0">
        <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/90 backdrop-blur border-4 border-white flex items-center justify-center text-xl sm:text-2xl font-bold text-primary shadow-md">
          {{ auth.initials }}
        </div>
      </div>

      <!-- USER INFO -->
      <div class="flex flex-col">
        <h1 class="text-white text-lg sm:text-2xl font-semibold leading-tight first-letter:uppercase">
          {{ auth.fullName }}
        </h1>
        <p class="text-white/80 text-sm first-letter:uppercase">
          {{ auth.user?.email }}
        </p>
      </div>

    </div>

  </div>
</div>
    <!-- Tab Navigation -->
    <div class="mb-8 mt-16 sm:mt-20 border-b border-outline">
      <nav class="flex overflow-x-auto gap-6 no-scrollbar">
        <button
          @click="activeTab = 'profile'"
          :class="activeTab === 'profile' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'"
          class="pb-4 border-b-2 font-medium transition-colors px-2 first-letter:uppercase"
        >
          <span class="flex items-center gap-2 whitespace-nowrap">
            <span class="material-symbols-outlined">person</span>
            Profil
          </span>
        </button>
        <button
          @click="activeTab = 'orders'"
          :class="activeTab === 'orders' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'"
          class="pb-4 border-b-2 font-medium transition-colors px-2 first-letter:uppercase"
        >
          <span class="flex items-center gap-2 whitespace-nowrap">
            <span class="material-symbols-outlined">shopping_bag</span>
            Commandes
          </span>
        </button>
        <button
          @click="activeTab = 'favorites'"
          :class="activeTab === 'favorites' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'"
          class="pb-4 border-b-2 font-medium transition-colors px-2 first-letter:uppercase"
        >
          <span class="flex items-center gap-2 whitespace-nowrap">
            <span class="material-symbols-outlined">favorite</span>
            Favoris
          </span>
        </button>
        <button
          @click="activeTab = 'settings'"
          :class="activeTab === 'settings' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'"
          class="pb-4 border-b-2 font-medium transition-colors px-2 first-letter:uppercase"
        >
          <span class="flex items-center gap-2 whitespace-nowrap">
            <span class="material-symbols-outlined">settings</span>
            Paramètres
          </span>
        </button>
        <button
          @click="activeTab = 'security'"
          :class="activeTab === 'security' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'"
          class="pb-4 border-b-2 font-medium transition-colors px-2 first-letter:uppercase"
        >
          <span class="flex items-center gap-2 whitespace-nowrap">
            <span class="material-symbols-outlined">security</span>
            Sécurité
          </span>
        </button>
      </nav>
    </div>

    <!-- Tab Content -->
<div class="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">      <!-- Sidebar Stats -->
      <aside class="lg:col-span-1 order-2 lg:order-1">
        <div class="bg-surface-container-low rounded-xl p-4 sm:p-6 sticky top-20 lg:top-24">
          <h3 class="font-bold text-lg mb-4 first-letter:uppercase">Statistiques</h3>
          
          <div class="space-y-4">
            <div class="flex justify-between items-center p-4 bg-surface rounded-lg hover:bg-surface-container-high transition-colors">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span class="material-symbols-outlined text-primary">favorite</span>
                </div>
                <div>
                  <p class="font-semibold">{{ favorites.favoriteCount }}</p>
                  <p class="text-xs text-on-surface-variant">Favoris</p>
                </div>
              </div>
            </div>

            <div class="flex justify-between items-center p-4 bg-surface rounded-lg hover:bg-surface-container-high transition-colors">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span class="material-symbols-outlined text-primary">shopping_bag</span>
                </div>
                <div>
                  <p class="font-semibold">{{ cartItemCount }}</p>
                  <p class="text-xs text-on-surface-variant">Articles panier</p>
                </div>
              </div>
            </div>

            <div class="flex justify-between items-center p-4 bg-surface rounded-lg hover:bg-surface-container-high transition-colors">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span class="material-symbols-outlined text-primary">receipt_long</span>
                </div>
                <div>
                  <p class="font-semibold">{{ mockOrders.length }}</p>
                  <p class="text-xs text-on-surface-variant">Commandes</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="mt-6 space-y-2">
            <NuxtLink
              to="/favorites"
              class="block w-full text-center bg-primary text-on-primary px-4 py-3 rounded-lg font-semibold hover:bg-primary-container transition-colors"
            >
              Voir mes favoris
            </NuxtLink>
            <button
              class="w-full bg-surface text-on-surface px-4 py-3 rounded-lg font-semibold hover:bg-surface-container-high transition-colors"
            >
              Télécharger mes données
            </button>
          </div>
        </div>
      </aside>

      <!-- Main Content Area -->
      <main class="lg:col-span-2 order-1 lg:order-2">
        <!-- Profile Tab -->
        <div v-if="activeTab === 'profile'" class="space-y-4 sm:space-y-6">
          <!-- Personal Information -->
          <div class="bg-surface-container-low rounded-xl p-4 sm:p-6 lg:p-8">
            <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-6 gap-2">
              <h3 class="text-xl sm:text-2xl font-bold">Informations personnelles</h3>
              <span class="material-symbols-outlined text-primary">edit</span>
            </div>
            
            <form @submit.prevent="handleUpdateProfile" class="space-y-4 sm:space-y-6">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label class="block text-sm font-medium text-on-surface mb-2">
                    Prénom
                  </label>
                  <input
                    v-model="profileForm.firstName"
                    type="text"
                    required
                    class="w-full px-4 py-3 rounded-lg border border-outline-variant focus:border-primary focus:outline-none transition-colors"
                    placeholder="Jean"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-on-surface mb-2">
                    Nom
                  </label>
                  <input
                    v-model="profileForm.lastName"
                    type="text"
                    required
                    class="w-full px-4 py-3 rounded-lg border border-outline-variant focus:border-primary focus:outline-none transition-colors"
                    placeholder="Diop"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-on-surface mb-2">
                  Email
                </label>
                <input
                  v-model="profileForm.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 rounded-lg border border-outline-variant bg-surface-container focus:border-primary focus:outline-none transition-colors"
                  placeholder="votre@email.com"
                  readonly
                />
                <p class="text-xs text-on-surface-variant mt-1">L'email ne peut pas être modifié</p>
              </div>

              <div>
                <label class="block text-sm font-medium text-on-surface mb-2">
                  Téléphone
                </label>
                <input
                  v-model="profileForm.phone"
                  type="tel"
                  class="w-full px-4 py-3 rounded-lg border border-outline-variant focus:border-primary focus:outline-none transition-colors"
                  placeholder="+221 77 413 53 53"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-on-surface mb-2">
                  Adresse
                </label>
                <input
                  v-model="profileForm.address"
                  type="text"
                  class="w-full px-4 py-3 rounded-lg border border-outline-variant focus:border-primary focus:outline-none transition-colors"
                  placeholder="Rue de la Médina, Dakar"
                />
              </div>

              <button
                type="submit"
                :disabled="auth.isLoading"
                class="w-full bg-primary text-on-primary py-3 rounded-lg font-semibold hover:bg-primary-container transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span v-if="auth.isLoading" class="flex items-center justify-center">
                  <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Mise à jour...
                </span>
                <span v-else>Mettre à jour mon profil</span>
              </button>
            </form>
          </div>

          <!-- Account Info -->
          <div class="bg-surface-container-low rounded-xl p-8">
            <h3 class="text-2xl font-bold mb-6">Informations du compte</h3>
            
            <div class="space-y-4">
              <div class="flex items-center justify-between p-4 bg-surface rounded-lg">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-on-surface-variant">calendar_today</span>
                  <div>
                    <h4 class="font-semibold">Date de création</h4>
                    <p class="text-sm text-on-surface-variant">
                      {{ formatDate(auth.user?.createdAt) }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-between p-4 bg-surface rounded-lg">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-on-surface-variant">login</span>
                  <div>
                    <h4 class="font-semibold">Dernière connexion</h4>
                    <p class="text-sm text-on-surface-variant">
                      {{ formatDate(auth.user?.lastLogin) }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="flex items-center justify-between p-4 bg-surface rounded-lg">
                <div class="flex items-center gap-3">
                  <span class="material-symbols-outlined text-on-surface-variant">security</span>
                  <div>
                    <h4 class="font-semibold">Sécurité</h4>
                    <p class="text-sm text-on-surface-variant">
                      Compte sécurisé avec mot de passe
                    </p>
                  </div>
                </div>
                <button class="text-primary hover:text-primary-container font-medium">
                  Modifier
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Orders Tab -->
        <div v-if="activeTab === 'orders'" class="space-y-6">
          <div class="bg-surface-container-low rounded-xl p-8">
            <h3 class="text-2xl font-bold mb-6">Historique des commandes</h3>
            
            <div v-if="mockOrders.length === 0" class="text-center py-12">
              <span class="material-symbols-outlined text-6xl text-on-surface-variant">receipt_long</span>
              <p class="mt-4 text-on-surface-variant">Vous n'avez pas encore de commandes</p>
              <NuxtLink
                to="/shop"
                class="inline-block mt-4 bg-primary text-on-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary-container transition-colors"
              >
                Commencer mes achats
              </NuxtLink>
            </div>

            <div v-else class="space-y-4">
              <div
                v-for="order in mockOrders"
                :key="order.id"
                class="border border-outline rounded-lg p-6 hover:border-primary transition-colors"
              >
                <div class="flex items-center justify-between">
                  <div>
                    <h4 class="font-semibold">Commande #{{ order.id }}</h4>
                    <p class="text-sm text-on-surface-variant">{{ formatDate(order.date) }}</p>
                  </div>
                  <div class="text-right">
                    <p class="font-bold text-lg">{{ formatPrice(order.total) }} FCFA</p>
                    <span
                      :class="order.status === 'livrée' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
                      class="inline-block px-2 py-1 rounded-full text-xs font-semibold"
                    >
                      {{ order.status }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Favorites Tab -->
        <div v-if="activeTab === 'favorites'" class="space-y-6">
          <div class="bg-surface-container-low rounded-xl p-8">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-2xl font-bold">Mes favoris</h3>
              <span class="text-sm text-on-surface-variant">{{ favorites.favoriteCount }} articles</span>
            </div>
            
            <div v-if="favorites.items.length === 0" class="text-center py-12">
              <span class="material-symbols-outlined text-6xl text-on-surface-variant">favorite_border</span>
              <p class="mt-4 text-on-surface-variant">Vous n'avez pas encore de favoris</p>
              <NuxtLink
                to="/shop"
                class="inline-block mt-4 bg-primary text-on-primary px-6 py-3 rounded-lg font-semibold hover:bg-primary-container transition-colors"
              >
                Découvrir des produits
              </NuxtLink>
            </div>

            <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div
                v-for="favorite in favorites.items"
                :key="favorite.productId"
                class="border border-outline rounded-lg p-4 hover:border-primary transition-colors"
              >
                <div class="flex gap-4">
                  <div class="w-20 h-20 rounded-lg bg-surface-container flex items-center justify-center">
                    <span class="text-2xl font-bold text-on-surface/20">
                      {{ getProductInitial(favorite.product.name) }}
                    </span>
                  </div>
                  <div class="flex-1">
                    <h4 class="font-semibold">{{ favorite.product.name }}</h4>
                    <p class="text-primary font-bold">{{ formatPrice(favorite.product.price) }} FCFA</p>
                    <p class="text-xs text-on-surface-variant">Ajouté le {{ formatDate(favorite.addedAt) }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Settings Tab -->
        <div v-if="activeTab === 'settings'" class="space-y-6">
          <div class="bg-surface-container-low rounded-xl p-8">
            <h3 class="text-2xl font-bold mb-6">Paramètres</h3>
            
            <div class="space-y-6">
              <!-- Notifications -->
              <div class="border-b border-outline pb-6">
                <h4 class="font-semibold mb-4">Notifications</h4>
                <div class="space-y-3">
                  <label class="flex items-center justify-between cursor-pointer">
                    <span>Emails promotionnels</span>
                    <input 
                      type="checkbox" 
                      :checked="settings.promotionalEmails"
                      @change="updateSetting('promotionalEmails', $event)"
                      class="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary/20" 
                    />
                  </label>
                  <label class="flex items-center justify-between cursor-pointer">
                    <span>Notifications de commande</span>
                    <input 
                      type="checkbox" 
                      :checked="settings.orderNotifications"
                      @change="updateSetting('orderNotifications', $event)"
                      class="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary/20" 
                    />
                  </label>
                  <label class="flex items-center justify-between cursor-pointer">
                    <span>Nouveaux produits</span>
                    <input 
                      type="checkbox" 
                      :checked="settings.newProducts"
                      @change="updateSetting('newProducts', $event)"
                      class="w-5 h-5 text-primary rounded focus:ring-2 focus:ring-primary/20" 
                    />
                  </label>
                </div>
              </div>

              <!-- Privacy -->
              <div class="border-b border-outline pb-6">
                <h4 class="font-semibold mb-4">Confidentialité</h4>
                <div class="space-y-3">
                  <button 
                    @click="handleEditPersonalData"
                    class="w-full text-left p-3 bg-surface rounded-lg hover:bg-surface-container-high transition-colors"
                  >
                    <div class="flex items-center justify-between">
                      <span>Modifier mes données personnelles</span>
                      <span class="material-symbols-outlined">chevron_right</span>
                    </div>
                  </button>
                  <button 
                    @click="handleDownloadData"
                    class="w-full text-left p-3 bg-surface rounded-lg hover:bg-surface-container-high transition-colors"
                  >
                    <div class="flex items-center justify-between">
                      <span>Télécharger mes données</span>
                      <span class="material-symbols-outlined">download</span>
                    </div>
                  </button>
                </div>
              </div>

              <!-- Danger Zone -->
              <div>
                <h4 class="font-semibold mb-4 text-error">Zone de danger</h4>
                <button
                  @click="handleDeleteAccount"
                  class="w-full text-error hover:bg-error/10 px-4 py-3 rounded-lg font-semibold transition-colors"
                >
                  Supprimer mon compte
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Security Tab -->
        <div v-if="activeTab === 'security'" class="space-y-6">
          <div class="bg-surface-container-low rounded-xl p-8">
            <h3 class="text-2xl font-bold mb-6">Sécurité</h3>
            
            <div class="space-y-8">
              <!-- Change Password -->
              <div class="border-b border-outline pb-8">
                <h4 class="font-semibold mb-6">Changer le mot de passe</h4>
                <form @submit.prevent="handlePasswordChange" class="space-y-4 max-w-md">
                  <div>
                    <label class="block text-sm font-medium text-on-surface mb-2">Mot de passe actuel</label>
                    <input 
                      v-model="passwordForm.currentPassword"
                      type="password"
                      required
                      class="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary transition-all outline-none"
                      placeholder="Entrez votre mot de passe actuel"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-on-surface mb-2">Nouveau mot de passe</label>
                    <input 
                      v-model="passwordForm.newPassword"
                      type="password"
                      required
                      minlength="8"
                      class="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary transition-all outline-none"
                      placeholder="Entrez votre nouveau mot de passe"
                    />
                    <p class="text-xs text-on-surface-variant mt-1">Minimum 8 caractères</p>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-on-surface mb-2">Confirmer le nouveau mot de passe</label>
                    <input 
                      v-model="passwordForm.confirmPassword"
                      type="password"
                      required
                      minlength="8"
                      class="w-full bg-surface-container-low border-none rounded-lg px-4 py-3 ring-1 ring-outline-variant/20 focus:ring-2 focus:ring-primary transition-all outline-none"
                      placeholder="Confirmez votre nouveau mot de passe"
                    />
                  </div>
                  <div class="pt-2">
                    <button 
                      type="submit"
                      :disabled="isChangingPassword || !isPasswordFormValid"
                      class="bg-primary hover:bg-primary-fixed-dim text-on-primary font-medium px-6 py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span v-if="isChangingPassword" class="flex items-center gap-2">
                        <span class="material-symbols-outlined animate-spin">refresh</span>
                        Modification...
                      </span>
                      <span v-else>Mettre à jour le mot de passe</span>
                    </button>
                  </div>
                </form>
              </div>

              <!-- Security Info -->
              <div>
                <h4 class="font-semibold mb-4">Informations de sécurité</h4>
                <div class="space-y-3 text-sm text-on-surface-variant">
                  <div class="flex items-center gap-3">
                    <span class="material-symbols-outlined text-primary">check_circle</span>
                    <span>Connexion sécurisée avec chiffrement SSL</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="material-symbols-outlined text-primary">check_circle</span>
                    <span>Votre mot de passe est stocké de manière sécurisée</span>
                  </div>
                  <div class="flex items-center gap-3">
                    <span class="material-symbols-outlined text-primary">info</span>
                    <span>Dernière connexion: {{ auth.user?.lastLogin ? formatDate(auth.user.lastLogin) : 'Première connexion' }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'
import { useFavoritesStore } from '~/stores/favorites'
import { useCart } from '~/stores/cart'

// Meta tags
useHead({
  title: 'Mon Profil | Sunu Tawfekh',
  meta: [
    { name: 'description', content: 'Gérez votre profil personnel et vos préférences sur Sunu Tawfekh.' },
    { name: 'keywords', content: 'profil, compte, sunutawfekh, dakar' }
  ]
})

const auth = useAuthStore()
const favorites = useFavoritesStore()
const cart = useCart()

// Tab navigation
const activeTab = ref('profile')

// Settings state
const settings = ref({
  promotionalEmails: false,
  orderNotifications: true,
  newProducts: false
})

// Load settings from localStorage
const loadSettings = () => {
  if (typeof window !== 'undefined') {
    const stored = localStorage.getItem('userSettings')
    if (stored) {
      settings.value = JSON.parse(stored)
    }
  }
}

// Save settings to localStorage
const saveSettings = () => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('userSettings', JSON.stringify(settings.value))
  }
}

// Initialize settings on mount
onMounted(() => {
  loadSettings()
})

// Password form state
const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const isChangingPassword = ref(false)

// Password validation
const isPasswordFormValid = computed(() => {
  return passwordForm.value.newPassword.length >= 8 && 
         passwordForm.value.newPassword === passwordForm.value.confirmPassword &&
         passwordForm.value.currentPassword.length > 0
})

// Handle password change
const handlePasswordChange = async () => {
  if (!isPasswordFormValid.value) return
  
  try {
    isChangingPassword.value = true
    
    // In a real app, you'd validate current password with backend
    // For demo, we'll just update the password directly
    const success = await auth.updatePassword(passwordForm.value.newPassword)
    
    if (success) {
      auth.showNotification('Mot de passe mis à jour avec succès', 'success')
      // Reset form
      passwordForm.value = {
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    } else {
      auth.showNotification('Erreur lors de la mise à jour du mot de passe', 'error')
    }
  } catch (error) {
    console.error('Password change error:', error)
    auth.showNotification('Erreur lors de la mise à jour du mot de passe', 'error')
  } finally {
    isChangingPassword.value = false
  }
}

// Mock orders data
const mockOrders = ref([
  {
    id: '001',
    date: '2024-01-15T10:30:00Z',
    total: 15000,
    status: 'livrée'
  },
  {
    id: '002',
    date: '2024-01-20T14:15:00Z',
    total: 8500,
    status: 'en cours'
  }
])

// Redirect if not authenticated
const router = useRouter()
onMounted(() => {
  auth.initializeAuth()
  if (!auth.isAuthenticated) {
    router.push('/auth')
  }
})

// Form data
const profileForm = ref({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: ''
})

// Cart count
const cartItemCount = computed(() => cart.totalItems)

// Initialize form with user data
watchEffect(() => {
  if (auth.user) {
    profileForm.value = {
      firstName: auth.user.firstName,
      lastName: auth.user.lastName,
      email: auth.user.email,
      phone: auth.user.phone || '',
      address: auth.user.address || ''
    }
  }
})

// Methods
const handleUpdateProfile = async () => {
  const success = await auth.updateProfile(profileForm.value)
  if (success) {
    // Success notification handled by store
  }
}

const handleDeleteAccount = async () => {
  if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible et supprimera toutes vos données.')) {
    const success = await auth.deleteAccount()
    if (success) {
      router.push('/')
    }
  }
}

const formatDate = (dateString: string | undefined): string => {
  if (!dateString) return 'Non disponible'
  return new Date(dateString).toLocaleDateString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatPrice = (price: number): string => {
  return Math.round(price).toLocaleString('fr-FR')
}

const getProductInitial = (productName: string): string => {
  if (!productName) return '?'
  return productName.charAt(0).toUpperCase()
}

// Settings methods
const updateSetting = (key: keyof typeof settings.value, event: Event) => {
  const checkbox = event.target as HTMLInputElement
  if (checkbox) {
    settings.value[key] = checkbox.checked
    saveSettings()
    auth.showNotification(`Paramètre ${key} mis à jour`, 'success')
  }
}

const handleEditPersonalData = () => {
  activeTab.value = 'profile'
}

const handleDownloadData = () => {
  // Create CSV content for Excel
  const createCSVContent = () => {
    let csvContent = '\ufeff' // BOM for UTF-8 Excel support
    
    // Profile section
    csvContent += '=== PROFIL UTILISATEUR ===\n'
    if (auth.user) {
      csvContent += 'Champ,Valeur\n'
      csvContent += `ID,${auth.user.id}\n`
      csvContent += `Prénom,${auth.user.firstName}\n`
      csvContent += `Nom,${auth.user.lastName}\n`
      csvContent += `Email,${auth.user.email}\n`
      csvContent += `Téléphone,${auth.user.phone || ''}\n`
      csvContent += `Adresse,${auth.user.address || ''}\n`
      csvContent += `Date de création,${auth.user.createdAt ? new Date(auth.user.createdAt).toLocaleDateString('fr-FR') : ''}\n`
      csvContent += `Dernière connexion,${auth.user.lastLogin ? new Date(auth.user.lastLogin).toLocaleDateString('fr-FR') : ''}\n`
    }
    csvContent += '\n'
    
    // Settings section
    csvContent += '=== PARAMÈTRES ===\n'
    csvContent += 'Paramètre,Valeur\n'
    csvContent += `Emails promotionnels,${settings.value.promotionalEmails ? 'Oui' : 'Non'}\n`
    csvContent += `Notifications de commande,${settings.value.orderNotifications ? 'Oui' : 'Non'}\n`
    csvContent += `Nouveaux produits,${settings.value.newProducts ? 'Oui' : 'Non'}\n`
    csvContent += '\n'
    
    // Favorites section
    csvContent += '=== FAVORIS ===\n'
    csvContent += 'ID Produit,Nom,Prix,Date d\'ajout\n'
    favorites.items.forEach(favorite => {
      csvContent += `${favorite.productId},"${favorite.product.name}",${favorite.product.price},${favorite.addedAt ? new Date(favorite.addedAt).toLocaleDateString('fr-FR') : ''}\n`
    })
    csvContent += '\n'
    
    // Cart section
    csvContent += '=== PANIER ===\n'
    csvContent += 'ID Produit,Nom,Prix,Quantité\n'
    cart.items.forEach(item => {
      csvContent += `${item.product.id},"${item.product.name}",${item.product.price},${item.quantity}\n`
    })
    csvContent += '\n'
    
    // Export info
    csvContent += '=== INFORMATIONS D\'EXPORT ===\n'
    csvContent += 'Champ,Valeur\n'
    csvContent += `Date d'export,${new Date().toLocaleString('fr-FR')}\n`
    csvContent += `Utilisateur,${auth.user?.email}\n`
    csvContent += `Total favoris,${favorites.items.length}\n`
    csvContent += `Total articles panier,${cart.items.length}\n`
    
    return csvContent
  }
  
  // Create and download CSV file
  const csvContent = createCSVContent()
  const dataBlob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' })
  const url = URL.createObjectURL(dataBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = `sunutawfekh-donnees-${auth.user?.id}-${Date.now()}.csv`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
  
  auth.showNotification('Données exportées en format Excel avec succès', 'success')
}
</script>
