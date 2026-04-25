<template>
  <nav class="fixed top-0 w-full z-50 bg-[#faf9fc]/80 backdrop-blur-md shadow-sm dark:shadow-none">
    <div class="flex justify-between items-center px-4 sm:px-8 h-14 sm:h-16 max-w-full mx-auto font-['Plus_Jakarta_Sans'] tracking-tight">

      <!-- LEFT : logo + liens desktop -->
      <div class="flex items-center gap-6 sm:gap-8">
        <NuxtLink to="/" class="text-lg sm:text-xl font-bold tracking-tighter text-[#1a1c1e] dark:text-slate-100">
          Sunu Tawfekh
        </NuxtLink>

        <!-- Desktop nav -->
        <div class="hidden md:flex items-center gap-6">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            :class="isActiveLink(link.to) ? 'text-[#6d4f8b] border-b-2 border-[#6d4f8b] pb-0.5' : 'text-[#1a1c1e] hover:text-[#6d4f8b]'"
            class="font-medium text-sm transition-colors duration-200 first-letter:uppercase"
          >
            {{ link.label }}
          </NuxtLink>
        </div>
      </div>

      <!-- RIGHT : actions -->
      <div class="flex items-center gap-2 sm:gap-4 text-[#6d4f8b]">

        <!-- User connecté -->
        <div v-if="auth.isAuthenticated" class="relative">
          <button
            @click="showUserMenu = !showUserMenu"
            class="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#6d4f8b] text-white flex items-center justify-center font-semibold text-sm hover:bg-[#5a4178] transition-colors active:scale-95"
          >
            {{ auth.initials }}
          </button>

          <!-- Dropdown -->
          <div
            v-if="showUserMenu"
            class="absolute right-0 mt-2 w-56 sm:w-64 bg-white rounded-xl shadow-lg border border-[#e5e7eb] py-2 z-50"
          >
            <div class="px-4 py-3 border-b border-[#e5e7eb]">
              <p class="font-semibold text-[#1a1c1e] text-sm first-letter:uppercase">{{ auth.fullName }}</p>
              <p class="text-xs text-gray-500 first-letter:uppercase">{{ auth.user?.email }}</p>
            </div>
            <NuxtLink to="/favorites" class="flex items-center gap-3 px-4 py-2.5 text-sm text-[#1a1c1e] hover:bg-gray-50 transition-colors first-letter:uppercase" @click="showUserMenu = false">
              <span class="material-symbols-outlined text-base">favorite</span> Mes Favoris
            </NuxtLink>
            <NuxtLink to="/profile" class="flex items-center gap-3 px-4 py-2.5 text-sm text-[#1a1c1e] hover:bg-gray-50 transition-colors first-letter:uppercase" @click="showUserMenu = false">
              <span class="material-symbols-outlined text-base">person</span> Mon Profil
            </NuxtLink>
            <button @click="handleLogout" class="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors first-letter:uppercase">
              <span class="material-symbols-outlined text-base">logout</span> Se déconnecter
            </button>
          </div>
        </div>

        <!-- Login -->
        <NuxtLink
          v-else
          to="/auth"
          class="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 bg-[#6d4f8b] text-white rounded-lg hover:bg-[#5a4178] transition-colors active:scale-95"
        >
          <span class="material-symbols-outlined text-[18px]">person</span>
        </NuxtLink>

        <!-- Panier -->
        <NuxtLink to="/checkout" class="relative active:scale-95 transition-transform flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9">
          <span class="material-symbols-outlined text-[22px] sm:text-[24px]">shopping_bag</span>
          <span
            v-if="cartItemCount > 0"
            class="absolute -top-1.5 -right-1.5 bg-[#6d4f8b] text-white text-[10px] rounded-full h-4 w-4 flex items-center justify-center font-bold"
          >
            {{ cartItemCount }}
          </span>
        </NuxtLink>

        <!-- Burger mobile -->
        <button
          @click="showMobileMenu = !showMobileMenu"
          class="md:hidden flex flex-col justify-center gap-[5px] w-8 h-8 rounded-lg hover:bg-[#6d4f8b]/10 transition-colors"
          aria-label="Menu"
        >
          <span class="w-5 h-0.5 bg-[#1a1c1e] mx-auto transition-all duration-300 origin-center" :class="showMobileMenu ? 'rotate-45 translate-y-[7px]' : ''"></span>
          <span class="w-5 h-0.5 bg-[#1a1c1e] mx-auto transition-all duration-300" :class="showMobileMenu ? 'opacity-0 scale-x-0' : ''"></span>
          <span class="w-5 h-0.5 bg-[#1a1c1e] mx-auto transition-all duration-300 origin-center" :class="showMobileMenu ? '-rotate-45 -translate-y-[7px]' : ''"></span>
        </button>
      </div>
    </div>
  </nav>

  <!-- Mobile Menu — slide depuis le haut -->
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 -translate-y-4"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-4"
  >
    <div
      v-if="showMobileMenu"
      class="fixed top-14 left-0 right-0 z-40 md:hidden bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-lg"
    >
      <div class="px-4 py-3 flex flex-col gap-1">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          @click="showMobileMenu = false"
          :class="isActiveLink(link.to) ? 'text-[#6d4f8b] bg-[#6d4f8b]/8' : 'text-[#1a1c1e] hover:bg-gray-50'"
          class="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition-colors first-letter:uppercase"
        >
          <span class="material-symbols-outlined text-[18px] text-[#6d4f8b]/70">{{ link.icon }}</span>
          {{ link.label }}
        </NuxtLink>

        <!-- Auth dans le menu mobile si pas connecté -->
        <NuxtLink
          v-if="!auth.isAuthenticated"
          to="/auth"
          @click="showMobileMenu = false"
          class="flex items-center gap-3 px-4 py-3 mt-1 rounded-xl font-semibold text-sm bg-[#6d4f8b] text-white transition-colors first-letter:uppercase"
        >
          <span class="material-symbols-outlined text-[18px]">person</span>
          Se connecter
        </NuxtLink>
      </div>
    </div>
  </Transition>

  <!-- Backdrop menu mobile -->
  <Transition enter-active-class="transition-opacity duration-200" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition-opacity duration-200" leave-from-class="opacity-100" leave-to-class="opacity-0">
    <div v-if="showMobileMenu" @click="showMobileMenu = false" class="fixed inset-0 z-30 md:hidden bg-black/20"></div>
  </Transition>
