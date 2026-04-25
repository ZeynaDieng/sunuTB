<template>
  <div class="min-h-screen bg-gradient-to-br from-surface to-surface-container flex items-center justify-center px-4 sm:px-6 py-8 sm:py-12">
    <div class="w-full max-w-md sm:max-w-lg">
      <!-- Logo -->
      <div class="text-center mb-6 sm:mb-8">
        <NuxtLink to="/" class="text-2xl sm:text-3xl font-bold tracking-tighter text-primary">
          Sunu Tawfekh
        </NuxtLink>
        <p class="text-on-surface-variant mt-2 text-sm sm:text-base">Votre boutique de confiance à Dakar</p>
      </div>

      <!-- Auth Card -->
      <div class="bg-surface-container-low rounded-2xl shadow-xl p-6 sm:p-8">
        <!-- Toggle Buttons -->
        <div class="flex mb-8 bg-surface rounded-lg p-1">
          <button
            @click="isLogin = true"
            :class="isLogin ? 'bg-primary text-on-primary' : 'text-on-surface'"
            class="flex-1 py-2 px-4 rounded-md font-medium transition-colors first-letter:uppercase"
          >
            Connexion
          </button>
          <button
            @click="isLogin = false"
            :class="!isLogin ? 'bg-primary text-on-primary' : 'text-on-surface'"
            class="flex-1 py-2 px-4 rounded-md font-medium transition-colors first-letter:uppercase"
          >
            Inscription
          </button>
        </div>

        <!-- Login Form -->
        <form v-if="isLogin" @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label class="block text-sm font-medium text-on-surface mb-2 first-letter:uppercase">
              Email
            </label>
            <input
              v-model="loginForm.email"
              type="email"
              required
              class="w-full px-4 py-3 rounded-lg border border-outline-variant focus:border-primary focus:outline-none transition-colors"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-on-surface mb-2 first-letter:uppercase">
              Mot de passe
            </label>
            <input
              v-model="loginForm.password"
              type="password"
              required
              class="w-full px-4 py-3 rounded-lg border border-outline-variant focus:border-primary focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            :disabled="auth.isLoading"
            class="w-full bg-primary text-on-primary py-3 rounded-lg font-semibold hover:bg-primary-container transition-colors disabled:opacity-50 disabled:cursor-not-allowed first-letter:uppercase"
          >
            <span v-if="auth.isLoading" class="flex items-center justify-center">
              <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Connexion...
            </span>
            <span v-else class="first-letter:uppercase">Se connecter</span>
          </button>
        </form>

        <!-- Register Form -->
        <form v-else @submit.prevent="handleRegister" class="space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-on-surface mb-2 first-letter:uppercase">
                Prénom
              </label>
              <input
                v-model="registerForm.firstName"
                type="text"
                required
                class="w-full px-4 py-3 rounded-lg border border-outline-variant focus:border-primary focus:outline-none transition-colors"
                placeholder="Jean"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-on-surface mb-2 first-letter:uppercase">
                Nom
              </label>
              <input
                v-model="registerForm.lastName"
                type="text"
                required
                class="w-full px-4 py-3 rounded-lg border border-outline-variant focus:border-primary focus:outline-none transition-colors"
                placeholder="Diop"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-on-surface mb-2 first-letter:uppercase">
              Email
            </label>
            <input
              v-model="registerForm.email"
              type="email"
              required
              class="w-full px-4 py-3 rounded-lg border border-outline-variant focus:border-primary focus:outline-none transition-colors"
              placeholder="votre@email.com"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-on-surface mb-2">
              Mot de passe
            </label>
            <input
              v-model="registerForm.password"
              type="password"
              required
              minlength="6"
              class="w-full px-4 py-3 rounded-lg border border-outline-variant focus:border-primary focus:outline-none transition-colors"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-on-surface mb-2">
              Téléphone (optionnel)
            </label>
            <input
              v-model="registerForm.phone"
              type="tel"
              class="w-full px-4 py-3 rounded-lg border border-outline-variant focus:border-primary focus:outline-none transition-colors"
              placeholder="+221 33 123 45 67"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-on-surface mb-2">
              Adresse (optionnelle)
            </label>
            <input
              v-model="registerForm.address"
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
              Inscription...
            </span>
            <span v-else>S'inscrire</span>
          </button>
        </form>

        <!-- Error Message -->
        <div v-if="auth.error" class="mt-4 p-3 bg-error/10 border border-error/20 rounded-lg">
          <p class="text-error text-sm">{{ auth.error }}</p>
        </div>

        <!-- Back to Shop -->
        <div class="mt-6 text-center">
          <NuxtLink
            to="/shop"
            class="text-primary hover:text-primary-container font-medium transition-colors"
          >
            ← Retour à la boutique
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

// Meta tags
useHead({
  title: 'Connexion | Sunu Tawfekh',
  meta: [
    { name: 'description', content: 'Connectez-vous à votre compte Sunu Tawfekh pour accéder à vos favoris et commander plus facilement.' },
    { name: 'keywords', content: 'connexion, inscription, compte, sunutawfekh, dakar' }
  ]
})

const auth = useAuthStore()
const router = useRouter()

// Form state
const isLogin = ref(true)

const loginForm = ref({
  email: '',
  password: ''
})

const registerForm = ref({
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  phone: '',
  address: ''
})

// Initialize auth on mount
onMounted(() => {
  auth.initializeAuth()
  
  // Redirect if already authenticated
  if (auth.isAuthenticated) {
    router.push('/favorites')
  }
})

// Methods
const handleLogin = async () => {
  const success = await auth.login(loginForm.value.email, loginForm.value.password)
  if (success) {
    router.push('/favorites')
  }
}

const handleRegister = async () => {
  const success = await auth.register(registerForm.value)
  if (success) {
    router.push('/favorites')
  }
}
</script>