</template>

<script setup lang="ts">
import { useCart } from '~/stores/cart'
import { useAuthStore } from '~/stores/auth'

const cartStore = useCart()
const auth = useAuthStore()
const route = useRoute()

const cartItemCount = computed(() => cartStore.totalItems)
const showUserMenu = ref(false)
const showMobileMenu = ref(false)

const navLinks = [
  { to: '/shop',      label: 'Boutique',  icon: 'shopping_bag' },
  { to: '/contact',   label: 'Contact',   icon: 'mail' },
  { to: '/about',     label: 'À Propos',  icon: 'info' },
  { to: '/blog',      label: 'Blog',      icon: 'article' },
  { to: '/favorites', label: 'Favoris',   icon: 'favorite' },
]

const isActiveLink = (path: string) => {
  if (path === '/' && route.path === '/') return true
  if (path !== '/' && route.path.startsWith(path)) return true
  return false
}

// Fermer le menu si la route change
watch(() => route.path, () => { showMobileMenu.value = false })

onMounted(() => {
  auth.initializeAuth()
  document.addEventListener('click', (e) => {
    const target = e.target as HTMLElement
    if (!target.closest('.relative')) showUserMenu.value = false
  })
})

const handleLogout = () => {
  auth.logout()
  showUserMenu.value = false
}
</script>